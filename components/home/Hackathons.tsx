"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const hackathons = [
  {
    featured: true,
    title: "Hackathon AgriTech & Sustainability",
    date: "15-16 Fév 2026",
    description:
      "Innovation au service de l'agriculture durable et de la sécurité alimentaire",
    places: "30 places",
    prize: "15K€",
    status: "Inscriptions ouvertes",
    statusStyle: "bg-green-100 text-green-800",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  },
  {
    featured: false,
    title: "Hackathon HealthTech",
    date: "Mars 2026",
    prize: "10K€",
    description: "Innovation dans la santé digitale",
    status: "Bientôt ouvert",
    statusStyle: "bg-amber-100 text-amber-800",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
  },
  {
    featured: false,
    title: "Hackathon Climate Tech",
    date: "Avril 2026",
    prize: "12K€",
    description: "Solutions face au changement climatique",
    status: "Bientôt ouvert",
    statusStyle: "bg-amber-100 text-amber-800",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
  },
];

export default function Hackathons() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featured = hackathons.find((h) => h.featured);
  const others = hackathons.filter((h) => !h.featured);

  return (
    <section
      ref={ref}
      className="section"
      style={{ background: "#F5EBE0" }}
      aria-labelledby="hackathons-title"
    >
      <div className="container-custom">
        <SectionHeader
          id="hackathons-title"
          label="Événements à venir"
          title="Prochains Hackathons"
        />

        {/* Featured - carte principale pleine largeur */}
        {featured && (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mt-10 sm:mt-16"
          >
            <Link
              href="/hackathons/agritech-2026"
              className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image - 2/5 sur desktop */}
                <div className="relative h-56 md:h-72 md:col-span-2 overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#704214]/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-[#FF6600] px-4 py-1.5 text-sm font-bold text-white shadow-md">
                    ⭐ À la une
                  </span>
                </div>

                {/* Contenu - 3/5 sur desktop */}
                <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-3">
                  <span className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                    📅 {featured.date}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-[#704214] sm:text-2xl group-hover:text-[#5C3317]">
                    {featured.title}
                  </h3>
                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {featured.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                      👥 {featured.places}
                    </span>
                    <span className="rounded-lg bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                      🎁 {featured.prize} de prix
                    </span>
                    <span
                      className={`rounded-lg px-3 py-1 text-sm font-semibold ${featured.statusStyle}`}
                    >
                      {featured.status}
                    </span>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#FF6600] group-hover:gap-3 transition-all">
                    S&apos;inscrire au hackathon
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        )}

        {/* Autres hackathons - grille uniforme */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {others.map((hackathon, index) => (
            <motion.article
              key={hackathon.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <Link
                href="/hackathons"
                className="group block h-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={hackathon.image}
                    alt={hackathon.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span
                    className={`absolute bottom-3 left-4 rounded-full px-3 py-1 text-xs font-semibold ${hackathon.statusStyle}`}
                  >
                    {hackathon.status}
                  </span>
                </div>

                {/* Contenu */}
                <div className="p-5">
                  <span className="text-sm font-medium text-amber-700">
                    📅 {hackathon.date}
                  </span>
                  <h4 className="mt-2 text-lg font-bold text-[#704214] group-hover:text-[#5C3317]">
                    {hackathon.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                    {hackathon.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-[#704214]">
                      🎁 {hackathon.prize} de prix
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6600] group-hover:gap-2 transition-all">
                      En savoir plus
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Lien vers tous les hackathons */}
        <div className="mt-10 text-center">
          <Link
            href="/hackathons"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#704214] px-8 py-3 font-semibold text-[#704214] transition-all hover:bg-[#704214] hover:text-white"
          >
            Voir tous les hackathons
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
