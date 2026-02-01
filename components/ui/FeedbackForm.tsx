"use client";

import { useState } from "react";
import { feedbackCategoryLabels, FeedbackCategory } from "@/lib/constants";

interface FeedbackFormProps {
  projectName: string;
  userName: string;
  onSubmit: (data: {
    category: string;
    priority: string;
    content: string;
  }) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

export function FeedbackForm({
  projectName,
  userName,
  onSubmit,
  loading = false,
  onCancel,
}: FeedbackFormProps) {
  const [category, setCategory] = useState("PRODUIT");
  const [priority, setPriority] = useState("MOYENNE");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (content.trim().length < 10) {
      setError("Le feedback doit contenir au moins 10 caractères");
      return;
    }

    try {
      await onSubmit({ category, priority, content });
      setContent("");
      setCategory("PRODUIT");
      setPriority("MOYENNE");
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi du feedback");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Header info */}
      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Projet:</span> {projectName}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Utilisateur:</span> {userName}
        </p>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Catégorie de feedback
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
        >
          {Object.entries(feedbackCategoryLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priorité
        </label>
        <div className="space-y-2">
          {["BASSE", "MOYENNE", "HAUTE"].map((p) => (
            <label key={p} className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={p}
                checked={priority === p}
                onChange={(e) => setPriority(e.target.value)}
                className="w-4 h-4 text-orange-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                {p === "BASSE"
                  ? "Basse"
                  : p === "MOYENNE"
                    ? "Moyenne"
                    : "Haute"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Feedback
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Écrivez votre feedback constructif ici..."
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          {content.length} / minimum 10 caractères
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              Envoi...
            </>
          ) : (
            "Envoyer le feedback"
          )}
        </button>
      </div>
    </form>
  );
}
