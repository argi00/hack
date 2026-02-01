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

    // Créer 24 ressources fictives dans 8 catégories
    const resources = [
      // 📋 Guides Généraux
      {
        title: "10 Étapes pour Lancer Votre Startup",
        description: "Un guide complet des premières étapes pour démarrer votre entreprise",
        content: "# 10 Étapes pour Lancer Votre Startup\n\n1. Valider votre idée\n2. Faire une étude de marché\n3. Créer un business plan\n4. Constituer une équipe\n5. Développer un MVP\n6. Lancer en version bêta\n7. Collecter du feedback\n8. Itérer rapidement\n9. Rechercher du financement\n10. Scaler votre business",
        category: "Guides",
        difficulty: "Debutant",
        duration: 12,
        imageUrl: "/api/placeholder?size=200",
        author: "Expert ISM",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["startup", "démarrage", "entrepreneuriat"]),
      },
      {
        title: "Le Guide Complet du Business Plan",
        description: "Apprenez à structurer un business plan solide et convaincant",
        content: "# Le Guide Complet du Business Plan\n\nUn business plan doit contenir:\n- Résumé exécutif\n- Description de l'entreprise\n- Analyse de marché\n- Plan de marketing\n- Plan opérationnel\n- Plan financier\n- Projections de croissance",
        category: "Guides",
        difficulty: "Debutant",
        duration: 18,
        imageUrl: "/api/placeholder?size=200",
        author: "Consultant Affaires",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["business-plan", "stratégie", "financement"]),
      },
      {
        title: "Mentalité Entrepreneuriale: 7 Qualités Clés",
        description: "Développez les traits essentiels des entrepreneurs réussis",
        content: "# 7 Qualités Essentielles d'un Entrepreneur\n\n1. **Résilience**: Capacité à rebondir face aux défis\n2. **Passion**: Amour du projet et de la mission\n3. **Apprentissage continu**: Toujours se former\n4. **Adaptabilité**: Changer de stratégie au besoin\n5. **Leadership**: Inspirer et motiver l'équipe\n6. **Créativité**: Penser différemment\n7. **Détermination**: Persévérer jusqu'au succès",
        category: "Guides",
        difficulty: "Debutant",
        duration: 8,
        imageUrl: "/api/placeholder?size=200",
        author: "Coach Entrepreneuriat",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["mentalité", "traits", "leadership"]),
      },
      // 🚀 Lancement du Projet
      {
        title: "MVP: Définir Votre Produit Minimum Viable",
        description: "Découvrez comment créer un MVP efficace et testé par le marché",
        content: "# MVP: Minimum Viable Product\n\nUn MVP est la version la plus simple de votre produit qui apporte de la valeur.\n\n## Caractéristiques d'un bon MVP:\n- Résout un problème réel\n- Peut être construit rapidement\n- Permet de collecter du feedback\n- Prêt pour le pivot si nécessaire",
        category: "Lancement",
        difficulty: "Debutant",
        duration: 10,
        imageUrl: "/api/placeholder?size=200",
        author: "Produit Manager",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["MVP", "produit", "lancement"]),
      },
      {
        title: "Go-to-Market Strategy: Comment Entrer le Marché",
        description: "Stratégies éprouvées pour lancer votre produit sur le marché",
        content: "# Go-to-Market Strategy (GTM)\n\nVotre stratégie de marché doit inclure:\n1. Définir votre client idéal\n2. Choisir vos canaux de distribution\n3. Créer un message clé\n4. Fixer votre stratégie de pricing\n5. Planifier votre timing\n6. Allouer votre budget",
        category: "Lancement",
        difficulty: "Intermediaire",
        duration: 15,
        imageUrl: "/api/placeholder?size=200",
        author: "Growth Manager",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["go-to-market", "lancement", "stratégie"]),
      },
      {
        title: "De l'Idée au Produit: 6 Mois Accélérés",
        description: "Parcours accéléré pour aller de l'idée à un produit commercialisable",
        content: "# Accélérateur: De l'Idée au Produit\n\n**Mois 1-2**: Validation de l'idée et étude de marché\n**Mois 2-3**: Développement du prototype\n**Mois 3-4**: Tests avec des utilisateurs\n**Mois 4-5**: Itération et amélioration\n**Mois 5-6**: Préparation au lancement et démonstration",
        category: "Lancement",
        difficulty: "Avance",
        duration: 20,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        author: "Mentor Startup",
        source: "Incubateur Accéléré",
        status: "published",
        tags: JSON.stringify(["accélération", "produit", "timeline"]),
      },
      // 💼 Business Model
      {
        title: "Canvas Business Model Expliqué",
        description: "Guide complet du Business Model Canvas d'Osterwalder",
        content: "# Business Model Canvas\n\nLe BMC se compose de 9 blocs:\n1. Segments clients\n2. Propositions de valeur\n3. Canaux de distribution\n4. Relations clients\n5. Flux de revenus\n6. Ressources clés\n7. Activités clés\n8. Partenariats clés\n9. Structure de coûts",
        category: "Business",
        difficulty: "Debutant",
        duration: 12,
        imageUrl: "/api/placeholder?size=200",
        author: "Consultant Modèles",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["business-model", "canvas", "stratégie"]),
      },
      {
        title: "Modèles de Revenu: Choisir le Bon pour Votre Startup",
        description: "Explorez différents modèles de revenu et comment les implémenter",
        content: "# Modèles de Revenu\n\n- **Abonnement**: Revenus récurrents mensuels\n- **Freemium**: Gratuit + version payante\n- **Transactionnel**: Commission par vente\n- **Licensing**: Vente de licences\n- **Marketplace**: Prendre une commission\n- **Publicité**: Revenu via ads\n- **Hybride**: Combinaison de modèles",
        category: "Business",
        difficulty: "Intermediaire",
        duration: 14,
        imageUrl: "/api/placeholder?size=200",
        author: "Finance Expert",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["revenu", "monétisation", "business-model"]),
      },
      {
        title: "Scaling Your Business Model",
        description: "Stratégies avancées pour scaler votre modèle de business",
        content: "# Scaling Your Business Model\n\nPour scaler efficacement:\n1. Documenter tous les processus\n2. Automatiser ce qui peut l'être\n3. Recruter les bons talents\n4. Mettre en place des KPIs\n5. Optimiser les coûts\n6. Tester avant de scaler\n7. Mesurer l'impact de chaque décision",
        category: "Business",
        difficulty: "Avance",
        duration: 16,
        imageUrl: "/api/placeholder?size=200",
        author: "Scaling Advisor",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["scaling", "croissance", "opérations"]),
      },
      // 🎤 Pitch & Présentation
      {
        title: "Créer un Pitch Deck Gagnant en 7 Étapes",
        description: "Guide pratique pour créer un pitch deck professionnel et persuasif",
        content: "# Pitch Deck: 7 Slides Essentielles\n\n1. **Titre**: Votre nom et idée en une ligne\n2. **Problème**: Le problème que vous résolvez\n3. **Solution**: Votre solution unique\n4. **Marché**: Taille et opportunité\n5. **Modèle de revenu**: Comment vous gagnez de l'argent\n6. **Traction**: Vos succès à ce jour\n7. **Équipe**: Qui êtes-vous\n8. **Call to Action**: Que demandez-vous",
        category: "Pitch",
        difficulty: "Debutant",
        duration: 13,
        imageUrl: "/api/placeholder?size=200",
        author: "Pitch Coach",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["pitch", "présentation", "deck"]),
      },
      {
        title: "L'Art de Pitcher Devant les Investisseurs",
        description: "Techniques et conseils pour un pitch devant un auditoire d'investisseurs",
        content: "# Pitcher aux Investisseurs\n\n## Avant le pitch:\n- Connaître votre public\n- Pratiquer votre discours\n- Anticiper les questions\n\n## Pendant le pitch:\n- Commencer fort\n- Raconter une histoire\n- Parler avec passion\n- Faire preuve de confiance\n\n## Après le pitch:\n- Recevoir les questions positivement\n- Avoir des supports additionnels\n- Suivre avec un email",
        category: "Pitch",
        difficulty: "Intermediaire",
        duration: 11,
        imageUrl: "/api/placeholder?size=200",
        author: "Investisseur Coach",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["pitch", "investisseurs", "communication"]),
      },
      {
        title: "Storytelling pour Entrepreneurs",
        description: "Apprenez à raconter l'histoire de votre startup de façon captivante",
        content: "# Storytelling: L'Art de Raconter Votre Histoire\n\n## Structure d'une bonne histoire:\n1. **Situation initiale**: Où vous étiez\n2. **Inciting incident**: Le moment clé\n3. **Défi**: Pourquoi c'est difficile\n4. **Votre solution**: Comment vous résolvez\n5. **Résultat**: Les bénéfices\n6. **Call to action**: Ce que vous demandez\n\nUne bonne histoire crée une connexion émotionnelle.",
        category: "Pitch",
        difficulty: "Intermediaire",
        duration: 9,
        imageUrl: "/api/placeholder?size=200",
        author: "Storytelling Expert",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["storytelling", "communication", "narrative"]),
      },
      // 💰 Financement & Budget
      {
        title: "Financer Votre Startup: Toutes les Options",
        description: "Vue d'ensemble complète des options de financement pour startups",
        content: "# Options de Financement\n\n1. **Bootstrapping**: Financez avec vos propres ressources\n2. **Friends & Family**: Prêts de proches\n3. **Angel Investors**: Investisseurs individuels\n4. **Seed Round**: Premier tour de financement\n5. **VC Funding**: Capital-risqueurs\n6. **Crowdfunding**: Financement par la foule\n7. **Subventions**: Aides gouvernementales\n8. **Prêts bancaires**: Financement traditionnel",
        category: "Finance",
        difficulty: "Debutant",
        duration: 15,
        imageUrl: "/api/placeholder?size=200",
        author: "Finance Advisor",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["financement", "levée-fonds", "investissement"]),
      },
      {
        title: "Budgetisation pour Startups",
        description: "Comment créer et gérer un budget efficace pour votre startup",
        content: "# Budgetisation pour Startups\n\n## Catégories principales:\n- **Ressources humaines**: Salaires et charges\n- **Produit**: Développement et infrastructure\n- **Marketing**: Acquisition clients\n- **Opérations**: Bureau, outils, etc.\n- **Contingence**: Réserve 20%\n\n## Conseils:\n- Être conservateur dans les estimations\n- Revoir le budget mensuellement\n- Prioriser les dépenses",
        category: "Finance",
        difficulty: "Intermediaire",
        duration: 12,
        imageUrl: "/api/placeholder?size=200",
        author: "CFO Consultant",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["budget", "finance", "gestion"]),
      },
      {
        title: "Négocier avec les Investisseurs",
        description: "Stratégies et tactiques pour négocier les meilleures conditions",
        content: "# Négocier avec les Investisseurs\n\n## Points clés:\n- Savoir ce que vous valez\n- Connaître vos alternatives\n- Être patient mais pas trop\n- Demander ce que vous méritez\n- Documenter tout par écrit\n\n## Termes importants:\n- **Valuation**: Évaluation de votre entreprise\n- **Dilution**: % d'actions données\n- **Rights**: Droits des investisseurs\n- **Conditions**: Termes spéciaux",
        category: "Finance",
        difficulty: "Avance",
        duration: 14,
        imageUrl: "/api/placeholder?size=200",
        author: "Négociateur Expert",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["négociation", "investisseurs", "valuation"]),
      },
      // 📊 Métriques & Données
      {
        title: "KPIs Essentiels pour Votre Startup",
        description: "Les indicateurs clés de performance à suivre pour votre business",
        content: "# KPIs Essentiels\n\n**Traction:**\n- Utilisateurs actifs mensuels (MAU)\n- Utilisateurs payants\n- Revenu mensuel récurrent (MRR)\n\n**Produit:**\n- Retention rate\n- Churn rate\n- NPS (Net Promoter Score)\n\n**Financier:**\n- CAC (Customer Acquisition Cost)\n- LTV (Lifetime Value)\n- Burn rate",
        category: "Metriques",
        difficulty: "Debutant",
        duration: 10,
        imageUrl: "/api/placeholder?size=200",
        author: "Analytics Expert",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["KPI", "métriques", "analytics"]),
      },
      {
        title: "Analytics: Mesurer Votre Succès",
        description: "Guide complet pour mettre en place un système d'analytics robuste",
        content: "# Mise en Place d'Analytics\n\n## Outils recommandés:\n- **Google Analytics**: Trafic web\n- **Mixpanel**: Comportement utilisateur\n- **Amplitude**: Product analytics\n- **Tableau**: Visualisation des données\n\n## Métriques à tracker:\n- Acquisition\n- Activation\n- Retention\n- Revenue\n- Referral",
        category: "Metriques",
        difficulty: "Intermediaire",
        duration: 13,
        imageUrl: "/api/placeholder?size=200",
        author: "Data Analyst",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["analytics", "données", "mesure"]),
      },
      {
        title: "Unit Economics: Rentabilité Par Client",
        description: "Comprendre et optimiser l'économie unitaire de votre business",
        content: "# Unit Economics\n\n## Formules clés:\n**CAC** = Coûts marketing / Nouveaux clients\n**LTV** = (ARPU × Gross Margin) / Churn Rate\n**Ratio LTV/CAC** = Devrait être > 3\n\n## Optimisation:\n- Réduire le CAC\n- Augmenter la rétention\n- Augmenter l'ARPU\n- Améliorer la marge\n\nUne bonne unit economics est la base d'un business viable.",
        category: "Metriques",
        difficulty: "Avance",
        duration: 12,
        imageUrl: "/api/placeholder?size=200",
        author: "Finance Manager",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["unit-economics", "rentabilité", "CAC", "LTV"]),
      },
      // 🌐 Marketing & Distribution
      {
        title: "Marketing Digital pour Startups",
        description: "Stratégies de marketing digital efficaces pour les startups avec peu de budget",
        content: "# Marketing Digital pour Startups\n\n## Canaux gratuits/peu coûteux:\n- **Content Marketing**: Blog, vidéos\n- **Social Media**: LinkedIn, Twitter, TikTok\n- **SEO**: Optimisation pour moteurs de recherche\n- **Email Marketing**: Newsletters\n- **Partnerships**: Collaborations\n\n## Best practices:\n- Commencer par 1-2 canaux\n- Mesurer l'impact\n- Optimiser continuellement\n- Raconter votre histoire",
        category: "Marketing",
        difficulty: "Debutant",
        duration: 14,
        imageUrl: "/api/placeholder?size=200",
        author: "Marketing Strategist",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["marketing", "digital", "stratégie"]),
      },
      {
        title: "Growth Hacking: Techniques de Croissance Rapide",
        description: "Techniques créatives et peu coûteuses pour accélérer votre croissance",
        content: "# Growth Hacking\n\n## Techniques:\n- **Viral loops**: Référrals et partages\n- **Product-led growth**: Le produit comme acquéreur\n- **Community building**: Construire une communauté\n- **Partnerships**: Collaborations stratégiques\n- **PR & Media**: Couverture médiatique\n\n## Mindset:\n- Tester rapidement\n- Data-driven\n- Créatif et non-conventionnel\n- Scalable et reproductible",
        category: "Marketing",
        difficulty: "Intermediaire",
        duration: 16,
        imageUrl: "/api/placeholder?size=200",
        author: "Growth Manager",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["growth-hacking", "croissance", "acquisition"]),
      },
      {
        title: "Distribution Strategy: Atteindre Vos Clients",
        description: "Comment créer une stratégie de distribution efficace pour votre produit",
        content: "# Stratégie de Distribution\n\n## Canaux:\n- **Direct**: Vente directe\n- **Online**: E-commerce, SaaS\n- **Partnerships**: Distributeurs partenaires\n- **Marketplaces**: Amazon, etc.\n- **Retail**: Points de vente physiques\n\n## Choix du canal:\n- Où sont vos clients?\n- Coûts par canal\n- Marge nette\n- Contrôle de la marque\n- Scalabilité",
        category: "Marketing",
        difficulty: "Intermediaire",
        duration: 13,
        imageUrl: "/api/placeholder?size=200",
        author: "Distribution Expert",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["distribution", "channels", "commercialisation"]),
      },
      // ⚙️ Outils Recommandés
      {
        title: "Figma pour les Startups",
        description: "Comment utiliser Figma pour concevoir votre produit et collaborer en équipe",
        content: "# Figma: Design Tool pour Startups\n\n## Avantages:\n- Collaboration en temps réel\n- Gratuit pour les petites équipes\n- Prototyping intégré\n- Partage facile avec stakeholders\n- Versioning intégré\n\n## Use cases:\n- UI/UX design\n- Wireframes\n- Prototypes\n- Design systems\n- Marketing materials",
        category: "Outils",
        difficulty: "Debutant",
        duration: 8,
        imageUrl: "/api/placeholder?size=200",
        author: "Design Coach",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["figma", "design", "outils"]),
      },
      {
        title: "Notion: Organiser Votre Startup",
        description: "Utilisez Notion pour organiser votre startup: documents, bases de données, etc.",
        content: "# Notion: All-in-One Workspace\n\n## Cas d'usage:\n- **Knowledge base**: Documentation\n- **Project management**: Tâches et projets\n- **CRM**: Gestion des contacts\n- **Product roadmap**: Feuille de route\n- **Meeting notes**: Comptes-rendus\n\n## Tips:\n- Utiliser les templates\n- Créer des bases de données liées\n- Automatiser avec des formules\n- Inviter votre équipe",
        category: "Outils",
        difficulty: "Debutant",
        duration: 10,
        imageUrl: "/api/placeholder?size=200",
        author: "Notion Expert",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["notion", "productivité", "outils"]),
      },
      {
        title: "Lean Canvas vs Business Model Canvas",
        description: "Comparaison et guide pour choisir le bon outil pour votre startup",
        content: "# Lean Canvas vs Business Model Canvas\n\n## Business Model Canvas:\n- Plus détaillé (9 blocs)\n- Mieux pour les business existants\n- Plus de temps à compléter\n\n## Lean Canvas:\n- Plus simple (7 blocs)\n- Mieux pour les startups\n- Plus agile et itératif\n- Prend 30 min\n\n## Différences:\n- Lean Canvas remplace 'segments clients' par 'problèmes'\n- Lean Canvas ajoute 'solution' et 'unfair advantage'\n- Lean Canvas remplace 'channels' par 'existing alternatives'",
        category: "Outils",
        difficulty: "Debutant",
        duration: 7,
        imageUrl: "/api/placeholder?size=200",
        author: "Business Advisor",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["canvas", "planning", "outils"]),
      },
      {
        title: "Google Analytics pour Mesurer le Trafic",
        description: "Configuration et utilisation de Google Analytics pour tracker votre trafic web",
        content: "# Google Analytics: Mesurer Votre Trafic\n\n## Metrics clés:\n- **Users**: Nombre de visiteurs\n- **Sessions**: Nombre de visites\n- **Pageviews**: Pages consultées\n- **Bounce rate**: Taux de rebond\n- **Conversion**: Objectifs atteints\n\n## Configuration:\n1. Créer un compte GA\n2. Installer le code\n3. Créer des objectifs\n4. Paramétrer les alertes\n5. Créer des dashboards personnalisés",
        category: "Outils",
        difficulty: "Intermediaire",
        duration: 11,
        imageUrl: "/api/placeholder?size=200",
        author: "Analytics Specialist",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["google-analytics", "tracking", "analytics"]),
      },
      {
        title: "Hotjar: Comprendre le Comportement Utilisateur",
        description: "Utilisez Hotjar pour enregistrer et analyser comment vos utilisateurs interagissent",
        content: "# Hotjar: Session Recording & Heatmaps\n\n## Fonctionnalités:\n- **Session Recording**: Enregistrement des sessions utilisateur\n- **Heatmaps**: Visualisation des clics\n- **Polls**: Questionnaires utilisateurs\n- **Surveys**: Sondages\n- **Funnels**: Analyse des tunnels de conversion\n\n## Avantages:\n- Comprendre pourquoi les utilisateurs quittent\n- Identifier les problèmes UX\n- Générer des insights produit\n- Augmenter la conversion",
        category: "Outils",
        difficulty: "Intermediaire",
        duration: 9,
        imageUrl: "/api/placeholder?size=200",
        author: "UX Research Lead",
        source: "ISM Incubateur",
        status: "published",
        tags: JSON.stringify(["hotjar", "user-research", "analytics"]),
      },
    ];

    // Créer les ressources
    for (const resourceData of resources) {
      await prisma.resource.create({
        data: resourceData,
      });
    }

    console.log("✅ 24 Ressources créées");
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
    console.log("--------------------------------------------");
    console.log("📚 RESSOURCES:");
    console.log("   24 ressources créées dans 8 catégories");
    console.log("--------------------------------------------\n");
  } catch (error) {
    console.error("❌ Erreur seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
