"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: 1,
    icon: "📝",
    title: "Créer votre compte",
    description: [
      "Inscrivez-vous gratuitement",
      "et créez votre profil en",
      "quelques minutes",
    ],
    badge: "5 min chrono",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    number: 2,
    icon: "🎮",
    title: "Jeu éducatif",
    description: [
      "Structurez votre idée à",
      "travers 6 phases ludiques",
      "et obtenez votre score",
    ],
    badge: "Obligatoire • Gratuit",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    number: 3,
    icon: "🏆",
    title: "Hackathons",
    description: [
      "Participez à nos challenges",
      "thématiques et gagnez",
      "une place en incubation",
    ],
    badge: "Prochain : 15 février 2026",
    badgeColor: "bg-red-100 text-red-800",
  },
  {
    number: 4,
    icon: "🚀",
    title: "Incubation",
    description: [
      "Bénéficiez d'un accompagnement",
      "personnalisé par nos mentors",
      "pendant 12 mois",
    ],
    badge: "12 mois • Sur sélection",
    badgeColor: "bg-indigo-100 text-indigo-800",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="comment-ca-marche"
      ref={ref}
      className="section"
      style={{ background: "#F5EBE0" }}
      aria-labelledby="how-title"
    >
      <div className="container-custom">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-[#FF6600]">
          Comment ça marche ?
        </p>
        <h2
          id="how-title"
          className="mt-2 text-center text-2xl font-bold text-[#704214] md:text-4xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Votre parcours en 4 étapes
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group relative rounded-2xl p-6"
            >
              {/* Step number badge */}
              <div className="absolute -top-4 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#FF6600] text-2xl font-bold text-white">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mt-6 flex h-36 items-center justify-center rounded-xl bg-[#F5EBE0] text-5xl">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="mt-6 text-center text-xl font-bold text-[#704214]">
                {step.title}
              </h3>
              <p className="mt-3 text-center text-sm text-gray-600">
                {step.description.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < step.description.length - 1 && <br />}
                  </span>
                ))}
              </p>

              {/* Badge */}
              <div
                className={`mt-6 rounded-full px-4 py-2 text-center text-xs font-semibold ${step.badgeColor}`}
              >
                {step.badge}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection lines (desktop) */}
        <div className="mt-4 hidden items-center justify-between px-4 lg:flex">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-0.5 flex-1 border-t-2 border-dashed border-[#D4A574]/50"
              aria-hidden
            />
          ))}
        </div>
      </div>
    </section>
  );
}
