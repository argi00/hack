import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    const hackathons = await prisma.hackathon.findMany({
      where: { dateEnd: { gte: now } },
      orderBy: { dateStart: "asc" },
    });
    return NextResponse.json(
      hackathons.map((h) => ({
        ...h,
        dateStart: h.dateStart.toISOString(),
        dateEnd: h.dateEnd.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Erreur hackathons:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
