"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const stories = [
  {
    title: "LearnSmart Africa",
    category: "EDTECH",
    categoryColor: "bg-[#704214]",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
    description:
      "Plateforme d'apprentissage adaptatif qui a révolutionné l'éducation dans 12 pays africains. 200K+ utilisateurs actifs et 3M€ levés.",
    metrics: [
      { label: "Levée de fonds", value: "3M€" },
      { label: "Utilisateurs", value: "200K" },
      { label: "Pays", value: "12" },
    ],
    quote:
      "L'incubateur ISM nous a permis de structurer notre vision et d'accéder aux bons réseaux",
  },
  {
    title: "AgriConnect",
    category: "AGRITECH",
    categoryColor: "bg-[#10B981]",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    description:
      "Solution IoT pour l'agriculture de précision. Optimise l'irrigation et les rendements de 5000+ agriculteurs au Sénégal.",
    metrics: [
      { label: "Économie d'eau", value: "-40%" },
      { label: "Agriculteurs", value: "5000" },
      { label: "Rendement", value: "+35%" },
    ],
    quote:
      "Le jeu éducatif nous a aidés à affiner notre business model et notre go-to-market",
  },
  {
    title: "PayAfrica",
    category: "FINTECH",
    categoryColor: "bg-[#3B82F6]",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
    description:
      "Solution de paiement mobile pour les petits commerçants. 50K+ marchands actifs et 1,5M€ de transaction mensuel.",
    metrics: [
      { label: "Transactions/mois", value: "1.5M€" },
      { label: "Marchands", value: "50K" },
      { label: "Croissance", value: "+120%" },
    ],
    quote:
      "Les mentors de l'ISM ont été essentiels dans notre levée de fonds série A",
  },
];

export default function SuccessStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section bg-white"
      aria-labelledby="stories-title"
    >
      <div className="container-custom">
        <SectionHeader id="stories-title" label="Success Stories" title="Ils ont réussi avec nous" />

        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-beige overflow-hidden p-0"
            >
              {/* Image - pleine largeur */}
              <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6">
                <span
                  className={`badge-sm inline-block text-white ${story.categoryColor}`}
                >
                  {story.category}
                </span>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#704214]">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{story.description}</p>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {story.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl bg-white p-2 sm:p-3 text-center shadow-sm"
                    >
                      <p className="text-[10px] sm:text-xs text-gray-500">{m.label}</p>
                      <p className="text-sm sm:text-lg font-bold text-[#704214]">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm italic text-gray-600">
                  &quot;{story.quote}&quot;
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
