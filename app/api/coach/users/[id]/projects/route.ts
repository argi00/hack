import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";

// GET /api/coach/users/[id]/projects - Récupérer les projets d'un utilisateur
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("ism_session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const payload = await verifySession(token);
    if (!payload || (payload.role !== "COACH" && payload.role !== "ADMIN")) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const { id } = await params;

    // Récupérer les projets d'incubation
    const incubationProjects = await prisma.project.findMany({
      where: { userId: id },
      select: {
        id: true,
        name: true,
        status: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        feedbacks: {
          select: {
            id: true,
            category: true,
            priority: true,
            content: true,
            isRead: true,
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
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    // Récupérer les projets pré-incubation (GameProgress)
    const preIncubationProjects = await (prisma as any).gameProgress.findMany({
      where: { userId: id, isComplete: true },
      select: {
        id: true,
        projectName: true,
        oneSentence: true,
        projectContent: true,
        maturityScore: true,
        lastPlayedAt: true,
        createdAt: true,
        updatedAt: true,
        feedbacks: {
          select: {
            id: true,
            category: true,
            priority: true,
            content: true,
            isRead: true,
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
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    // Normaliser les projets pré-incubation au format des projets d'incubation
    const normalizedPreIncubation = preIncubationProjects.map((gp: any) => {
      let projectContent: Record<string, string> = {};
      try {
        projectContent = gp.projectContent
          ? JSON.parse(gp.projectContent)
          : {};
      } catch {
        projectContent = {};
      }
      return {
        id: gp.id,
        name: gp.projectName,
        status: "pre-incubation",
        description: gp.oneSentence,
        createdAt: gp.createdAt,
        updatedAt: gp.updatedAt,
        maturityScore: gp.maturityScore,
        projectContent,
        feedbacks: gp.feedbacks,
      };
    });

    // Normaliser les projets d'incubation
    const normalizedIncubation = incubationProjects.map((p: any) => ({
      id: p.id,
      name: p.name,
      status: p.status,
      description: p.description,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      projectContent: {},
      feedbacks: p.feedbacks,
    }));

    // Combiner les deux et trier par date de modification
    const allProjects = [...normalizedIncubation, ...normalizedPreIncubation].sort(
      (a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    return NextResponse.json({ projects: allProjects });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
