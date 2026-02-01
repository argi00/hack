"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ResourceCard from "@/components/resources/ResourceCard";

interface Resource {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: string;
  duration: number;
  author: string;
  source: string;
  createdAt: string;
  tags?: string;
  imageUrl?: string;
  videoUrl?: string;
  externalUrl?: string;
}

const categoryEmojis: { [key: string]: string } = {
  Guides: "📋",
  Lancement: "🚀",
  Business: "💼",
  Pitch: "🎤",
  Finance: "💰",
  Metriques: "📊",
  Marketing: "🌐",
  Outils: "⚙️",
};

const difficultyColors: { [key: string]: string } = {
  Debutant: "bg-green-100 text-green-800",
  Intermediaire: "bg-yellow-100 text-yellow-800",
  Avance: "bg-red-100 text-red-800",
};

export default function ResourceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [resource, setResource] = useState<Resource | null>(null);
  const [relatedResources, setRelatedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchResource();
  }, [params.id]);

  useEffect(() => {
    if (resource) {
      checkSavedStatus();
    }
  }, [resource]);

  const fetchResource = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/resources/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setResource(data.resource);
        setRelatedResources(data.relatedResources);
      }
    } catch (error) {
      console.error("Erreur chargement ressource:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkSavedStatus = async () => {
    try {
      const response = await fetch(
        `/api/user/saved-resources/${resource?.id}`
      );
      const data = await response.json();
      if (data.success) {
        setIsSaved(data.saved);
      }
    } catch (error) {
      console.error("Erreur vérification save:", error);
    }
  };

  const handleSave = async () => {
    if (!resource) return;

    setIsSaving(true);
    try {
      if (isSaved) {
        // Supprimer
        await fetch(
          `/api/user/saved-resources?resourceId=${resource.id}`,
          { method: "DELETE" }
        );
        setIsSaved(false);
      } else {
        // Ajouter
        const response = await fetch("/api/user/saved-resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resourceId: resource.id }),
        });

        if (response.ok) {
          setIsSaved(true);
        }
      }
    } catch (error) {
      console.error("Erreur sauvegarde:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="section bg-white">
        <div className="container-custom text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600]" />
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </main>
    );
  }

  if (!resource) {
    return (
      <main className="section bg-white">
        <div className="container-custom text-center py-12">
          <p className="text-lg text-gray-600 mb-4">Ressource non trouvée</p>
          <Link href="/ressources" className="btn-primary inline-flex">
            ← Retour aux ressources
          </Link>
        </div>
      </main>
    );
  }

  const tags = resource.tags ? JSON.parse(resource.tags) : [];
  const formattedDate = new Date(resource.createdAt).toLocaleDateString(
    "fr-FR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="section bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <Link href="/ressources" className="text-[#FF6600] hover:text-[#704214]">
            ← Retour aux ressources
          </Link>
        </div>
      </div>

      {/* Hero avec image */}
      <div className="h-80 bg-gradient-to-br from-[#704214] to-[#FF6600] opacity-85 relative overflow-hidden flex items-center justify-center">
        <span className="text-9xl">{categoryEmojis[resource.category] || "📚"}</span>
      </div>

      {/* Contenu */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          {/* Meta */}
          <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-200">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
              {categoryEmojis[resource.category]} {resource.category}
            </span>
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${difficultyColors[resource.difficulty]}`}
            >
              {resource.difficulty}
            </span>
            <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold">
              ⏱️ {resource.duration} min
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#704214] mb-4">
            {resource.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-700 mb-6">{resource.description}</p>

          {/* Auteur et date */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                ✍️ <strong>{resource.author}</strong>
              </p>
              <p className="text-sm text-gray-600">
                📅 {formattedDate}
                {resource.source && ` • Source: ${resource.source}`}
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 ${
                isSaved
                  ? "bg-[#FF6600] text-white"
                  : "bg-gray-100 text-[#704214] hover:bg-[#704214] hover:text-white"
              }`}
            >
              {isSaved ? "✅ Sauvegardée" : "⭐ Sauvegarder"}
            </button>
          </div>

          {/* Contenu principal */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              className="text-gray-700 space-y-4"
              dangerouslySetInnerHTML={{
                __html: resource.content
                  .replace(/\n/g, "</p><p>")
                  .replace(/<p><\/p>/g, "")
                  .replace(/<p># /g, "<h2 class='text-2xl font-bold text-[#704214] mt-6 mb-3'>")
                  .replace(/<\/p>/g, "</h2></p>")
                  .replace(/<p>## /g, "<h3 class='text-xl font-bold text-[#704214] mt-4 mb-2'>")
                  .replace(/<\/p>/g, "</h3></p>")
                  .replace(/<p>- /g, "<li class='list-disc list-inside ml-4'>")
                  .replace(/<p>\*\*/g, "<p><strong>")
                  .replace(/\*\*<\/p>/g, "</strong></p>")
                  .replace(/<p>/g, "<p class='mb-4'>"),
              }}
            />
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-12 pb-12 border-b border-gray-200">
              <h3 className="text-lg font-bold text-[#704214] mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ressources connexes */}
          {relatedResources.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-[#704214] mb-6">
                📚 Ressources connexes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedResources.slice(0, 3).map((r) => (
                  <ResourceCard key={r.id} {...r} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <section className="section bg-gray-50 border-t border-gray-200">
        <div className="container-custom max-w-4xl">
          <div className="flex justify-between items-center">
            <Link
              href="/ressources"
              className="text-[#FF6600] hover:text-[#704214] font-semibold"
            >
              ← Retour aux ressources
            </Link>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 ${
                isSaved
                  ? "bg-[#FF6600] text-white"
                  : "bg-[#704214] text-white hover:bg-[#FF6600]"
              }`}
            >
              {isSaved ? "✅ Sauvegardée" : "⭐ Sauvegarder cette ressource"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
