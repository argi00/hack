import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HackathonAgriTechPage() {
  return (
    <>
      <Header />
      <main className="section bg-white">
        <div className="container-custom text-center">
          <span className="badge-orange">À LA UNE</span>
          <h1 className="mt-4 text-3xl font-bold text-[#704214]">
            Hackathon AgriTech & Sustainability
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            15-16 Février 2026
          </p>
          <p className="mt-4 text-gray-600">
            Formulaire d&apos;inscription — À venir après validation du frontend
          </p>
          <Link
            href="/"
            className="btn-primary mt-8 inline-flex items-center gap-2"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
