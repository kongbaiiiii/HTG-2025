import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { lessonid, order, type, content } = body;

        // Basic input validation
        if (
            typeof lessonid !== "number" ||
            typeof order !== "number" ||
            !["STRING", "IMGLABEL", "IMGURL"].includes(type) ||
            typeof content !== "string"
        ) {
            return new Response(
                JSON.stringify({ error: "Invalid input data" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        await prisma.lesson.create({
            data: { lessonid, order, type, content },
        });

        return new Response(
            JSON.stringify({ message: "Lesson created successfully" }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error creating lesson:", error);
        return new Response(
            JSON.stringify({ error: "Error creating lesson" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
