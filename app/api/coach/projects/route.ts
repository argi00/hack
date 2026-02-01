import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/coach/projects - Mes projets assignés
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

    // Récupérer les projets assignés au coach
    const coachProjects = await prisma.coachProject.findMany({
      where: { coachId },
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
              where: { coachId },
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
      coachProjects.map((cp) => cp.project)
    );
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
