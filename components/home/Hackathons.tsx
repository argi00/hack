"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const hackathons = [
  {
    featured: true,
    title: "Hackathon AgriTech & Sustainability",
    date: "15-16 Fév 2026",
    description:
      "Innovation au service de l'agriculture durable et de la sécurité alimentaire",
    places: "30 places",
    prize: "Prix 15K€",
    status: "Inscriptions ouvertes",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  },
  {
    featured: false,
    title: "Hackathon HealthTech",
    date: "Mars 2026",
    prize: "10K€ de prix",
    description: "Innovation dans la santé digitale",
    status: "Bientôt ouvert",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
  },
  {
    featured: false,
    title: "Hackathon Climate Tech",
    date: "Avril 2026",
    prize: "12K€ de prix",
    description: "Solutions face au changement climatique",
    status: "Bientôt ouvert",
    image: "https://images.unsplash.com/photo-1569163139513-7a5c1f32cfa1?w=400&q=80",
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
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-[#FF6600]">
          Événements à venir
        </p>
        <h2
          id="hackathons-title"
          className="mt-2 text-center text-2xl font-bold text-[#704214] md:text-4xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Prochains Hackathons
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Featured hackathon */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="card overflow-hidden">
                <span className="inline-block rounded-full bg-[#FF6600] px-4 py-2 text-sm font-bold text-white">
                  ⭐ À LA UNE
                </span>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="relative h-64 overflow-hidden rounded-xl">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <span className="inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
                      📅 {featured.date}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold text-[#704214]">
                      {featured.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{featured.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
                        👥 {featured.places}
                      </span>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                        🎁 {featured.prize}
                      </span>
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                        ⏰ {featured.status}
                      </span>
                    </div>
                    <Link
                      href="/hackathons/agritech-2026"
                      className="btn-primary mt-6 inline-flex min-h-[50px] items-center justify-center px-8"
                    >
                      S&apos;inscrire →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other hackathons */}
          <div className="flex flex-col gap-6">
            {others.map((hackathon, index) => (
              <motion.div
                key={hackathon.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                className="card flex gap-4"
              >
                <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={hackathon.image}
                    alt={hackathon.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-[#704214]">{hackathon.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    📅 {hackathon.date} • 💰 {hackathon.prize}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {hackathon.description}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href="/hackathons"
                      className="rounded-full bg-[#704214] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5C3317]"
                    >
                      En savoir plus
                    </Link>
                    <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold text-amber-800">
                      {hackathon.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
