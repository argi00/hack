import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hackathons = [
  {
    title: "Hackathon AgriTech & Sustainability",
    slug: "agritech-2026",
    dateStart: new Date("2026-02-15"),
    dateEnd: new Date("2026-02-16"),
    description:
      "Innovation au service de l'agriculture durable et de la sécurité alimentaire",
    prize: "15K€",
    places: "30 places",
    status: "ouvert",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    featured: true,
  },
  {
    title: "Hackathon HealthTech",
    slug: "healthtech-2026",
    dateStart: new Date("2026-03-15"),
    dateEnd: new Date("2026-03-16"),
    description: "Innovation dans la santé digitale",
    prize: "10K€",
    places: "25 places",
    status: "bientôt",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
    featured: false,
  },
  {
    title: "Hackathon Climate Tech",
    slug: "climate-tech-2026",
    dateStart: new Date("2026-04-20"),
    dateEnd: new Date("2026-04-21"),
    description: "Solutions face au changement climatique",
    prize: "12K€",
    places: "30 places",
    status: "bientôt",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
    featured: false,
  },
];

async function main() {
  for (const h of hackathons) {
    await prisma.hackathon.upsert({
      where: { slug: h.slug },
      create: h,
      update: h,
    });
  }
  console.log("Seed terminé :", hackathons.length, "hackathons créés/mis à jour");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
