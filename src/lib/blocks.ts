export interface Block {
  id: string;
  name: string;
  /** Flat representative color of the block face. */
  color: string;
}

export const BLOCKS: Block[] = [
  { id: "stone", name: "Stone", color: "#8a8a8a" },
  { id: "cobblestone", name: "Cobblestone", color: "#6f6f6f" },
  { id: "deepslate", name: "Deepslate", color: "#4a4a52" },
  { id: "andesite", name: "Andesite", color: "#9c9c9c" },
  { id: "granite", name: "Granite", color: "#a06a5a" },
  { id: "diorite", name: "Diorite", color: "#d6d6d6" },
  { id: "oak-planks", name: "Oak Planks", color: "#b98d4f" },
  { id: "spruce-planks", name: "Spruce Planks", color: "#7c5d35" },
  { id: "birch-planks", name: "Birch Planks", color: "#d9c58f" },
  { id: "dark-oak-planks", name: "Dark Oak Planks", color: "#523b1f" },
  { id: "bricks", name: "Bricks", color: "#a05a4a" },
  { id: "stone-bricks", name: "Stone Bricks", color: "#949494" },
  { id: "sandstone", name: "Sandstone", color: "#ded7a8" },
  { id: "sand", name: "Sand", color: "#e3d98f" },
  { id: "dirt", name: "Dirt", color: "#8a5a32" },
  { id: "grass-block", name: "Grass Block", color: "#5a9e3c" },
  { id: "snow", name: "Snow Block", color: "#f2f6f8" },
  { id: "glass", name: "Glass", color: "#c8e8ee" },
  { id: "ice", name: "Ice", color: "#a4d8ea" },
  { id: "terracotta", name: "Terracotta", color: "#9d5b3e" },
  { id: "white-wool", name: "White Wool", color: "#e9e9e9" },
  { id: "light-gray-wool", name: "Light Gray Wool", color: "#a5a5a5" },
  { id: "gray-wool", name: "Gray Wool", color: "#6f6f6f" },
  { id: "black-wool", name: "Black Wool", color: "#2a2a2a" },
  { id: "red-wool", name: "Red Wool", color: "#b02e26" },
  { id: "orange-wool", name: "Orange Wool", color: "#f07d16" },
  { id: "yellow-wool", name: "Yellow Wool", color: "#f8e52e" },
  { id: "lime-wool", name: "Lime Wool", color: "#6cc938" },
  { id: "green-wool", name: "Green Wool", color: "#4c763c" },
  { id: "cyan-wool", name: "Cyan Wool", color: "#16898b" },
  { id: "light-blue-wool", name: "Light Blue Wool", color: "#3db8e6" },
  { id: "blue-wool", name: "Blue Wool", color: "#3a4dcd" },
  { id: "purple-wool", name: "Purple Wool", color: "#7b2fbe" },
  { id: "magenta-wool", name: "Magenta Wool", color: "#c352d0" },
  { id: "pink-wool", name: "Pink Wool", color: "#eda0bd" },
  { id: "iron-block", name: "Iron Block", color: "#dcdcdc" },
  { id: "gold-block", name: "Gold Block", color: "#f8d62a" },
  { id: "diamond-block", name: "Diamond Block", color: "#4aedd9" },
  { id: "emerald-block", name: "Emerald Block", color: "#2fd94f" },
  { id: "lapis-block", name: "Lapis Block", color: "#2a4fbf" },
  { id: "netherite-block", name: "Netherite Block", color: "#4a3f44" },
  { id: "obsidian", name: "Obsidian", color: "#1b1026" },
  { id: "glowstone", name: "Glowstone", color: "#f8c75e" },
  { id: "sea-lantern", name: "Sea Lantern", color: "#cfeef2" },
  { id: "redstone-block", name: "Redstone Block", color: "#c03030" },
];

export function getBlock(id: string): Block {
  return BLOCKS.find((b) => b.id === id) ?? BLOCKS[0];
}
