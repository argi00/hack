import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";

// GET /api/coach/projects - Mes projets assignés
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

    // Récupérer les projets assignés au coach
    const coachProjects = await prismaClient.coachProject.findMany({
      where: { coachId: coach.id },
      select: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
            feedbacks: {
              where: { coachId: coach.id },
              select: {
                id: true,
                category: true,
                priority: true,
                content: true,
                isRead: true,
                createdAt: true,
              },
            },
          },
        },
      },
      orderBy: {
        project: { updatedAt: "desc" },
      },
    });

    return NextResponse.json(
      coachProjects.map((cp: { project: unknown }) => cp.project)
    );
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
