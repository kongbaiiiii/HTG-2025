import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { clerkUserId, score } = body;

    if (!clerkUserId || typeof score !== "number") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid input" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { clerkUserId },
      data: { simulationScore: score },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error updating score:", err);
    return new Response(
      JSON.stringify({ error: "Failed to update simulation score" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
