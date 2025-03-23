import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        clerkUserId: true,
        email: true,
        simulationScore: true,
      },
    });

    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user scores:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch user scores" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
