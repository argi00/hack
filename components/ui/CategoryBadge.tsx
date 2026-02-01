"use client";

import { feedbackCategoryLabels, FeedbackCategory } from "@/lib/constants";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
  const label =
    feedbackCategoryLabels[category as FeedbackCategory] || category;

  const categoryColors: Record<string, string> = {
    PRODUIT: "#3B82F6", // Bleu
    MARCHE: "#8B5CF6", // Violet
    BUSINESS: "#EC4899", // Rose
    EQUIPE: "#14B8A6", // Teal
    AUTRE: "#6B7280", // Gris
  };

  const color = categoryColors[category] || "#6B7280";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${className}`}
      style={{ backgroundColor: color }}
      role="status"
      aria-label={`Catégorie: ${label}`}
    >
      {label}
    </span>
  );
}
