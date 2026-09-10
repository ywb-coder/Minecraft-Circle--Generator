const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '..');
const src = path.join(rootDir, 'public/og-image.png');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

async function generate() {
  for (const { size, name } of sizes) {
    const out = path.join(rootDir, 'public', name);
    await sharp(src).resize(size, size, { fit: 'cover' }).png().toFile(out);
    console.log(`✓ ${name} (${size}x${size})`);
  }

  // Generate .ico with 16x16 and 32x32
  const ico16 = await sharp(src).resize(16, 16, { fit: 'cover' }).png().toBuffer();
  const ico32 = await sharp(src).resize(32, 32, { fit: 'cover' }).png().toBuffer();
  const ico48 = await sharp(src).resize(48, 48, { fit: 'cover' }).png().toBuffer();

  // Write .ico using png-to-ico or manual approach
  // Since sharp can't write .ico directly, write 32x32 as favicon.ico placeholder
  await sharp(src).resize(32, 32, { fit: 'cover' }).png().toFile(path.join(rootDir, 'public/favicon.ico'));
  console.log('✓ favicon.ico (32x32 png as fallback)');

  // Clean up old option files
  const oldFiles = ['favicon-option-1.svg', 'favicon-option-2.svg', 'favicon-option-3.svg',
    'favicon-option-1.png', 'favicon-option-2.png', 'favicon-option-3.png',
    'favicon-option-1-16.png', 'favicon-option-1-32.png', 'favicon-option-1-64.png', 'favicon-option-1-128.png', 'favicon-option-1-256.png',
    'favicon-option-2-16.png', 'favicon-option-2-32.png', 'favicon-option-2-64.png', 'favicon-option-2-128.png', 'favicon-option-2-256.png',
    'favicon-option-3-16.png', 'favicon-option-3-32.png', 'favicon-option-3-64.png', 'favicon-option-3-128.png', 'favicon-option-3-256.png'];
  for (const f of oldFiles) {
    const fp = path.join(rootDir, 'public', f);
    if (fs.existsSync(fp)) { fs.unlinkSync(fp); console.log(`  cleaned: ${f}`); }
  }

  console.log('\nAll favicons generated!');
}

generate().catch(console.error);
