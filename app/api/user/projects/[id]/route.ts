import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "ism_session";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();
    const { name, status, description } = body;

    const project = await prisma.project.findFirst({
      where: { id, userId: payload.userId },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Projet non trouvé" },
        { status: 404 }
      );
    }

    const updateData: {
      name?: string;
      status?: string;
      description?: string | null;
    } = {};

    if (typeof name === "string" && name.trim()) {
      updateData.name = name.trim();
    }
    if (typeof status === "string" && status.trim()) {
      updateData.status = status.trim();
    }
    if (description !== undefined) {
      updateData.description =
        typeof description === "string" ? description.trim() || null : null;
    }

    await prisma.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur PATCH project:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
