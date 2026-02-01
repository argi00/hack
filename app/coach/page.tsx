"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { FeedbackForm } from "@/components/ui/FeedbackForm";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { useAuth } from "@/lib/auth-context";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  incubationCount: number;
  preIncubationCount: number;
  totalProjects: number;
}

interface ProjectFeedback {
  id: string;
  category: string;
  priority: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  coach: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  maturityScore?: number;
  projectContent?: Record<string, string>;
  feedbacks: ProjectFeedback[];
}

export default function CoachPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "COACH" && user.role !== "ADMIN") {
      router.push("/");
    }
  }, [authLoading, user, router]);

  // Charger la liste des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/coach/users?limit=1000");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Charger les projets quand un utilisateur est sélectionné
  const handleSelectUser = async (selectedUserData: User) => {
    setSelectedUser(selectedUserData);
    setSelectedProject(null);
    try {
      const res = await fetch(`/api/coach/users/${selectedUserData.id}/projects`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Erreur:", error);
      setProjects([]);
    }
  };

  const handleSubmitFeedback = async (formData: {
    category: string;
    priority: string;
    content: string;
  }) => {
    if (!selectedProject || !selectedUser) return;

    try {
      setSubmitting(true);
      const endpoint =
        selectedProject.status === "pre-incubation"
          ? "/api/coach/preincubation-feedbacks"
          : "/api/coach/feedbacks";

      const payload =
        selectedProject.status === "pre-incubation"
          ? {
              gameProgressId: selectedProject.id,
              userId: selectedUser.id,
              ...formData,
            }
          : {
              projectId: selectedProject.id,
              userId: selectedUser.id,
              ...formData,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      // Rafraîchir les projets
      const projectsRes = await fetch(
        `/api/coach/users/${selectedUser.id}/projects`
      );
      const projectsData = await projectsRes.json();
      setProjects(projectsData.projects || []);

      // Fermer le formulaire et réinitialiser
      setShowFeedbackForm(false);
      alert("✅ Feedback envoyé avec succès!");
    } catch (error) {
      console.error("Erreur:", error);
      alert("❌ Erreur lors de l'envoi du feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading || loading) {
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tableau de bord Coach
          </h1>
          <p className="text-gray-600">
            {selectedUser
              ? `Projets de ${selectedUser.firstName} ${selectedUser.lastName}`
              : "Sélectionnez un utilisateur pour voir ses projets et donner des feedbacks"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Users List - Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Utilisateurs</h2>
                <p className="text-xs text-gray-600 mt-1">
                  Total: {users.length} utilisateurs
                </p>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                />
              </div>

              {/* Users List */}
              <div className="flex-1 overflow-y-auto">
                {filteredUsers.length > 0 ? (
                  <div className="space-y-2 p-4">
                    {filteredUsers.map((u) => (
                      <motion.button
                        key={u.id}
                        onClick={() => handleSelectUser(u)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedUser?.id === u.id
                            ? "bg-[#FF6600] text-white"
                            : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="font-semibold text-sm">
                          {u.firstName} {u.lastName}
                        </div>
                        <div className="text-xs opacity-75 mt-1">
                          {u.email}
                        </div>
                        <div className="text-xs opacity-75 mt-1 font-medium">
                          {u.totalProjects} projet{u.totalProjects > 1 ? "s" : ""}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">
                    Aucun utilisateur trouvé
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Projects and Details - Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {selectedUser ? (
              <div className="space-y-6">
                {/* User Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedUser.firstName} {selectedUser.lastName}
                      </h3>
                      <div className="space-y-1 mt-2 text-sm text-gray-600">
                        <p>Email: {selectedUser.email}</p>
                        <p>Téléphone: {selectedUser.phone || "Non fourni"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-900">
                          {selectedUser.incubationCount}
                        </p>
                        <p className="text-xs text-blue-700 mt-1">Incubation</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-purple-900">
                          {selectedUser.preIncubationCount}
                        </p>
                        <p className="text-xs text-purple-700 mt-1">Jeu</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-900">
                          {selectedUser.totalProjects}
                        </p>
                        <p className="text-xs text-green-700 mt-1">Total</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Projects List */}
                {projects.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Projets ({projects.length})
                    </h3>
                    {projects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`bg-white rounded-lg border transition-all cursor-pointer ${
                          selectedProject?.id === project.id
                            ? "border-[#FF6600] shadow-lg bg-orange-50"
                            : "border-gray-200 hover:border-[#FF6600]"
                        }`}
                      >
                        <div
                          onClick={() => setSelectedProject(project)}
                          className="p-6"
                        >
                          {/* Project Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-900">
                                {project.name}
                              </h4>
                              {project.description && (
                                <p className="text-sm text-gray-600 mt-2">
                                  {project.description}
                                </p>
                              )}
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                                project.status === "incubation"
                                  ? "bg-blue-100 text-blue-700"
                                  : project.status === "pre-incubation"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {project.status === "pre-incubation"
                                ? "Jeu éducatif"
                                : project.status}
                            </span>
                          </div>

                          {/* Project Content/Summary */}
                          {project.projectContent && Object.keys(project.projectContent).length > 0 && (
                            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-sm font-semibold text-blue-900 mb-2">
                                📋 Résumé du projet
                              </p>
                              <div className="space-y-2">
                                {Object.entries(project.projectContent).map(([key, value]) => (
                                  <div key={key}>
                                    <p className="text-xs font-medium text-blue-700 uppercase">
                                      {key}
                                    </p>
                                    <p className="text-sm text-blue-900 mt-1">
                                      {typeof value === "string" ? value : JSON.stringify(value)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Maturity Score for pre-incubation */}
                          {project.maturityScore !== undefined && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-medium text-gray-700">
                                  Score de maturité
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {project.maturityScore}%
                                </p>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div
                                  className="bg-[#FF6600] h-2 rounded-full"
                                  style={{
                                    width: `${project.maturityScore}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {/* Existing Feedbacks */}
                          {project.feedbacks.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-semibold text-gray-700 mb-2">
                                Feedbacks reçus ({project.feedbacks.length})
                              </p>
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {project.feedbacks.map((fb) => (
                                  <div
                                    key={fb.id}
                                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                                  >
                                    <div className="flex gap-2 mb-2">
                                      <CategoryBadge
                                        category={fb.category}
                                      />
                                      <PriorityBadge priority={fb.priority} />
                                    </div>
                                    <p className="text-sm text-gray-700">
                                      {fb.content}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">
                                      par {fb.coach.user.firstName}{" "}
                                      {fb.coach.user.lastName} •{" "}
                                      {new Date(
                                        fb.createdAt
                                      ).toLocaleDateString("fr-FR")}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Add Feedback Button */}
                          {selectedProject?.id === project.id && (
                            <motion.button
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowFeedbackForm(true);
                              }}
                              className="w-full mt-4 px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                            >
                              Ajouter un feedback
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 20 }}
                    className="text-center py-16 bg-white rounded-lg border border-gray-200"
                  >
                    <p className="text-gray-600 text-lg">
                      Aucun projet pour cet utilisateur
                    </p>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 20 }}
                className="text-center py-16 bg-white rounded-lg border border-gray-200"
              >
                <p className="text-gray-600 text-lg">
                  Sélectionnez un utilisateur pour voir ses projets
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Feedback Modal */}
      <Modal
        isOpen={showFeedbackForm && !!selectedProject}
        onClose={() => {
          setShowFeedbackForm(false);
        }}
        title="Ajouter un feedback"
        size="lg"
      >
        {selectedProject && selectedUser && (
          <FeedbackForm
            projectName={selectedProject.name}
            userName={`${selectedUser.firstName} ${selectedUser.lastName}`}
            onSubmit={handleSubmitFeedback}
            loading={submitting}
            onCancel={() => {
              setShowFeedbackForm(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
