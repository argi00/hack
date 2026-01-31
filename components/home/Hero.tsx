"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#8B6F47]">
      {/* Background image - équipe entrepreneuriale / innovation */}
      <Image
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
        alt=""
        fill
        className="object-cover opacity-40"
        priority
        sizes="100vw"
      />
      {/* Overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#704214]/90 to-[#5C3317]/95"
        aria-hidden
      />

      {/* Content */}
      <div className="container-custom relative z-10 flex min-h-[90vh] flex-col items-center justify-center py-20 text-center">
        {/* Breadcrumb */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-sm text-[#D4A574]"
        >
          Accueil › L&apos;incubateur
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Transformez votre idée
          <br />
          en entreprise innovante
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-[#F5EBE0] md:text-xl"
        >
          L&apos;incubateur ISM vous accompagne de l&apos;idéation à
          l&apos;incubation avec un parcours gamifié et un accompagnement
          personnalisé
        </motion.p>

        {/* Value Props Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {[
            { icon: "🎮", label: "Jeu éducatif" },
            { icon: "🏆", label: "Hackathons" },
            { icon: "👨‍🏫", label: "Mentors experts" },
          ].map((item) => (
            <span
              key={item.label}
              className="rounded-full bg-white/15 px-5 py-2.5 font-display text-sm font-semibold text-white"
            >
              {item.icon} {item.label}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 mb-12 flex flex-col gap-4 sm:flex-row sm:mb-14"
        >
          <Link
            href="/inscription"
            className="btn-primary inline-flex min-h-[60px] items-center justify-center px-10 text-lg"
          >
            Rejoindre l&apos;incubateur →
          </Link>
          <a
            href="#comment-ca-marche"
            className="btn-secondary inline-flex min-h-[60px] items-center justify-center px-10 text-lg"
          >
            Découvrir
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#chiffres-cles"
            aria-label="Voir la suite"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/50 transition-colors hover:border-white"
          >
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
