import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Récupérer la ressource
    const resource = await prisma.resource.findUnique({
      where: { id },
      include: {
        relatedFrom: {
          include: {
            toResource: true,
          },
        },
      },
    });

    if (!resource) {
      return NextResponse.json(
        { success: false, error: "Ressource non trouvée" },
        { status: 404 }
      );
    }

    // Extraire les ressources connexes
    const relatedResources = resource.relatedFrom.map((rel) => rel.toResource);

    return NextResponse.json({
      success: true,
      resource,
      relatedResources,
    });
  } catch (error) {
    console.error("❌ Erreur GET resource detail:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
