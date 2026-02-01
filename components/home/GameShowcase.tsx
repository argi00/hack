"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  "Clarification de l'idée et validation du besoin",
  "Étude de marché simulée avec personas",
  "Construction du Business Model Canvas",
  "Prototypage et tests utilisateurs virtuels",
  "Feedback personnalisé et rapport de maturité",
];

export default function GameShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section gradient-brown text-white"
      aria-labelledby="game-title"
    >
      <div className="container-custom">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[#D4A574]">
              Innovation pédagogique
            </p>
            <h2
              id="game-title"
              className="mt-2 text-4xl font-bold md:text-5xl"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Le Jeu Éducatif
              <br />
              qui transforme
              <br />
              <span className="text-[#FF6600]">votre idée en projet</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#F5EBE0]">
              Apprenez par la simulation en traversant 6 phases interactives qui
              structurent votre projet entrepreneurial.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#FF6600]" />
                  <span className="text-[#F5EBE0] text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/jeu-educatif"
              className="btn-primary mt-6 sm:mt-8 inline-flex w-full sm:w-auto min-h-[48px] items-center justify-center px-8 text-base"
            >
              Essayer le jeu →
            </Link>
          </motion.div>

          {/* Right - Game Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="rounded-2xl bg-slate-900 p-4 sm:p-6">
              {/* Game UI Mock */}
              <div className="rounded-xl bg-slate-950 p-4 sm:p-6">
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="h-3 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "66%",
                        background: "linear-gradient(90deg, #FF6600, #FF8C00)",
                      }}
                    />
                  </div>
                  <p className="mt-1 text-center text-xs text-slate-400">
                    Phase 4/6 - Business Model
                  </p>
                </div>

                {/* Score badge */}
                <div className="mb-4 flex justify-end">
                  <div className="rounded-xl bg-amber-100 px-4 py-2">
                    <p className="text-xs text-amber-800">Score</p>
                    <p className="text-xl font-bold text-amber-800">72/100</p>
                  </div>
                </div>

                {/* Content area */}
                <div className="mb-4 sm:mb-6 flex h-32 sm:h-48 items-center justify-center rounded-lg bg-slate-700">
                  <p className="text-sm text-slate-400">
                    [Interface de jeu interactive]
                  </p>
                </div>

                {/* Question */}
                <p className="mb-3 sm:mb-4 text-base sm:text-lg font-bold text-white">
                  Définissez votre proposition de valeur unique
                </p>

                {/* Option */}
                <div className="mb-4 flex items-center gap-3 rounded-lg bg-slate-600 px-4 py-3">
                  <span className="h-4 w-4 rounded-full border-2 border-[#FF6600] bg-[#FF6600]" />
                  <span className="text-slate-200">
                    Option A : Focus sur l&apos;innovation technologique
                  </span>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="rounded-full bg-[#FF6600] px-6 py-2.5 font-semibold text-white"
                  >
                    Valider →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
