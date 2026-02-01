"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ResourceCard from "@/components/resources/ResourceCard";
import CategoryFilter from "@/components/resources/CategoryFilter";
import SearchBar from "@/components/resources/SearchBar";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  author: string;
  imageUrl?: string;
}

const CATEGORIES = [
  "Guides",
  "Lancement",
  "Business",
  "Pitch",
  "Finance",
  "Metriques",
  "Marketing",
  "Outils",
];

export default function RessourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Charger les ressources au démarrage
  useEffect(() => {
    fetchResources();
  }, []);

  // Filtrer les ressources quand la catégorie ou la recherche change
  useEffect(() => {
    filterResources();
  }, [resources, activeCategory, searchQuery]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/resources?limit=100");
      const data = await response.json();
      if (data.success) {
        setResources(data.resources);
      }
    } catch (error) {
      console.error("Erreur chargement ressources:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    // Filtrer par catégorie
    if (activeCategory !== "all") {
      filtered = filtered.filter((r) => r.category === activeCategory);
    }

    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.author.toLowerCase().includes(query)
      );
    }

    setFilteredResources(filtered);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="section-baobab">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#704214] mb-4">
            📚 Ressources
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Développez vos compétences entrepreneuriales avec nos guides, tutoriels et outils
            recommandés pour réussir votre startup.
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="section bg-white">
        <div className="container-custom">
          {/* Barre de recherche */}
          <SearchBar onSearch={setSearchQuery} />

          {/* Filtrage par catégorie */}
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Résultats */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600]" />
              <p className="mt-4 text-gray-600">Chargement des ressources...</p>
            </div>
          ) : filteredResources.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 mb-6">
                {filteredResources.length} ressource
                {filteredResources.length > 1 ? "s" : ""} trouvée
                {filteredResources.length > 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} {...resource} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">
                Aucune ressource trouvée
              </p>
              {searchQuery ? (
                <p className="text-sm text-gray-500 mb-4">
                  Essayez une autre recherche
                </p>
              ) : (
                <p className="text-sm text-gray-500 mb-4">
                  Essayez une autre catégorie
                </p>
              )}
              <Link
                href="/ressources"
                className="btn-primary inline-flex"
              >
                ← Retour
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

