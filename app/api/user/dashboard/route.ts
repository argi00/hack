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

    // Projets en pré-incubation (jeux terminés)
    const gameProgressList = await prisma.gameProgress.findMany({
      where: { userId, isComplete: true },
      orderBy: { lastPlayedAt: "desc" },
    });
    const preIncubationCount = gameProgressList.length;
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
        id: gp.id,
        projectName: gp.projectName,
        oneSentence: gp.oneSentence,
        projectContent,
        maturityScore: gp.maturityScore ?? 0,
        lastPlayedAt: gp.lastPlayedAt.toISOString(),
      };
    });

    // Nombre de projets en incubation
    const incubationCount = await prisma.project.count({
      where: {
        userId,
        status: "incubation",
      },
    });

    // Nombre de hackathons où l'utilisateur est inscrit
    const hackathonsRegisteredCount = await prisma.hackathonRegistration.count({
      where: { userId },
    });

    // Hackathons à venir (où l'utilisateur est inscrit + tous les prochains)
    const now = new Date();
    const userRegistrations = await prisma.hackathonRegistration.findMany({
      where: { userId },
      include: {
        hackathon: true,
      },
      orderBy: {
        hackathon: { dateStart: "asc" },
      },
    });

    const registeredHackathonIds = userRegistrations.map((r) => r.hackathonId);

    const upcomingHackathons = await prisma.hackathon.findMany({
      where: { dateEnd: { gte: now } },
      orderBy: { dateStart: "asc" },
      take: 5,
    });

    const upcomingWithRegistrationStatus = upcomingHackathons.map((h) => ({
      id: h.id,
      title: h.title,
      slug: h.slug,
      dateStart: h.dateStart.toISOString(),
      dateEnd: h.dateEnd.toISOString(),
      description: h.description,
      prize: h.prize,
      places: h.places,
      status: h.status,
      featured: h.featured,
      isRegistered: registeredHackathonIds.includes(h.id),
    }));

    // Données pour les graphiques
    const chartData = [
      { name: "Pré-incubation", value: preIncubationCount, color: "#FF6600" },
      { name: "Incubation", value: incubationCount, color: "#704214" },
      {
        name: "Hackathons inscrits",
        value: hackathonsRegisteredCount,
        color: "#003B7A",
      },
    ];

    return NextResponse.json({
      preIncubationCount,
      preIncubationProjects,
      incubationCount,
      hackathonsRegisteredCount,
      upcomingHackathons: upcomingWithRegistrationStatus,
      chartData,
    });
  } catch (error) {
    console.error("Erreur dashboard:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement du tableau de bord" },
      { status: 500 }
    );
  }
}
