import { NextResponse } from "next/server";
import { fetchGitHubStats } from "@/lib/github";

export async function GET() {
  const stats = await fetchGitHubStats();
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "s-maxage=900, stale-while-revalidate=3600"
    }
  });
}
