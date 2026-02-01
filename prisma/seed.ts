import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const MAMANE_EMAIL = "mamane@test.com";
const MAMANE_PASSWORD = "password123";

const ADMIN_EMAIL = "admin@test.com";
const ADMIN_PASSWORD = "admin123";

const COACH_EMAIL = "coach@test.com";
const COACH_PASSWORD = "coach123";

const mamanePreIncubation = {
  projectName: "AgriPrice — Prix agricoles en temps réel",
  oneSentence:
    "Une app qui permet aux agriculteurs du Sénégal d'accéder aux prix du marché en temps réel par SMS pour vendre au meilleur moment.",
  projectContent: {
    phase1_problem:
      "Les agriculteurs n'ont pas accès aux prix du marché en temps réel et vendent souvent à perte ou trop tôt.",
    phase1_solution:
      "Une plateforme SMS et mobile qui diffuse les prix des principaux marchés et aide à décider quand et où vendre.",
    phase1_target_desc:
      "Agriculteurs et coopératives au Sénégal, notamment en zones rurales peu connectées.",
    phase2_market_desc:
      "Marché agricole sénégalais, avec focus sur l'arachide, le mil et le maïs.",
    phase2_differentiation:
      "Fonctionnement par SMS sans smartphone, prix mis à jour quotidiennement par des relais terrain.",
    phase3_revenue:
      "Abonnement SMS payant pour les alertes prix, partenariats avec coopératives et ONG.",
    phase4_value:
      "Nous aidons les agriculteurs à vendre au meilleur prix en leur donnant l'information au bon moment, par le canal qu'ils utilisent déjà (SMS).",
    phase5_next_steps:
      "Tester avec 2 coopératives pilotes, valider les sources de prix, lancer la version SMS beta.",
    phase6_one_sentence:
      "Une app qui permet aux agriculteurs du Sénégal d'accéder aux prix du marché en temps réel par SMS pour vendre au meilleur moment.",
  },
  maturityScore: 78,
  phaseScores: { "1": 180, "2": 160, "3": 140, "4": 150, "5": 130, "6": 170 },
  totalScore: 930,
};

const mamaneIncubationProjects = [
  {
    name: "AgriPrice — Prix agricoles en temps réel",
    status: "incubation",
    description:
      "Plateforme SMS et mobile pour diffuser les prix du marché agricole en temps réel aux agriculteurs. Phase pilote avec 2 coopératives.",
  },
  {
    name: "EduTab Sénégal",
    status: "incubation",
    description:
      "Tablettes éducatives préchargées avec contenus en français et langues locales pour les écoles rurales. Partenariat avec le ministère de l'Éducation.",
  },
  {
    name: "SantéMobile — Rendez-vous et rappels",
    status: "pre-incubation",
    description:
      "Application de prise de rendez-vous et rappels SMS pour les centres de santé. En phase de validation du concept avec des dispensaires.",
  },
];

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

  // Créer l'utilisateur administrateur
  const adminPasswordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    create: {
      email: ADMIN_EMAIL,
      passwordHash: adminPasswordHash,
      firstName: "Admin",
      lastName: "ISM",
      phone: "221700000000",
      role: "ADMIN",
    },
    update: {
      firstName: "Admin",
      lastName: "ISM",
      role: "ADMIN",
    },
  });
  console.log("Administrateur créé :", ADMIN_EMAIL, "(mot de passe:", ADMIN_PASSWORD, ")");

  // Créer l'utilisateur coach
  const coachPasswordHash = await bcrypt.hash(COACH_PASSWORD, 10);
  const coach = await prisma.user.upsert({
    where: { email: COACH_EMAIL },
    create: {
      email: COACH_EMAIL,
      passwordHash: coachPasswordHash,
      firstName: "Coach",
      lastName: "ISM",
      phone: "221700000001",
      role: "COACH",
    },
    update: {
      firstName: "Coach",
      lastName: "ISM",
      role: "COACH",
    },
  });
  console.log("Coach créé :", COACH_EMAIL, "(mot de passe:", COACH_PASSWORD, ")");

  // Créer le profil Coach dans la table Coach
  await prisma.coach.upsert({
    where: { userId: coach.id },
    create: { userId: coach.id },
    update: {},
  });

  // Utilisateur Mamane + projets factices
  const passwordHash = await bcrypt.hash(MAMANE_PASSWORD, 10);
  const mamane = await prisma.user.upsert({
    where: { email: MAMANE_EMAIL },
    create: {
      email: MAMANE_EMAIL,
      passwordHash,
      firstName: "Mamane",
      lastName: "Demo",
      phone: "221771234567",
      hasProject: true,
      projectDescription: mamanePreIncubation.projectName,
    },
    update: {
      firstName: "Mamane",
      lastName: "Demo",
      hasProject: true,
      projectDescription: mamanePreIncubation.projectName,
    },
  });

  // Supprimer les anciens GameProgress pour éviter les doublons au re-seed
  await prisma.gameProgress.deleteMany({ where: { userId: mamane.id } });
  
  // Créer le projet en pré-incubation
  await prisma.gameProgress.create({
    data: {
      userId: mamane.id,
      projectName: mamanePreIncubation.projectName,
      projectContent: JSON.stringify(mamanePreIncubation.projectContent),
      oneSentence: mamanePreIncubation.oneSentence,
      maturityScore: mamanePreIncubation.maturityScore,
      phaseScores: JSON.stringify(mamanePreIncubation.phaseScores),
      totalScore: mamanePreIncubation.totalScore,
      answers: "{}",
      isComplete: true,
    },
  });

  await prisma.project.deleteMany({ where: { userId: mamane.id } });
  for (const p of mamaneIncubationProjects) {
    await prisma.project.create({
      data: {
        userId: mamane.id,
        name: p.name,
        status: p.status,
        description: p.description,
      },
    });
  }

  const agritech = await prisma.hackathon.findUnique({
    where: { slug: "agritech-2026" },
  });
  if (agritech) {
    await prisma.hackathonRegistration.upsert({
      where: {
        userId_hackathonId: { userId: mamane.id, hackathonId: agritech.id },
      },
      create: {
        userId: mamane.id,
        hackathonId: agritech.id,
      },
      update: {},
    });
  }

  console.log(
    "Utilisateur Mamane créé/mis à jour :",
    MAMANE_EMAIL,
    "(mot de passe:",
    MAMANE_PASSWORD,
    ")"
  );
  console.log(
    "Projets factices : 1 pré-incubation +",
    mamaneIncubationProjects.length,
    "incubation"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
