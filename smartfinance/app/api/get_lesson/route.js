import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const lessonid = Number(searchParams.get("lessonid")); // ← get from query

        if (isNaN(lessonid)) {
            return new Response(
                JSON.stringify({ error: "Invalid or missing lessonid" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const lesson = await prisma.lesson.findMany({
            where: { lessonid: lessonid },
            orderBy: { order: "asc" },
        });

        return new Response(
            JSON.stringify({ lesson }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error fetching lesson:", error);
        return new Response(
            JSON.stringify({ error: "Error fetching lesson" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
