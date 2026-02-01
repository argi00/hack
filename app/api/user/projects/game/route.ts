import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "ism_session";

export async function PATCH(request: Request) {
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

    const userId = payload.userId;
    const body = await request.json();
    const { id, projectName, projectContent, oneSentence } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID du projet requis" },
        { status: 400 }
      );
    }

    const existing = await prisma.gameProgress.findFirst({
      where: { id, userId, isComplete: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Projet en pré-incubation non trouvé" },
        { status: 404 }
      );
    }

    const updateData: {
      projectName?: string;
      projectContent?: string | null;
      oneSentence?: string | null;
    } = {};

    if (typeof projectName === "string" && projectName.trim()) {
      updateData.projectName = projectName.trim();
    }
    if (projectContent !== undefined) {
      updateData.projectContent =
        typeof projectContent === "object"
          ? JSON.stringify(projectContent)
          : typeof projectContent === "string"
            ? projectContent
            : null;
    }
    if (oneSentence !== undefined) {
      updateData.oneSentence =
        typeof oneSentence === "string" ? oneSentence.trim() || null : null;
    }

    await prisma.gameProgress.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur PATCH game project:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
