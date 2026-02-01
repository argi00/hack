import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("ism_session")?.value;
    if (!token) {
      return Response.json({ error: "Non authentifié" }, { status: 401 });
    }

    const payload = await verifySession(token);
    if (!payload || (payload.role !== "COACH" && payload.role !== "ADMIN")) {
      return Response.json({ error: "Accès refusé" }, { status: 403 });
    }

    const userId = params.id;

    const [gameProgressList, projects] = await Promise.all([
      prisma.gameProgress.findMany({
        where: { userId, isComplete: true },
        orderBy: { lastPlayedAt: "desc" },
      }),
      (prisma as any).project.findMany({
        where: { userId },
        include: {
          feedbacks: {
            select: {
              id: true,
              category: true,
              priority: true,
              content: true,
              createdAt: true,
            },
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    const preIncubation = gameProgressList.map((gp) => {
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
        name: gp.projectName,
        status: "pre-incubation",
        summary: gp.oneSentence ?? "",
        projectContent,
        createdAt: gp.createdAt.toISOString(),
        updatedAt: gp.lastPlayedAt.toISOString(),
        feedbacks: [],
      };
    });

    const incubation = projects.map((p: any) => ({
      type: "incubation" as const,
      id: p.id,
      name: p.name,
      status: p.status,
      summary: p.description ?? "",
      projectContent: null,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      feedbacks:
        p.feedbacks?.map((f: any) => ({
          id: f.id,
          category: f.category,
          priority: f.priority,
          content: f.content,
          createdAt: f.createdAt.toISOString(),
        })) ?? [],
    }));

    return Response.json([...preIncubation, ...incubation]);
  } catch (error) {
    console.error("Erreur:", error);
    return Response.json(
      { error: "Erreur lors de la récupération des projets" },
      { status: 500 }
    );
  }
}
