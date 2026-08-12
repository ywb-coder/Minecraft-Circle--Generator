export const dynamic = "force-static";

export function GET(): Response {
  return new Response(
    "google-site-verification: google59dae63d03160853.html",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
