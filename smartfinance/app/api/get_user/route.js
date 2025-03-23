import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // const { userId } = auth();
    const body = await req.json();
    const { score, userId } = body;

    if (!userId || typeof score !== "number") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid input" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { clerkUserId: userId },
      data: { simulationScore: score },
    });

    // Get leaderboard data
    const users = await prisma.user.findMany({
      select: {
        email: true,
        simulationScore: true,
      },
    });

    const leaderboard = users
      .filter(user => user.simulationScore > 0)
      .map(user => ({
        email: user.email,
        score: user.simulationScore
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return new Response(JSON.stringify({ success: true, leaderboard }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error ending simulation:", err);
    return new Response(
      JSON.stringify({ error: "Failed to end simulation" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}