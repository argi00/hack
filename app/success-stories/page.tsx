import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SuccessStoriesPage() {
  return (
    <>
      <Header />
      <main className="section bg-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold text-[#704214]">Success Stories</h1>
          <p className="mt-4 text-gray-600">Page à venir</p>
          <Link href="/" className="btn-primary mt-8 inline-flex">← Retour</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
