"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const benefits = [
  "✅ 100% Gratuit",
  "✅ Accompagnement expert",
  "✅ Réseau entrepreneurial",
];

export default function CTAFinal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section gradient-brown relative overflow-hidden text-white"
      aria-labelledby="cta-title"
    >
      {/* Decorative circles */}
      <div
        className="absolute left-20 top-10 h-24 w-24 rounded-full bg-[#8B6F47]/30"
        aria-hidden
      />
      <div
        className="absolute bottom-20 right-20 h-40 w-40 rounded-full bg-[#8B6F47]/20"
        aria-hidden
      />

      <div className="container-custom relative z-10 text-center">
        <motion.h2
          id="cta-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold md:text-4xl lg:text-5xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Prêt à lancer votre projet ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg text-[#F5EBE0] md:text-xl"
        >
          Rejoignez l&apos;incubateur ISM et transformez votre idée en réalité
        </motion.p>

        {/* Benefits pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {benefits.map((benefit) => (
            <span
              key={benefit}
              className="rounded-full bg-white/15 px-6 py-3 font-display text-base font-semibold"
            >
              {benefit}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <Link
            href="/inscription"
            className="btn-primary inline-flex min-h-[70px] min-w-[280px] items-center justify-center px-10 text-xl"
          >
            Créer mon compte →
          </Link>
          <Link
            href="/jeu-educatif"
            className="btn-secondary inline-flex min-h-[70px] min-w-[280px] items-center justify-center px-10 text-xl"
          >
            Découvrir le jeu éducatif
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
