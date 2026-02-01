"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryEmojis: { [key: string]: string } = {
  all: "📚",
  Guides: "📋",
  Lancement: "🚀",
  Business: "💼",
  Pitch: "🎤",
  Finance: "💰",
  Metriques: "📊",
  Marketing: "🌐",
  Outils: "⚙️",
};

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          activeCategory === "all"
            ? "bg-[#FF6600] text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {categoryEmojis["all"]} Tous
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            activeCategory === category
              ? "bg-[#FF6600] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {categoryEmojis[category] || "📚"} {category}
        </button>
      ))}
    </div>
  );
}
