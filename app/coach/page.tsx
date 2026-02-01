"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/lib/auth-context";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectCount: number;
  preIncubationCount?: number;
  totalProjects?: number;
  projects?: Project[];
}

interface Project {
  type: "pre-incubation" | "incubation";
  id: string;
  name: string;
  summary: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  projectContent?: Record<string, string> | null;
  feedbacks: Feedback[];
}

interface Feedback {
  id: string;
  category: string;
  priority: string;
  content: string;
  createdAt: string;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const statusConfig = (status: string) => {
  if (status === "incubation") {
    return {
      label: "Incubation",
      badge: "bg-blue-100 text-blue-700",
      dot: "bg-blue-500",
    };
  }
  return {
    label: "Pré-incubation",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  };
};

export default function CoachPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    category: "PRODUIT",
    priority: "MOYENNE",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "COACH") {
      router.push("/");
    }
  }, [authLoading, user, router]);

  // Charger tous les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/users?limit=1000`);
        const data = await res.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user?.role === "COACH") {
      fetchUsers();
    }
  }, [authLoading, user?.role]);

  // Charger les projets d'un utilisateur
  const handleSelectUser = async (selectedUser: User) => {
    try {
      const res = await fetch(`/api/user/${selectedUser.id}/projects`);
      const projects = await res.json();
      setSelectedUser({ ...selectedUser, projects });
    } catch (error) {
      console.error("Erreur:", error);
      setSelectedUser(selectedUser);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!selectedProject || !selectedUser) return;
    if (selectedProject.type !== "incubation") return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/coach/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: selectedProject.id,
          userId: selectedUser.id,
          category: feedbackData.category,
          priority: feedbackData.priority,
          content: feedbackData.content,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      alert("✅ Feedback envoyé avec succès!");
      setShowFeedbackModal(false);
      setFeedbackData({ category: "PRODUIT", priority: "MOYENNE", content: "" });

      // Rafraîchir les projets
      if (selectedUser) {
        handleSelectUser(selectedUser);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("❌ Erreur lors de l'envoi du feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userProjects = selectedUser?.projects ?? [];
  const totalFeedbacks = userProjects.reduce(
    (acc, p) => acc + (p.feedbacks ? p.feedbacks.length : 0),
    0
  );
  const lastUpdate = userProjects
    .map((p) => p.updatedAt)
    .sort()
    .slice(-1)[0];

  if (authLoading || (loading && users.length === 0)) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin">
            <div className="h-12 w-12 border-4 border-gray-200 border-t-[#FF6600] rounded-full"></div>
          </div>
        </main>
      </div>
    );
  }

  // Vue sélection d'utilisateur
  if (!selectedUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Suivi des Projets
            </h1>
            <p className="text-gray-600">
              Sélectionnez un utilisateur pour voir ses projets et donner des feedbacks
            </p>
          </motion.div>

          {/* Barre de recherche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
            />
          </motion.div>

          {/* Liste des utilisateurs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredUsers.map((userItem, idx) => (
              <motion.div
                key={userItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleSelectUser(userItem)}
                className="group bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer hover:border-[#FF6600]"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#FF6600]/10 text-[#FF6600] flex items-center justify-center font-bold">
                    {userItem.firstName[0]}
                    {userItem.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {userItem.firstName} {userItem.lastName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 truncate">
                          {userItem.email}
                        </p>
                      </div>
                      <div className="bg-[#FF6600] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {userItem.totalProjects ?? userItem.projectCount} projet{(userItem.totalProjects ?? userItem.projectCount) > 1 ? "s" : ""}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{userItem.phone}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#FF6600]">
                      Voir les projets
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredUsers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-lg border border-gray-200"
            >
              <p className="text-gray-600 text-lg">
                {searchTerm ? "Aucun utilisateur trouvé" : "Aucun utilisateur avec projet"}
              </p>
            </motion.div>
          )}
        </main>
      </div>
    );
  }

  // Vue détail utilisateur et ses projets
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12">
        {/* Header avec bouton retour */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <div>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-[#FF6600] font-medium hover:underline mb-4"
            >
              ← Retour à la liste
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedUser.firstName} {selectedUser.lastName}
            </h1>
            <p className="text-gray-600 mt-1">{selectedUser.email}</p>
          </div>
          <div className="bg-[#FF6600] text-white px-6 py-3 rounded-xl font-semibold">
            {(selectedUser.totalProjects ?? selectedUser.projectCount)} projet{(selectedUser.totalProjects ?? selectedUser.projectCount) > 1 ? "s" : ""}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="rounded-2xl bg-white border border-gray-200 p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase">Projets actifs</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{userProjects.length}</p>
            <p className="text-xs text-gray-500 mt-1">Suivi en cours</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase">Feedbacks envoyés</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{totalFeedbacks}</p>
            <p className="text-xs text-gray-500 mt-1">Historique consolidé</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase">Dernière activité</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {lastUpdate ? formatDate(lastUpdate) : "—"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Dernière mise à jour</p>
          </div>
        </motion.div>

        {/* Liste des projets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {userProjects.length > 0 ? (
            userProjects.map((project, idx) => {
              const status = statusConfig(project.status);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} />
                        <h2 className="text-xl font-bold text-gray-900 truncate">
                          {project.name}
                        </h2>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.badge}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {project.summary || "Résumé non renseigné"}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="text-xs uppercase text-gray-400">Créé le</p>
                          <p className="font-medium text-gray-700">
                            {formatDate(project.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-gray-400">Mis à jour</p>
                          <p className="font-medium text-gray-700">
                            {formatDate(project.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 lg:items-end">
                      <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        {project.feedbacks?.length ?? 0} feedback{project.feedbacks?.length === 1 ? "" : "s"}
                      </div>
                      <button
                        onClick={() => {
                          if (project.type !== "incubation") return;
                          setSelectedProject(project);
                          setShowFeedbackModal(true);
                        }}
                        disabled={project.type !== "incubation"}
                        className={`px-4 py-2 rounded-lg transition-colors text-sm font-semibold ${
                          project.type === "incubation"
                            ? "bg-[#FF6600] text-white hover:bg-orange-600"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {project.type === "incubation"
                          ? "Ajouter un feedback"
                          : "Feedback indisponible"}
                      </button>
                    </div>
                  </div>

                  {project.feedbacks && project.feedbacks.length > 0 && (
                    <div className="mt-6 border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Derniers feedbacks
                        </h3>
                        <span className="text-xs text-gray-500">
                          {project.feedbacks.length} au total
                        </span>
                      </div>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {project.feedbacks.map((feedback) => (
                          <div
                            key={feedback.id}
                            className="p-3 bg-gray-50 rounded-xl border border-gray-200"
                          >
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-semibold">
                                {feedback.category}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs rounded font-semibold ${
                                  feedback.priority === "HAUTE"
                                    ? "bg-red-100 text-red-700"
                                    : feedback.priority === "MOYENNE"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {feedback.priority}
                              </span>
                              <span className="text-xs text-gray-500 ml-auto">
                                {formatDate(feedback.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              {feedback.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-2xl border border-gray-200"
            >
              <p className="text-gray-600 text-lg">Aucun projet pour cet utilisateur</p>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Modal Feedback */}
      <AnimatePresence>
        {showFeedbackModal && selectedProject && (
          <Modal
            isOpen={true}
            onClose={() => {
              setShowFeedbackModal(false);
              setFeedbackData({ category: "PRODUIT", priority: "MOYENNE", content: "" });
            }}
            title="Ajouter un feedback"
            size="lg"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Catégorie
                </label>
                <select
                  value={feedbackData.category}
                  onChange={(e) =>
                    setFeedbackData({ ...feedbackData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                >
                  <option value="PRODUIT">Produit</option>
                  <option value="BUSINESS">Business</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="TECHNIQUE">Technique</option>
                  <option value="AUTRE">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Priorité
                </label>
                <select
                  value={feedbackData.priority}
                  onChange={(e) =>
                    setFeedbackData({ ...feedbackData, priority: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                >
                  <option value="BASSE">Basse</option>
                  <option value="MOYENNE">Moyenne</option>
                  <option value="HAUTE">Haute</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Contenu du feedback
                </label>
                <textarea
                  value={feedbackData.content}
                  onChange={(e) =>
                    setFeedbackData({ ...feedbackData, content: e.target.value })
                  }
                  rows={6}
                  placeholder="Entrez votre feedback détaillé..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setFeedbackData({ category: "PRODUIT", priority: "MOYENNE", content: "" });
                  }}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  disabled={!feedbackData.content.trim() || submitting}
                  className="flex-1 px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50"
                >
                  {submitting ? "Envoi..." : "Envoyer le feedback"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
