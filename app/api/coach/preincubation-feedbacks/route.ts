import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";

// POST /api/coach/preincubation-feedbacks - Créer un feedback pour un projet pré-incubation
export async function POST(request: Request) {
  try {
    const prismaClient = prisma as any;
    const cookieStore = await cookies();
    const token = cookieStore.get("ism_session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const payload = await verifySession(token);
    if (!payload || (payload.role !== "COACH" && payload.role !== "ADMIN")) {
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
    const { gameProgressId, userId, category, priority, content } = body;

    // Validation
    if (!gameProgressId || !userId || !category || !priority || !content) {
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

    // Créer le feedback pour le GameProgress
    const feedback = await prismaClient.gameProgressFeedback.create({
      data: {
        coachId: coach.id,
        userId,
        gameProgressId,
        category,
        priority,
        content,
        isRead: false,
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
