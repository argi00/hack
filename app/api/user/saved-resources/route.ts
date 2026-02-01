import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

const SESSION_COOKIE = "ism_session";

// Récupérer les ressources sauvegardées de l'utilisateur
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    const payload = await verifySession(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Session invalide" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const skip = (page - 1) * limit;

    const [savedResources, total] = await Promise.all([
      prisma.savedResource.findMany({
        where: { userId: payload.userId },
        include: { resource: true },
        skip,
        take: limit,
        orderBy: { savedAt: "desc" },
      }),
      prisma.savedResource.count({ where: { userId: payload.userId } }),
    ]);

    const resources = savedResources.map((sr) => sr.resource);
    const hasMore = skip + limit < total;

    return NextResponse.json({
      success: true,
      resources,
      total,
      page,
      limit,
      hasMore,
    });
  } catch (error) {
    console.error("❌ Erreur GET saved resources:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// Sauvegarder une ressource
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    const payload = await verifySession(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Session invalide" },
        { status: 401 }
      );
    }

    const { resourceId } = await request.json();

    if (!resourceId) {
      return NextResponse.json(
        { success: false, error: "resourceId requis" },
        { status: 400 }
      );
    }

    // Vérifier que la ressource existe
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (!resource) {
      return NextResponse.json(
        { success: false, error: "Ressource non trouvée" },
        { status: 404 }
      );
    }

    // Vérifier si déjà sauvegardée
    const existing = await prisma.savedResource.findUnique({
      where: {
        userId_resourceId: {
          userId: payload.userId,
          resourceId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Ressource déjà sauvegardée",
        saved: true,
      });
    }

    // Sauvegarder
    await prisma.savedResource.create({
      data: {
        userId: payload.userId,
        resourceId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ressource sauvegardée",
      saved: true,
    });
  } catch (error) {
    console.error("❌ Erreur POST save resource:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// Supprimer une ressource sauvegardée
export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    const payload = await verifySession(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Session invalide" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const resourceId = searchParams.get("resourceId");

    if (!resourceId) {
      return NextResponse.json(
        { success: false, error: "resourceId requis" },
        { status: 400 }
      );
    }

    await prisma.savedResource.delete({
      where: {
        userId_resourceId: {
          userId: payload.userId,
          resourceId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ressource supprimée des favoris",
      saved: false,
    });
  } catch (error) {
    console.error("❌ Erreur DELETE save resource:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
