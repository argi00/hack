import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HackathonsPage() {
  const now = new Date();
  const hackathons = await prisma.hackathon.findMany({
    where: { dateEnd: { gte: now } },
    orderBy: { dateStart: "asc" },
  });

  const featured = hackathons.find((h) => h.featured);
  const others = hackathons.filter((h) => !h.featured);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <main className="section bg-[#F5EBE0]">
        <div className="container-custom">
          <header className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#8B6F47]">
              Événements à venir
            </p>
            <h1 className="font-display mt-2 text-3xl font-bold text-[#704214] sm:text-4xl">
              Prochains Hackathons
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Inscrivez-vous aux prochains hackathons ISM et transformez vos
              idées en solutions innovantes.
            </p>
          </header>

          {hackathons.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-md">
              <span className="text-5xl" aria-hidden>
                📅
              </span>
              <p className="mt-4 font-medium text-[#704214]">
                Aucun hackathon à venir pour le moment
              </p>
              <Link
                href="/"
                className="btn-primary mt-6 inline-flex gap-2"
              >
                ← Retour à l&apos;accueil
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {featured && (
                <Link
                  href={`/hackathons/${featured.slug}`}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="relative h-56 md:h-72 md:col-span-2 overflow-hidden bg-[#E5E7EB]">
                      {featured.image && (
                        <img
                          src={featured.image}
                          alt={featured.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                      <span className="absolute top-4 left-4 rounded-full bg-[#FF6600] px-4 py-1.5 text-sm font-bold text-white shadow-md">
                        ⭐ À la une
                      </span>
                    </div>
                    <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-3">
                      <span className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                        📅 {formatDate(featured.dateStart)}
                      </span>
                      <h2 className="mt-3 text-xl font-bold text-[#704214] group-hover:text-[#5C3317]">
                        {featured.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-gray-600">
                        {featured.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {featured.prize && (
                          <span className="rounded-lg bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                            🎁 {featured.prize}
                          </span>
                        )}
                        {featured.places && (
                          <span className="rounded-lg bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                            👥 {featured.places}
                          </span>
                        )}
                        <span
                          className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                            featured.status === "ouvert"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {featured.status === "ouvert"
                            ? "Inscriptions ouvertes"
                            : "Bientôt ouvert"}
                        </span>
                      </div>
                      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#FF6600] group-hover:gap-3 transition-all">
                        Voir les détails
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                {others.map((h) => (
                  <Link
                    key={h.id}
                    href={`/hackathons/${h.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="relative h-40 overflow-hidden bg-[#E5E7EB]">
                      {h.image && (
                        <img
                          src={h.image}
                          alt={h.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                      <span
                        className={`absolute bottom-3 left-4 rounded-full px-3 py-1 text-xs font-semibold ${
                          h.status === "ouvert"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {h.status === "ouvert"
                          ? "Inscriptions ouvertes"
                          : "Bientôt ouvert"}
                      </span>
                    </div>
                    <div className="p-5">
                      <span className="text-sm font-medium text-amber-700">
                        📅 {formatDate(h.dateStart)}
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-[#704214] group-hover:text-[#5C3317]">
                        {h.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {h.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-semibold text-[#704214]">
                          {h.prize ? `🎁 ${h.prize}` : ""}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6600] group-hover:gap-2 transition-all">
                          En savoir plus
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#704214] px-8 py-3 font-semibold text-[#704214] transition-all hover:bg-[#704214] hover:text-white"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
    </main>
  );
}
