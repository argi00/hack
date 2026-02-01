import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/coach/feedbacks - Créer un feedback
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { coachId, projectId, userId, category, priority, content } = body;

    // Validation
    if (!coachId || !projectId || !userId || !category || !priority || !content) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    if (content.length < 10) {
      return NextResponse.json(
        { error: "Le feedback doit contenir au moins 10 caractères" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        coachId,
        projectId,
        userId,
        category,
        priority,
        content,
      },
      select: {
        id: true,
        category: true,
        priority: true,
        content: true,
        createdAt: true,
        coach: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// GET /api/coach/feedbacks - Mes feedbacks
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const coachId = searchParams.get("coachId");

    if (!coachId) {
      return NextResponse.json(
        { error: "coachId requis" },
        { status: 400 }
      );
    }

    const feedbacks = await prisma.feedback.findMany({
      where: { coachId },
      select: {
        id: true,
        category: true,
        priority: true,
        content: true,
        isRead: true,
        createdAt: true,
        project: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
