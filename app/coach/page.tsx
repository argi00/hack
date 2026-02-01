"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Modal } from "@/components/ui/Modal";
import { FeedbackForm } from "@/components/ui/FeedbackForm";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  feedbacks: Array<{
    id: string;
    category: string;
    priority: string;
    content: string;
    isRead: boolean;
    createdAt: string;
  }>;
}

export default function CoachPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Charger les projets assignés
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // TODO: Remplacer par la véritable coachId depuis le contexte d'auth
        const coachId = "test-coach-id";
        const res = await fetch(`/api/coach/projects?coachId=${coachId}`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmitFeedback = async (formData: {
    category: string;
    priority: string;
    content: string;
  }) => {
    if (!selectedProject) return;

    try {
      setSubmitting(true);
      const coachId = "test-coach-id"; // TODO: depuis contexte auth

      const res = await fetch("/api/coach/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coachId,
          projectId: selectedProject.id,
          userId: selectedProject.user.id || "unknown",
          ...formData,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      // Rafraîchir les données
      setSelectedProject(null);
      setShowFeedbackForm(false);

      // Afficher notification de succès
      alert("✅ Feedback envoyé avec succès!");
    } catch (error) {
      console.error("Erreur:", error);
      throw new Error("Erreur lors de l'envoi du feedback");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin">
            <div className="h-12 w-12 border-4 border-gray-200 border-t-[#FF6600] rounded-full"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mes projets mentorés
          </h1>
          <p className="text-gray-600">
            Donnez vos feedbacks et suivez la progression des projets
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">Projets assignés</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">
              {projects.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 font-medium">En incubation</p>
            <p className="text-3xl font-bold text-green-900 mt-2">
              {projects.filter((p) => p.status === "incubation").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-700 font-medium">
              Total feedbacks donnés
            </p>
            <p className="text-3xl font-bold text-orange-900 mt-2">
              {projects.reduce((acc, p) => acc + p.feedbacks.length, 0)}
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {project.description}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                        project.status === "incubation"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Entrepreneur Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Entrepreneur
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">
                        {project.user.firstName} {project.user.lastName}
                      </p>
                      <p className="text-xs text-gray-600">
                        {project.user.email}
                      </p>
                      <p className="text-xs text-gray-600">
                        {project.user.phone}
                      </p>
                    </div>
                  </div>

                  {/* Feedbacks */}
                  {project.feedbacks.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Vos feedbacks ({project.feedbacks.length})
                      </p>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {project.feedbacks.map((fb) => (
                          <div
                            key={fb.id}
                            className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs"
                          >
                            <div className="flex gap-2 mb-2">
                              <CategoryBadge category={fb.category} />
                              <PriorityBadge priority={fb.priority} />
                            </div>
                            <p className="text-gray-700">{fb.content}</p>
                            <p className="text-gray-500 mt-1">
                              {new Date(fb.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowFeedbackForm(true);
                    }}
                    className="w-full mt-4 px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    Ajouter un feedback
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200"
          >
            <p className="text-gray-600 text-lg">
              Aucun projet assigné pour le moment
            </p>
          </motion.div>
        )}
      </main>

      {/* Feedback Modal */}
      <Modal
        isOpen={showFeedbackForm && !!selectedProject}
        onClose={() => {
          setShowFeedbackForm(false);
          setSelectedProject(null);
        }}
        title="Ajouter un feedback"
        size="lg"
      >
        {selectedProject && (
          <FeedbackForm
            projectName={selectedProject.name}
            userName={`${selectedProject.user.firstName} ${selectedProject.user.lastName}`}
            onSubmit={handleSubmitFeedback}
            loading={submitting}
            onCancel={() => {
              setShowFeedbackForm(false);
              setSelectedProject(null);
            }}
          />
        )}
      </Modal>

      <Footer />
    </div>
  );
}
