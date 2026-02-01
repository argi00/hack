"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { FICHE_LABELS } from "@/lib/project-labels";

interface DashboardData {
  preIncubationCount: number;
  preIncubationProjects?: Array<{
    id: string;
    projectName: string;
    oneSentence: string | null;
    projectContent: Record<string, string>;
    maturityScore: number;
    lastPlayedAt: string;
  }>;
  incubationCount: number;
  hackathonsRegisteredCount: number;
  upcomingHackathons: Array<{
    id: string;
    title: string;
    slug: string;
    dateStart: string;
    dateEnd: string;
    description: string;
    prize: string | null;
    places: string | null;
    status: string;
    featured: boolean;
    isRegistered: boolean;
  }>;
  chartData: Array<{ name: string; value: number; color: string }>;
}

interface SessionUser {
  firstName: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/session").then((r) => r.json()),
      fetch("/api/user/dashboard").then((r) => r.json()),
    ])
      .then(([session, dashboard]) => {
        if (session.user) setUser(session.user);
        if (!dashboard.error) setData(dashboard);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="section py-20" style={{ background: "#F5EBE0" }}>
        <div className="container-custom">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div
                className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#704214] border-t-transparent"
                aria-hidden
              />
              <p className="mt-4 font-medium text-[#704214]">
                Chargement de votre tableau de bord...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || !user) return null;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const totalProjects =
    data.preIncubationCount + data.incubationCount || 1;
  const barChartData = [
    {
      name: "Pré-incubation",
      value: data.preIncubationCount,
      fill: "#FF6600",
    },
    { name: "Incubation", value: data.incubationCount, fill: "#704214" },
    {
      name: "Hackathons",
      value: data.hackathonsRegisteredCount,
      fill: "#003B7A",
    },
  ];

  return (
    <section className="section py-12 sm:py-16" style={{ background: "#F5EBE0" }}>
      <div className="container-custom">
        {/* En-tête — Règle des 3 secondes */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-[#8B6F47]">
            Tableau de bord
          </p>
          <h1 className="font-display mt-1 text-2xl font-bold text-[#704214] sm:text-3xl md:text-4xl">
            Bonjour, {user.firstName} 👋
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            Voici une vue d&apos;ensemble de vos projets et événements à venir.
          </p>
        </motion.header>

        {/* Cartes de stats — Un objectif par zone, boutons grands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Link
            href="/jeu-educatif"
            className="group flex min-h-[120px] flex-col justify-between rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:ring-2 hover:ring-[#FF6600]/30"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl" aria-hidden>🎮</span>
              <span className="rounded-full bg-[#FF6600]/10 px-3 py-1 text-sm font-semibold text-[#FF6600]">
                Pré-incubation
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#704214]">
                {data.preIncubationCount}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Projet(s) en jeu éducatif
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#FF6600] group-hover:gap-2 transition-all">
              {data.preIncubationCount === 0 ? "Commencer le jeu" : "Voir le jeu"}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          <div className="flex min-h-[120px] flex-col justify-between rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-start justify-between">
              <span className="text-3xl" aria-hidden>🏢</span>
              <span className="rounded-full bg-[#704214]/10 px-3 py-1 text-sm font-semibold text-[#704214]">
                Incubation
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#704214]">
                {data.incubationCount}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Projet(s) en incubation
              </p>
            </div>
          </div>

          <Link
            href="/hackathons"
            className="group flex min-h-[120px] flex-col justify-between rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:ring-2 hover:ring-[#003B7A]/30"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl" aria-hidden>🏆</span>
              <span className="rounded-full bg-[#003B7A]/10 px-3 py-1 text-sm font-semibold text-[#003B7A]">
                Hackathons
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#704214]">
                {data.hackathonsRegisteredCount}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Inscription(s) aux hackathons
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#003B7A] group-hover:gap-2 transition-all">
              Voir les hackathons
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </motion.div>

        {/* Projets en pré-incubation (jeu éducatif) */}
        {(data.preIncubationProjects?.length ?? 0) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-12 overflow-hidden rounded-2xl bg-white shadow-md"
          >
            <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
              <h2 className="font-display text-lg font-bold text-[#704214]">
                Mes projets en pré-incubation
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Projets issus du jeu éducatif — votre idée clarifiée
              </p>
            </div>
            <div className="divide-y divide-gray-100 p-6 sm:p-8">
              {data.preIncubationProjects?.map((project, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border-2 border-[#F5EBE0] bg-[#FDF8F5] p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-[#704214]">
                        {project.projectName}
                      </h3>
                      {project.oneSentence && (
                        <p className="mt-2 rounded-lg bg-white/80 px-4 py-3 text-sm italic text-gray-700 shadow-sm">
                          &ldquo;{project.oneSentence}&rdquo;
                        </p>
                      )}
                      {project.projectContent &&
                        Object.keys(project.projectContent).length > 0 && (
                          <div className="mt-4 grid gap-2 sm:grid-cols-2">
                            {Object.entries(project.projectContent).map(
                              ([key, value]) =>
                                FICHE_LABELS[key] && value && (
                                  <div
                                    key={key}
                                    className="rounded-lg bg-white px-3 py-2 text-sm shadow-sm"
                                  >
                                    <span className="font-semibold text-[#704214]">
                                      {FICHE_LABELS[key]} :
                                    </span>{" "}
                                    <span className="line-clamp-2 text-gray-600">
                                      {value}
                                    </span>
                                  </div>
                                )
                            )}
                          </div>
                        )}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            project.maturityScore >= 70
                              ? "bg-green-100 text-green-800"
                              : project.maturityScore >= 50
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          Score : {project.maturityScore} %
                        </span>
                        <span className="text-xs text-gray-500">
                          Complété le{" "}
                          {formatDate(project.lastPlayedAt)}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/jeu-educatif"
                      className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-[#FF6600] px-5 font-semibold text-white transition-all hover:bg-[#FF8C00]"
                    >
                      Voir / Rejouer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Graphiques — Hiérarchie visuelle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 grid gap-8 lg:grid-cols-2"
        >
          {/* Graphique en donut */}
          <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-display mb-6 text-lg font-bold text-[#704214]">
              Répartition de vos projets
            </h2>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={barChartData.filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) =>
                      value > 0 ? `${name}: ${value}` : null
                    }
                  >
                    {barChartData
                      .filter((d) => d.value > 0)
                      .map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                          stroke="none"
                        />
                      ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [value, ""]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {totalProjects === 0 && data.hackathonsRegisteredCount === 0 && (
              <p className="text-center text-sm text-gray-500">
                Commencez le jeu ou inscrivez-vous à un hackathon pour voir vos
                statistiques.
              </p>
            )}
          </div>

          {/* Graphique en barres */}
          <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-display mb-6 text-lg font-bold text-[#704214]">
              Vue d&apos;ensemble
            </h2>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#704214" }}
                    axisLine={{ stroke: "#E5E7EB" }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#704214" }}
                    axisLine={{ stroke: "#E5E7EB" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} name="Nombre" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Hackathons à venir — Flux linéaire, un objectif clair */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="overflow-hidden rounded-2xl bg-white shadow-md"
        >
          <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
            <h2 className="font-display text-lg font-bold text-[#704214]">
              Hackathons à venir
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Les prochains événements auxquels vous pouvez participer
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {data.upcomingHackathons.length === 0 ? (
              <div className="px-6 py-12 text-center sm:px-8">
                <span className="text-4xl" aria-hidden>📅</span>
                <p className="mt-4 font-medium text-[#704214]">
                  Aucun hackathon à venir pour le moment
                </p>
                <Link
                  href="/hackathons"
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#FF6600] px-6 font-semibold text-white transition-all hover:bg-[#FF8C00]"
                >
                  Découvrir les hackathons
                </Link>
              </div>
            ) : (
              data.upcomingHackathons.map((h) => (
                <Link
                  key={h.id}
                  href={`/hackathons/${h.slug}`}
                  className="group flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-[#F5EBE0]/50 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-[#704214] group-hover:text-[#5C3317]">
                        {h.title}
                      </h3>
                      {h.featured && (
                        <span className="rounded-full bg-[#FF6600] px-2.5 py-0.5 text-xs font-bold text-white">
                          À la une
                        </span>
                      )}
                      {h.isRegistered && (
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                          ✓ Inscrit
                        </span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {h.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                      <span>📅 {formatDate(h.dateStart)}</span>
                      {h.prize && <span>🎁 {h.prize}</span>}
                    </div>
                  </div>
                  <span
                    className="inline-flex min-h-[44px] min-w-[120px] items-center justify-center rounded-xl border-2 border-[#704214] px-4 font-semibold text-[#704214] transition-all group-hover:bg-[#704214] group-hover:text-white"
                    style={{ minHeight: 44 }}
                  >
                    {h.isRegistered ? "Voir" : "S'inscrire"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </motion.div>

        {/* CTA rapide — Feedback immédiat, toujours une sortie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/jeu-educatif"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#FF6600] px-8 font-semibold text-white shadow-md transition-all hover:bg-[#FF8C00] hover:shadow-lg"
          >
            🎮 Lancer le jeu éducatif
          </Link>
          <Link
            href="/hackathons"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-[#704214] px-8 font-semibold text-[#704214] transition-all hover:bg-[#704214] hover:text-white"
          >
            Voir les hackathons
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
