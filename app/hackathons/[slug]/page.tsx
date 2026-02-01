import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function generateStaticParams() {
  const hackathons = await prisma.hackathon.findMany({
    select: { slug: true },
  });
  return hackathons.map((h) => ({ slug: h.slug }));
}

export default async function HackathonSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hackathon = await prisma.hackathon.findUnique({
    where: { slug },
  });

  if (!hackathon) notFound();

  const dateStartStr = hackathon.dateStart.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateEndStr = hackathon.dateEnd.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="section bg-white">
        <div className="container-custom max-w-3xl">
          {hackathon.featured && (
            <span className="badge-orange">À LA UNE</span>
          )}
          <h1 className="mt-4 text-3xl font-bold text-[#704214]">
            {hackathon.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {dateStartStr} — {dateEndStr}
          </p>
          <p className="mt-6 text-gray-600 leading-relaxed">
            {hackathon.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {hackathon.prize && (
              <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-800">
                🎁 {hackathon.prize}
              </span>
            )}
            {hackathon.places && (
              <span className="rounded-full bg-indigo-100 px-4 py-2 font-semibold text-indigo-800">
                👥 {hackathon.places}
              </span>
            )}
            <span
              className={`rounded-full px-4 py-2 font-semibold ${
                hackathon.status === "ouvert"
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {hackathon.status === "ouvert"
                ? "Inscriptions ouvertes"
                : "Bientôt ouvert"}
            </span>
          </div>
          <p className="mt-8 text-gray-500 text-sm">
            Formulaire d&apos;inscription — À venir
          </p>
          <Link
            href="/hackathons"
            className="btn-primary mt-8 inline-flex gap-2"
          >
            ← Retour aux hackathons
          </Link>
        </div>
      </main>
  );
}
