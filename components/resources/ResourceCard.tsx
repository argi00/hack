"use client";

import Link from "next/link";
import { useState } from "react";

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  author: string;
  imageUrl?: string;
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

export default function ResourceCard({
  id,
  title,
  description,
  category,
  difficulty,
  duration,
  author,
}: ResourceCardProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch("/api/user/saved-resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId: id }),
      });

      if (response.ok) {
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Erreur sauvegarde:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Link href={`/ressources/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
        {/* Image placeholder */}
        <div className="h-40 bg-gradient-to-br from-[#704214] to-[#FF6600] opacity-80 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">{categoryEmojis[category] || "📚"}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-full">
          {/* Meta */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600">
              {categoryEmojis[category]} {category}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
          </div>

          {/* Titre */}
          <h3 className="font-bold text-base text-[#704214] mb-2 line-clamp-2 group-hover:text-[#FF6600] transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">
            {description}
          </p>

          {/* Meta infos */}
          <div className="text-xs text-gray-500 mb-3 pb-3 border-t border-gray-100">
            <p className="mt-2">⏱️ {duration} min</p>
            <p>✍️ {author}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 px-3 py-1.5 text-sm font-medium bg-white text-[#704214] border border-[#704214] rounded hover:bg-[#704214] hover:text-white transition-colors disabled:opacity-50"
            >
              {isSaved ? "✅ Sauvegardée" : "⭐ Sauvegarder"}
            </button>
            <div className="flex-1 px-3 py-1.5 text-sm font-medium bg-[#FF6600] text-white rounded hover:bg-[#704214] transition-colors text-center">
              En Savoir +
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
