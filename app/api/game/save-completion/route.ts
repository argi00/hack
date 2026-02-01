import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "ism_session";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const payload = await verifySession(token);
    if (!payload) {
      return NextResponse.json({ error: "Session invalide" }, { status: 401 });
    }

    const body = await request.json();
    const {
      projectName,
      projectContent,
      oneSentence,
      phaseScores,
      totalScore,
      maturityScore,
      answers,
    } = body;

    if (!projectName || typeof projectName !== "string") {
      return NextResponse.json(
        { error: "Nom du projet requis" },
        { status: 400 }
      );
    }

    const userId = payload.userId;

    // Créer un nouveau projet (chaque complétion du jeu = nouveau projet)
    await prisma.gameProgress.create({
      data: {
        userId,
        projectName,
        projectContent:
          typeof projectContent === "object"
            ? JSON.stringify(projectContent)
            : projectContent ?? null,
        oneSentence: oneSentence ?? null,
        phaseScores:
          typeof phaseScores === "object"
            ? JSON.stringify(phaseScores)
            : "{}",
        answers: typeof answers === "object" ? JSON.stringify(answers) : "{}",
        totalScore: typeof totalScore === "number" ? totalScore : 0,
        maturityScore: typeof maturityScore === "number" ? maturityScore : 0,
        isComplete: true,
        currentPhase: 6,
        currentQuestion: 0,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur sauvegarde jeu:", error);
    return NextResponse.json(
      { error: "Erreur lors de la sauvegarde" },
      { status: 500 }
    );
  }
}
