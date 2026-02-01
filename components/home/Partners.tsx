"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";

const partners = [
  {
    name: "Ministère de l'Économie Numérique",
    logo: "🏛️",
    description: "Soutien gouvernemental aux startups sénégalaises",
  },
  {
    name: "AGETIC",
    logo: "💻",
    description: "Agence nationale de l'informatique de l'État",
  },
  {
    name: "Banque de Développement du Sénégal",
    logo: "🏦",
    description: "Financement et accompagnement des entreprises",
  },
  {
    name: "Université Cheikh Anta Diop",
    logo: "🎓",
    description: "Recherche et innovation académique",
  },
  {
    name: "Senegal Innovation Hub",
    logo: "🚀",
    description: "Écosystème d'innovation et entrepreneuriat",
  },
  {
    name: "Orange Senegal",
    logo: "🟠",
    description: "Partenaire technologique et financier",
  },
  {
    name: "Microsoft Africa",
    logo: "🪟",
    description: "Programme d'accélération technologique",
  },
  {
    name: "Google for Startups",
    logo: "🔍",
    description: "Ressources et formation pour entrepreneurs",
  },
];

export default function Partners() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-[#f5ede3]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="🤝 Nos Partenaires"
          title="L'ISM Incubateur est soutenu par des institutions majeures du Sénégal"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-[#FF6600]"
            >
              <div className="text-5xl mb-4 text-center">{partner.logo}</div>
              <h3 className="font-bold text-lg text-[#704214] mb-2 text-center">
                {partner.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistique partenariat */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-md border-l-4 border-[#FF6600]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#FF6600] mb-2">8+</div>
              <p className="text-gray-700 font-semibold">Partenaires majeurs</p>
              <p className="text-sm text-gray-500">
                Gouvernement, universités, tech & finance
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF6600] mb-2">15M+</div>
              <p className="text-gray-700 font-semibold">Ressources mobilisées</p>
              <p className="text-sm text-gray-500">
                Pour soutenir l'écosystème entrepreneurial
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF6600] mb-2">100%</div>
              <p className="text-gray-700 font-semibold">Engagement collectif</p>
              <p className="text-sm text-gray-500">
                Pour le succès des entrepreneurs sénégalais
              </p>
            </div>
          </div>
        </div>

        {/* Message partenariat */}
        <div className="mt-12 bg-[#f5ede3] rounded-lg p-8 border-l-4 border-[#704214]">
          <h3 className="text-2xl font-bold text-[#704214] mb-4">
            💪 Une force collective
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            L'ISM Incubateur a été créé en collaboration avec les principaux
            acteurs de l'écosystème sénégalais. Nos partenaires mettent à
            disposition expertise, financement, et ressources pour accélérer la
            croissance de vos projets entrepreneuriaux.
          </p>
          <p className="text-gray-700 leading-relaxed">
            De la phase de conception à l'accélération, vous bénéficiez du
            soutien d'un réseau de plus de{" "}
            <strong>50 institutions et experts</strong> à travers le Sénégal et
            l'Afrique de l'Ouest.
          </p>
        </div>
      </div>
    </section>
  );
}
