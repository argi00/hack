import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

const SESSION_COOKIE = "ism_session";

// Récupérer l'état de sauvegarde pour une ressource
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    
    if (!token) {
      return NextResponse.json({
        success: true,
        saved: false,
      });
    }

    const payload = await verifySession(token);
    if (!payload) {
      return NextResponse.json({
        success: true,
        saved: false,
      });
    }

    const saved = await prisma.savedResource.findUnique({
      where: {
        userId_resourceId: {
          userId: payload.userId,
          resourceId: resourceId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      saved: !!saved,
    });
  } catch (error) {
    console.error("❌ Erreur GET save status:", error);
    return NextResponse.json({
      success: false,
      saved: false,
    });
  }
}
