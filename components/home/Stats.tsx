"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const stats = [
  {
    target: 150,
    suffix: "+",
    label: "Projets incubés avec succès",
    color: "#10B981",
  },
  {
    target: 85,
    suffix: "%",
    label: "Taux de pérennité à 3 ans",
    color: "#3B82F6",
  },
  {
    target: 50,
    suffix: "+",
    label: "Mentors et experts mobilisés",
    color: "#F59E0B",
  },
  {
    target: 12,
    suffix: "M€",
    label: "Levés de fonds cumulés",
    color: "#EC4899",
  },
];

function AnimatedCounter({
  target,
  suffix,
  isInView,
  delay,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
  delay: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  const timersRef = useRef<{ timeout?: ReturnType<typeof setTimeout>; interval?: ReturnType<typeof setInterval> }>({});

  useEffect(() => {
    if (!isInView) return;
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startDelay = delay * 1000;
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = target / steps;
    let current = 0;

    timersRef.current.timeout = setTimeout(() => {
      timersRef.current.interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDisplayValue(target);
          if (timersRef.current.interval) {
            clearInterval(timersRef.current.interval);
          }
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, stepDuration);
    }, startDelay);

    return () => {
      if (timersRef.current.timeout) clearTimeout(timersRef.current.timeout);
      if (timersRef.current.interval) clearInterval(timersRef.current.interval);
    };
  }, [isInView, target, delay]);

  return (
    <p className="text-4xl font-bold text-[#704214] md:text-5xl">
      {isInView ? displayValue : 0}
      {suffix}
    </p>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="chiffres-cles"
      ref={ref}
      className="section bg-white"
      aria-labelledby="stats-title"
    >
      <div className="container-custom">
        <SectionHeader id="stats-title" label="Nos chiffres clés" title="Des résultats qui parlent" />

        <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-beige relative overflow-hidden text-center p-4 sm:p-6"
            >
              <span
                className="absolute right-4 top-4 h-3 w-3 rounded-full shadow-md"
                style={{ backgroundColor: stat.color }}
                aria-hidden
              />
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                isInView={isInView}
                delay={index * 0.1}
              />
              <p className="mt-3 text-sm text-gray-600 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
