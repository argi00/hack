import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function InscriptionPage() {
  return (
    <>
      <Header />
      <main className="section bg-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold text-[#704214]">
            Créer mon compte
          </h1>
          <p className="mt-4 text-gray-600">
            Page d&apos;inscription — À venir après validation du frontend
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
