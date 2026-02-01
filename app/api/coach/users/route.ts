import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";

// GET /api/coach/users - Récupérer tous les utilisateurs pour le coach
export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "1000");

    // Construire le filtre
    const where: any = {
      role: "USER",
    };
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    // Récupérer les utilisateurs avec comptage des projets
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        projects: {
          select: { id: true },
        },
        gameProgress: {
          where: { isComplete: true },
          select: { id: true },
        },
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      users: users.map((user) => ({
        ...user,
        incubationCount: user.projects.length,
        preIncubationCount: user.gameProgress.length,
        totalProjects: user.projects.length + user.gameProgress.length,
        projects: undefined,
        gameProgress: undefined,
      })),
    });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
