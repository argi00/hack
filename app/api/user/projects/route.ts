import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "ism_session";

export async function GET() {
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

    const [gameProgressList, projects] = await Promise.all([
      prisma.gameProgress.findMany({
        where: { userId, isComplete: true },
        orderBy: { lastPlayedAt: "desc" },
      }),
      prisma.project.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    const preIncubationProjects = gameProgressList.map((gp) => {
      let projectContent: Record<string, string> = {};
      try {
        projectContent = gp.projectContent
          ? (JSON.parse(gp.projectContent) as Record<string, string>)
          : {};
      } catch {
        projectContent = {};
      }
      return {
        type: "pre-incubation" as const,
        id: gp.id,
        projectName: gp.projectName,
        oneSentence: gp.oneSentence,
        projectContent,
        maturityScore: gp.maturityScore ?? 0,
        lastPlayedAt: gp.lastPlayedAt.toISOString(),
      };
    });

    const incubation = projects.map((p) => ({
      type: "incubation" as const,
      id: p.id,
      name: p.name,
      status: p.status,
      description: p.description,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

    const all = [...preIncubationProjects, ...incubation];

    return NextResponse.json({ projects: all });
  } catch (error) {
    console.error("Erreur GET projects:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des projets" },
      { status: 500 }
    );
  }
}
