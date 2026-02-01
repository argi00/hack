"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const resources = [
  {
    icon: "📚",
    title: "Guides Pratiques",
    description: "12 guides complets sur l'entrepreneuriat",
    badge: "Gratuit • PDF",
    badgeColor: "bg-green-100 text-green-800",
    cta: "Télécharger",
    href: "/ressources#guides",
  },
  {
    icon: "🎨",
    title: "Templates Canvas",
    description: "Business Model, Lean Canvas, Persona",
    badge: "Gratuit • PPT",
    badgeColor: "bg-green-100 text-green-800",
    cta: "Télécharger",
    href: "/ressources#templates",
  },
  {
    icon: "🎥",
    title: "Webinaires",
    description: "Masterclass avec nos mentors",
    badge: "Live • Replays",
    badgeColor: "bg-red-100 text-red-800",
    cta: "Voir planning",
    href: "/ressources#webinaires",
  },
  {
    icon: "💬",
    title: "Communauté",
    description: "Forum & Networking événements",
    badge: "800+ entrepreneurs",
    badgeColor: "bg-indigo-100 text-indigo-800",
    cta: "Rejoindre",
    href: "/communaute",
  },
];

export default function Resources() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section bg-white"
      aria-labelledby="resources-title"
    >
      <div className="container-custom">
        <SectionHeader id="resources-title" label="Ressources gratuites" title="Accélérez votre apprentissage" />

        <div className="mt-10 sm:mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-beige group p-6"
            >
              <div className="flex h-32 sm:h-36 items-center justify-center rounded-xl bg-white text-4xl sm:text-5xl">
                {resource.icon}
              </div>
              <h3 className="mt-5 text-center text-lg font-bold text-[#704214]">
                {resource.title}
              </h3>
              <p className="mt-3 text-center text-sm text-gray-600">
                {resource.description}
              </p>
              <span
                className={`mt-4 block badge-sm text-center ${resource.badgeColor}`}
              >
                {resource.badge}
              </span>
              <Link
                href={resource.href}
                className="btn-tertiary mt-5 flex w-full min-h-[44px] items-center justify-center"
              >
                {resource.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
