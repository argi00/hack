"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FICHE_LABELS } from "@/lib/project-labels";

type PreIncubationProject = {
  type: "pre-incubation";
  id: string;
  projectName: string;
  oneSentence: string | null;
  projectContent: Record<string, string>;
  maturityScore: number;
  lastPlayedAt: string;
};

type IncubationProject = {
  type: "incubation";
  id: string;
  name: string;
  status: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

type ProjectItem = PreIncubationProject | IncubationProject;

function isPreIncubation(p: ProjectItem): p is PreIncubationProject {
  return p.type === "pre-incubation";
}

export default function MesProjetsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const [mode, setMode] = useState<"list" | "view" | "edit">("list");
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const fetchProjects = () => {
    setLoading(true);
    setError(null);
    fetch("/api/user/projects")
      .then(async (r) => {
        const data = await r.json();
        if (data.error) {
          setError(data.error);
          if (r.status === 401) router.replace("/login");
        } else setProjects(data.projects ?? []);
        return data;
      })
      .catch(() => setError("Impossible de charger les projets"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openView = (p: ProjectItem) => {
    setSelected(p);
    setMode("view");
    if (isPreIncubation(p)) {
      setEditForm({
        projectName: p.projectName,
        oneSentence: p.oneSentence ?? "",
        ...p.projectContent,
      });
    } else {
      setEditForm({
        name: p.name,
        status: p.status,
        description: p.description ?? "",
      });
    }
  };

  const openEdit = () => {
    setMode("edit");
    setSaveError(null);
  };

  const closeDetail = () => {
    setSelected(null);
    setMode("list");
    setSaveError(null);
  };

  const handleSavePreIncubation = async () => {
    if (!selected || !isPreIncubation(selected)) return;
    setSaving(true);
    setSaveError(null);
    const projectContent: Record<string, string> = {};
    Object.keys(FICHE_LABELS).forEach((key) => {
      if (editForm[key]?.trim()) projectContent[key] = editForm[key].trim();
    });
    const res = await fetch("/api/user/projects/game", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selected.id,
        projectName: editForm.projectName?.trim() || selected.projectName,
        oneSentence: editForm.oneSentence?.trim() || null,
        projectContent,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setSaveError(data.error || "Erreur lors de l'enregistrement");
      return;
    }
    setSelected({
      ...selected,
      projectName: editForm.projectName?.trim() || selected.projectName,
      oneSentence: editForm.oneSentence?.trim() || null,
      projectContent,
    });
    setMode("view");
    fetchProjects();
  };

  const handleSaveIncubation = async () => {
    if (!selected || isPreIncubation(selected)) return;
    setSaving(true);
    setSaveError(null);
    const res = await fetch(`/api/user/projects/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editForm.name?.trim() || selected.name,
        status: editForm.status?.trim() || selected.status,
        description: editForm.description?.trim() || null,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setSaveError(data.error || "Erreur lors de l'enregistrement");
      return;
    }
    setSelected({
      ...selected,
      name: editForm.name?.trim() || selected.name,
      status: editForm.status?.trim() || selected.status,
      description: editForm.description?.trim() || null,
    });
    setMode("view");
    fetchProjects();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <main className="section min-h-[70vh] bg-[#F5EBE0] py-12">
        <div className="container-custom">
          <header className="mb-10">
            <h1 className="font-display text-2xl font-bold text-[#704214] sm:text-3xl">
              Mes projets
            </h1>
            <p className="mt-2 text-gray-600">
              Consultez et modifiez vos projets en pré-incubation et en
              incubation.
            </p>
          </header>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#704214] border-t-transparent" />
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-md">
              <p className="text-red-600">{error}</p>
              <button
                type="button"
                onClick={fetchProjects}
                className="btn-primary mt-4"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <>
              {projects.length === 0 ? (
                <div className="rounded-2xl bg-white p-12 text-center shadow-md">
                  <span className="text-5xl" aria-hidden>
                    📋
                  </span>
                  <p className="mt-4 font-medium text-[#704214]">
                    Vous n&apos;avez pas encore de projet enregistré.
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Complétez le jeu éducatif pour créer votre premier projet
                    en pré-incubation.
                  </p>
                  <Link
                    href="/jeu-educatif"
                    className="btn-primary mt-6 inline-flex min-h-[48px] items-center justify-center"
                  >
                    🎮 Lancer le jeu éducatif
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p) => (
                    <motion.button
                      key={p.id}
                      type="button"
                      onClick={() => openView(p)}
                      className="group flex flex-col items-start rounded-2xl bg-white p-6 text-left shadow-md transition-all hover:shadow-lg hover:ring-2 hover:ring-[#FF6600]/30"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          p.type === "pre-incubation"
                            ? "bg-[#FF6600]/10 text-[#FF6600]"
                            : "bg-[#704214]/10 text-[#704214]"
                        }`}
                      >
                        {p.type === "pre-incubation"
                          ? "Pré-incubation"
                          : "Incubation"}
                      </span>
                      <h2 className="mt-3 font-display text-lg font-bold text-[#704214] group-hover:text-[#5C3317]">
                        {isPreIncubation(p) ? p.projectName : p.name}
                      </h2>
                      {isPreIncubation(p) && p.oneSentence && (
                        <p className="mt-2 line-clamp-2 text-sm italic text-gray-600">
                          &ldquo;{p.oneSentence}&rdquo;
                        </p>
                      )}
                      {!isPreIncubation(p) && p.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                          {p.description}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#FF6600] group-hover:gap-2 transition-all">
                        Voir et modifier
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
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Détail / Édition */}
              <AnimatePresence>
                {selected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={closeDetail}
                  >
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                      className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
                    >
                      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                        <h2 className="font-display text-xl font-bold text-[#704214]">
                          {isPreIncubation(selected)
                            ? selected.projectName
                            : selected.name}
                        </h2>
                        <div className="flex items-center gap-2">
                          {mode === "view" ? (
                            <button
                              type="button"
                              onClick={openEdit}
                              className="rounded-full bg-[#FF6600] px-5 py-2.5 font-semibold text-white hover:bg-[#FF8C00]"
                            >
                              Modifier
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                isPreIncubation(selected)
                                  ? handleSavePreIncubation()
                                  : handleSaveIncubation()
                              }
                              disabled={saving}
                              className="rounded-full bg-[#28a745] px-5 py-2.5 font-semibold text-white hover:bg-[#218838] disabled:opacity-70"
                            >
                              {saving ? "Enregistrement…" : "Enregistrer"}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={closeDetail}
                            className="rounded-full border-2 border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100"
                          >
                            Fermer
                          </button>
                        </div>
                      </div>

                      <div className="p-6">
                        {saveError && (
                          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                            {saveError}
                          </p>
                        )}

                        {mode === "view" && (
                          <div className="space-y-6">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                                selected.type === "pre-incubation"
                                  ? "bg-[#FF6600]/10 text-[#FF6600]"
                                  : "bg-[#704214]/10 text-[#704214]"
                              }`}
                            >
                              {selected.type === "pre-incubation"
                                ? "Pré-incubation"
                                : "Incubation"}
                            </span>

                            {isPreIncubation(selected) && (
                              <>
                                {selected.oneSentence && (
                                  <div className="rounded-xl bg-[#F5EBE0] p-4">
                                    <p className="text-sm font-semibold text-[#704214]">
                                      Mon projet en une phrase
                                    </p>
                                    <p className="mt-2 italic text-gray-700">
                                      &ldquo;{selected.oneSentence}&rdquo;
                                    </p>
                                  </div>
                                )}
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {Object.entries(
                                    selected.projectContent || {}
                                  ).map(
                                    ([key, value]) =>
                                      FICHE_LABELS[key] && (
                                        <div
                                          key={key}
                                          className="rounded-lg border border-gray-200 p-3"
                                        >
                                          <p className="text-xs font-semibold text-[#704214]">
                                            {FICHE_LABELS[key]}
                                          </p>
                                          <p className="mt-1 text-sm text-gray-700">
                                            {value}
                                          </p>
                                        </div>
                                      )
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">
                                  Score de maturité :{" "}
                                  <strong>{selected.maturityScore} %</strong> —
                                  Complété le{" "}
                                  {formatDate(selected.lastPlayedAt)}
                                </p>
                              </>
                            )}

                            {!isPreIncubation(selected) && (
                              <>
                                <p>
                                  <span className="font-semibold text-[#704214]">
                                    Statut :
                                  </span>{" "}
                                  {selected.status}
                                </p>
                                {selected.description && (
                                  <div className="rounded-lg border border-gray-200 p-3">
                                    <p className="text-xs font-semibold text-[#704214]">
                                      Description
                                    </p>
                                    <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                                      {selected.description}
                                    </p>
                                  </div>
                                )}
                                <p className="text-sm text-gray-500">
                                  Mis à jour le{" "}
                                  {formatDate(selected.updatedAt)}
                                </p>
                              </>
                            )}
                          </div>
                        )}

                        {mode === "edit" && (
                          <div className="space-y-4">
                            {isPreIncubation(selected) ? (
                              <>
                                <label className="block">
                                  <span className="text-sm font-semibold text-[#704214]">
                                    Nom du projet
                                  </span>
                                  <input
                                    type="text"
                                    value={editForm.projectName ?? ""}
                                    onChange={(e) =>
                                      setEditForm((f) => ({
                                        ...f,
                                        projectName: e.target.value,
                                      }))
                                    }
                                    className="input-ism mt-1"
                                  />
                                </label>
                                <label className="block">
                                  <span className="text-sm font-semibold text-[#704214]">
                                    Mon projet en une phrase
                                  </span>
                                  <textarea
                                    value={editForm.oneSentence ?? ""}
                                    onChange={(e) =>
                                      setEditForm((f) => ({
                                        ...f,
                                        oneSentence: e.target.value,
                                      }))
                                    }
                                    rows={3}
                                    className="input-ism mt-1 resize-y"
                                  />
                                </label>
                                {Object.keys(FICHE_LABELS).map((key) => (
                                  <label key={key} className="block">
                                    <span className="text-sm font-semibold text-[#704214]">
                                      {FICHE_LABELS[key]}
                                    </span>
                                    <textarea
                                      value={editForm[key] ?? ""}
                                      onChange={(e) =>
                                        setEditForm((f) => ({
                                          ...f,
                                          [key]: e.target.value,
                                        }))
                                      }
                                      rows={2}
                                      className="input-ism mt-1 resize-y"
                                    />
                                  </label>
                                ))}
                              </>
                            ) : (
                              <>
                                <label className="block">
                                  <span className="text-sm font-semibold text-[#704214]">
                                    Nom du projet
                                  </span>
                                  <input
                                    type="text"
                                    value={editForm.name ?? ""}
                                    onChange={(e) =>
                                      setEditForm((f) => ({
                                        ...f,
                                        name: e.target.value,
                                      }))
                                    }
                                    className="input-ism mt-1"
                                  />
                                </label>
                                <label className="block">
                                  <span className="text-sm font-semibold text-[#704214]">
                                    Statut
                                  </span>
                                  <select
                                    value={editForm.status ?? ""}
                                    onChange={(e) =>
                                      setEditForm((f) => ({
                                        ...f,
                                        status: e.target.value,
                                      }))
                                    }
                                    className="input-ism mt-1"
                                  >
                                    <option value="pre-incubation">
                                      Pré-incubation
                                    </option>
                                    <option value="incubation">
                                      Incubation
                                    </option>
                                  </select>
                                </label>
                                <label className="block">
                                  <span className="text-sm font-semibold text-[#704214]">
                                    Description
                                  </span>
                                  <textarea
                                    value={editForm.description ?? ""}
                                    onChange={(e) =>
                                      setEditForm((f) => ({
                                        ...f,
                                        description: e.target.value,
                                      }))
                                    }
                                    rows={5}
                                    className="input-ism mt-1 resize-y"
                                  />
                                </label>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </main>
  );
}
