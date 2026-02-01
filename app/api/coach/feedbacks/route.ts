import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";

// POST /api/coach/feedbacks - Créer un feedback
export async function POST(request: Request) {
  try {
    const prismaClient = prisma as any;
    const cookieStore = await cookies();
    const token = cookieStore.get("ism_session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const payload = await verifySession(token);
    if (!payload || payload.role !== "COACH") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const coach = await prismaClient.coach.findUnique({
      where: { userId: payload.userId },
      select: { id: true },
    });

    if (!coach) {
      return NextResponse.json({ error: "Coach introuvable" }, { status: 404 });
    }

    const body = await request.json();
    const { projectId, userId, category, priority, content } = body;

    // Validation
    if (!projectId || !userId || !category || !priority || !content) {
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

    const feedback = await prismaClient.feedback.create({
      data: {
        coachId: coach.id,
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
    const prismaClient = prisma as any;
    const cookieStore = await cookies();
    const token = cookieStore.get("ism_session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const payload = await verifySession(token);
    if (!payload || payload.role !== "COACH") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const coach = await prismaClient.coach.findUnique({
      where: { userId: payload.userId },
      select: { id: true },
    });

    if (!coach) {
      return NextResponse.json({ error: "Coach introuvable" }, { status: 404 });
    }

    const feedbacks = await prismaClient.feedback.findMany({
      where: { coachId: coach.id },
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
