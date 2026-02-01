import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  try {
    console.log("🌱 Début du seeding...");

    // Vérifier si l'admin existe déjà
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@ismincubateur.sn" },
    });

    if (existingAdmin) {
      console.log("✅ Données de test existent déjà");
      return;
    }

    // Créer l'admin
    const hashedPassword = await bcrypt.hash("Admin@123456", 10);
    const admin = await prisma.user.create({
      data: {
        email: "admin@ismincubateur.sn",
        passwordHash: hashedPassword,
        firstName: "Administrateur",
        lastName: "ISM Incubateur",
        phone: "+221 77 123 45 67",
        role: "ADMIN",
        isActive: true,
      },
    });

    console.log("✅ Admin créé:", admin.email);

    // Créer 2 coaches
    const coach1Password = await bcrypt.hash("Coach@123456", 10);
    const coach1User = await prisma.user.create({
      data: {
        email: "coach.marie@ismincubateur.sn",
        passwordHash: coach1Password,
        firstName: "Marie",
        lastName: "Diallo",
        phone: "+221 77 234 56 78",
        role: "COACH",
        isActive: true,
      },
    });

    await prisma.coach.create({
      data: { userId: coach1User.id },
    });

    console.log("✅ Coach 1 créé:", coach1User.email);

    const coach2Password = await bcrypt.hash("Coach@123456", 10);
    const coach2User = await prisma.user.create({
      data: {
        email: "coach.clement@ismincubateur.sn",
        passwordHash: coach2Password,
        firstName: "Clément",
        lastName: "Ba",
        phone: "+221 77 345 67 89",
        role: "COACH",
        isActive: true,
      },
    });

    await prisma.coach.create({
      data: { userId: coach2User.id },
    });

    console.log("✅ Coach 2 créé:", coach2User.email);

    // Créer 3 utilisateurs avec des projets
    const user1Password = await bcrypt.hash("User@123456", 10);
    const user1 = await prisma.user.create({
      data: {
        email: "user.fatou@example.com",
        passwordHash: user1Password,
        firstName: "Fatou",
        lastName: "Sall",
        phone: "+221 77 456 78 90",
        role: "USER",
        isActive: true,
        hasProject: true,
        projectDescription: "Plateforme de vente de produits locaux",
      },
    });

    const project1 = await prisma.project.create({
      data: {
        userId: user1.id,
        name: "TechLocal - Marketplace Sénégal",
        status: "incubation",
        description:
          "Une plateforme e-commerce pour connecter les petits commerces sénégalais avec les clients",
      },
    });

    // Assigner coaches au projet 1
    const coach1Data = await prisma.coach.findUnique({
      where: { userId: coach1User.id },
    });

    if (coach1Data) {
      await prisma.coachProject.create({
        data: {
          coachId: coach1Data.id,
          projectId: project1.id,
        },
      });
    }

    // Ajouter des feedbacks
    await prisma.feedback.create({
      data: {
        coachId: coach1Data!.id,
        projectId: project1.id,
        userId: user1.id,
        category: "PRODUIT",
        priority: "HAUTE",
        content:
          "L'idée est intéressante mais vous devez clarifier votre proposition de valeur. Qui sont vos concurrents directs?",
      },
    });

    console.log("✅ Utilisateur 1 créé avec projet");

    // Utilisateur 2
    const user2Password = await bcrypt.hash("User@123456", 10);
    const user2 = await prisma.user.create({
      data: {
        email: "user.malik@example.com",
        passwordHash: user2Password,
        firstName: "Malik",
        lastName: "Kane",
        phone: "+221 77 567 89 01",
        role: "USER",
        isActive: true,
        hasProject: true,
        projectDescription: "Solution de paiement mobile",
      },
    });

    const project2 = await prisma.project.create({
      data: {
        userId: user2.id,
        name: "PayWave - Mobile Payment",
        status: "pre-incubation",
        description: "Une application de paiement mobile simple et sécurisée",
      },
    });

    // Assigner coach2 au projet 2
    const coach2Data = await prisma.coach.findUnique({
      where: { userId: coach2User.id },
    });

    if (coach2Data) {
      await prisma.coachProject.create({
        data: {
          coachId: coach2Data.id,
          projectId: project2.id,
        },
      });

      await prisma.feedback.create({
        data: {
          coachId: coach2Data.id,
          projectId: project2.id,
          userId: user2.id,
          category: "BUSINESS",
          priority: "MOYENNE",
          content: "Le modèle économique n'est pas clair. Avez-vous étudié les licences d'opération?",
        },
      });
    }

    console.log("✅ Utilisateur 2 créé avec projet");

    // Utilisateur 3
    const user3Password = await bcrypt.hash("User@123456", 10);
    const user3 = await prisma.user.create({
      data: {
        email: "user.aïssatou@example.com",
        passwordHash: user3Password,
        firstName: "Aïssatou",
        lastName: "Ndiaye",
        phone: "+221 77 678 90 12",
        role: "USER",
        isActive: true,
        hasProject: false,
      },
    });

    console.log("✅ Utilisateur 3 créé (sans projet)");

    console.log("\n✅ Seeding terminé avec succès!");
    console.log("\n📋 Comptes de test:");
    console.log("--------------------------------------------");
    console.log("👨‍💼 ADMIN:");
    console.log("   Email: admin@ismincubateur.sn");
    console.log("   Mot de passe: Admin@123456");
    console.log("--------------------------------------------");
    console.log("👨‍🏫 COACH 1 - Marie Diallo:");
    console.log("   Email: coach.marie@ismincubateur.sn");
    console.log("   Mot de passe: Coach@123456");
    console.log("--------------------------------------------");
    console.log("👨‍🏫 COACH 2 - Clément Ba:");
    console.log("   Email: coach.clement@ismincubateur.sn");
    console.log("   Mot de passe: Coach@123456");
    console.log("--------------------------------------------");
    console.log("👤 USER 1 - Fatou Sall:");
    console.log("   Email: user.fatou@example.com");
    console.log("   Mot de passe: User@123456");
    console.log("   Projet: TechLocal - Marketplace Sénégal");
    console.log("--------------------------------------------");
    console.log("👤 USER 2 - Malik Kane:");
    console.log("   Email: user.malik@example.com");
    console.log("   Mot de passe: User@123456");
    console.log("   Projet: PayWave - Mobile Payment");
    console.log("--------------------------------------------");
    console.log("👤 USER 3 - Aïssatou Ndiaye:");
    console.log("   Email: user.aïssatou@example.com");
    console.log("   Mot de passe: User@123456");
    console.log("   (Sans projet)");
    console.log("--------------------------------------------\n");
  } catch (error) {
    console.error("❌ Erreur seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
