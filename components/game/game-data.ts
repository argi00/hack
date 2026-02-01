// Données du jeu - 6 phases pour clarifier l'idée de projet
// Objectif : avoir une idée claire du projet à la fin

export interface GameOption {
  id: string;
  text: string;
  value: number;
  consequences: string;
}

export interface GameQuestion {
  id: string;
  type: "text" | "choice";
  text: string;
  placeholder?: string;
  hint?: string;
  options?: GameOption[];
  feedback: string;
}

export interface GamePhase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  projectKey?: string; // Clé pour la fiche projet (ex: "problem", "target")
  questions: GameQuestion[];
}

export const GAME_PHASES: GamePhase[] = [
  {
    id: 1,
    title: "Clarification de l'idée",
    subtitle: "Définissez le cœur de votre projet",
    emoji: "💡",
    projectKey: "problem",
    description:
      "Un bon projet part d'un problème clair. Prenez le temps de le formuler.",
    questions: [
      {
        id: "phase1_problem",
        type: "text",
        text: "Quel problème majeur votre solution résout-elle ?",
        placeholder: "Ex : Les agriculteurs n'ont pas accès aux prix du marché en temps réel et vendent à perte...",
        hint: "Soyez concret : qui a le problème, où, quand ?",
        options: [],
        feedback: "Un problème bien défini est la base de tout projet réussi.",
      },
      {
        id: "phase1_solution",
        type: "text",
        text: "Comment votre solution répond-elle à ce problème ?",
        placeholder: "Ex : Une app mobile qui envoie les prix du marché par SMS aux agriculteurs...",
        hint: "En 1-2 phrases, décrivez votre solution.",
        options: [],
        feedback: "Votre solution doit être directement liée au problème identifié.",
      },
      {
        id: "phase1_target",
        type: "choice",
        text: "Où en êtes-vous sur la clarté de votre cible ?",
        options: [
          {
            id: "p1_opt4",
            text: "Un segment spécifique et bien défini",
            value: 100,
            consequences: "Parfait ! Vous avez une cible claire.",
          },
          {
            id: "p1_opt5",
            text: "Plusieurs segments potentiels",
            value: 60,
            consequences: "À raffiner. Focalisez-vous sur un segment prioritaire.",
          },
          {
            id: "p1_opt6",
            text: '"Tout le monde" ou très large',
            value: 30,
            consequences: "Trop large ! Affinez votre segmentation pour mieux cibler.",
          },
        ],
        feedback: "Concentrez-vous sur un segment prioritaire pour commencer.",
      },
      {
        id: "phase1_target_desc",
        type: "text",
        text: "Qui est votre utilisateur cible ? Décrivez-le précisément.",
        placeholder: "Ex : Agriculteurs de 35-55 ans au Sénégal, cultivant moins de 5 ha, avec un téléphone basique...",
        hint: "Âge, lieu, situation, équipement... Plus c'est précis, mieux c'est.",
        options: [],
        feedback: "Une cible précise vous aide à adapter votre offre et votre communication.",
      },
    ],
  },
  {
    id: 2,
    title: "Étude de marché",
    subtitle: "Analysez votre environnement",
    emoji: "📊",
    projectKey: "market",
    description:
      "Comprendre votre marché et vous différencier est essentiel.",
    questions: [
      {
        id: "phase2_market_desc",
        type: "text",
        text: "Décrivez votre marché : taille, tendances, opportunités.",
        placeholder: "Ex : 50 000 agriculteurs au Sénégal, marché en croissance avec adoption du mobile...",
        hint: "Qui achèterait ? Combien ? Le marché grandit-il ?",
        options: [],
        feedback: "Une bonne connaissance du marché renforce votre crédibilité.",
      },
      {
        id: "phase2_market",
        type: "choice",
        text: "Quel est le potentiel de marché estimé ?",
        options: [
          {
            id: "p2_opt1",
            text: "Marché croissant avec forte demande identifiée",
            value: 100,
            consequences: "Vous visez un marché porteur ! C'est un excellent signal.",
          },
          {
            id: "p2_opt2",
            text: "Marché stable avec demande modérée",
            value: 75,
            consequences: "Le marché existe mais vous devrez être créatif pour vous différencier.",
          },
          {
            id: "p2_opt3",
            text: "Marché de niche avec demande très faible",
            value: 45,
            consequences: "Viabilité à vérifier. Cherchez les micro-marchés connexes.",
          },
        ],
        feedback: "Un marché en croissance offre de meilleures opportunités de développement.",
      },
      {
        id: "phase2_competition",
        type: "choice",
        text: "Comment êtes-vous différencié face à la concurrence ?",
        options: [
          {
            id: "p2_opt4",
            text: "Différenciation claire et difficilement copiable",
            value: 100,
            consequences: "Excellent avantage compétitif ! Protégez bien votre innovation.",
          },
          {
            id: "p2_opt5",
            text: "Légers avantages sur quelques critères",
            value: 65,
            consequences: "À renforcer. Travaillez votre positionnement.",
          },
          {
            id: "p2_opt6",
            text: "Pas de différenciation majeure identifiée",
            value: 30,
            consequences: "C'est le moment d'innover ! Trouvez votre angle unique.",
          },
        ],
        feedback: "Votre différenciation est votre meilleur atout sur le marché.",
      },
      {
        id: "phase2_differentiation",
        type: "text",
        text: "En quoi êtes-vous différent de la concurrence ?",
        placeholder: "Ex : Nous utilisons le SMS, pas internet - accessible à tous. Prix 10x moins cher...",
        hint: "Qu'est-ce qui vous rend unique ? Difficile à copier ?",
        options: [],
        feedback: "Votre angle unique vous protège et attire les clients.",
      },
    ],
  },
  {
    id: 3,
    title: "Modèle économique",
    subtitle: "Comment gagnerez-vous de l'argent ?",
    emoji: "💰",
    projectKey: "businessModel",
    description:
      "Un modèle économique clair prouve la viabilité de votre projet.",
    questions: [
      {
        id: "phase3_revenue",
        type: "text",
        text: "Comment gagnerez-vous de l'argent ? Décrivez vos sources de revenus.",
        placeholder: "Ex : Abonnement mensuel 500 FCFA. Commission 2% sur les transactions...",
        hint: "Qui paie ? Combien ? À quelle fréquence ?",
        options: [],
        feedback: "Des revenus clairs rassurent investisseurs et partenaires.",
      },
      {
        id: "phase3_model",
        type: "choice",
        text: "Quel type de business model correspond le mieux ?",
        options: [
          {
            id: "p3_opt1",
            text: "B2B SaaS avec abonnement récurrent",
            value: 90,
            consequences: "Excellent choix pour la scalabilité et la prévisibilité des revenus.",
          },
          {
            id: "p3_opt2",
            text: "B2C avec vente unique ou freemium",
            value: 75,
            consequences: "Modèle viable. Attention aux coûts d'acquisition client.",
          },
          {
            id: "p3_opt3",
            text: "Marketplace ou commission",
            value: 70,
            consequences: "Modèle intéressant si vous avez suffisamment d'utilisateurs.",
          },
        ],
        feedback: "Le business model doit être aligné avec vos coûts et vos utilisateurs.",
      },
      {
        id: "phase3_unit_economics",
        type: "choice",
        text: "Avez-vous étudié vos unit economics ?",
        options: [
          {
            id: "p3_opt4",
            text: "Oui, coûts et revenus par client estimés",
            value: 95,
            consequences: "Très bon ! Vous avez une vision claire de votre rentabilité.",
          },
          {
            id: "p3_opt5",
            text: "Partiellement, quelques éléments estimés",
            value: 60,
            consequences: "À approfondir. Modélisez mieux vos coûts et revenus.",
          },
          {
            id: "p3_opt6",
            text: "Pas encore étudié en détail",
            value: 30,
            consequences: "Priorité ! Faites une analyse complète avant de vous engager.",
          },
        ],
        feedback: "Les unit economics sont essentielles pour prouver la viabilité de votre modèle.",
      },
    ],
  },
  {
    id: 4,
    title: "Proposition de valeur",
    subtitle: "Ce que vous offrez à vos clients",
    emoji: "🎁",
    projectKey: "valueProposition",
    description:
      "Une proposition de valeur claire se résume en une phrase percutante.",
    questions: [
      {
        id: "phase4_value",
        type: "text",
        text: "Exprimez votre proposition de valeur en 1-2 phrases.",
        placeholder: "Ex : Nous aidons les agriculteurs à vendre au meilleur prix grâce à l'info en temps réel par SMS.",
        hint: "Pour [cible], nous [offre] qui [bénéfice]. Contrairement à [concurrence], nous [différence].",
        options: [],
        feedback:
          "Une proposition de valeur claire est essentielle pour attirer vos premiers clients.",
      },
      {
        id: "phase4_product",
        type: "choice",
        text: "Avez-vous défini les features MVPs (Minimum Viable Product) ?",
        options: [
          {
            id: "p4_opt4",
            text: "Oui, liste précise des features essentielles",
            value: 100,
            consequences: "Excellent ! Vous pouvez commencer le développement rapidement.",
          },
          {
            id: "p4_opt5",
            text: "Partiellement, liste trop longue",
            value: 65,
            consequences: "À affiner. Supprimez les features non essentielles.",
          },
          {
            id: "p4_opt6",
            text: "Non, trop de features envisagées",
            value: 35,
            consequences: "Définissez un MVP ! C'est crucial pour un lancement rapide.",
          },
        ],
        feedback: "Le MVP doit être minimal mais viable pour tester votre hypothèse.",
      },
    ],
  },
  {
    id: 5,
    title: "Prototypage et tests",
    subtitle: "Validez avec vos utilisateurs",
    emoji: "🧪",
    projectKey: "nextSteps",
    description:
      "Un projet clair sait quelles sont les prochaines étapes de validation.",
    questions: [
      {
        id: "phase5_next_steps",
        type: "text",
        text: "Quelles sont vos 2-3 prochaines étapes pour valider votre idée ?",
        placeholder: "Ex : 1) Tester avec 10 agriculteurs  2) Construire le prototype SMS  3) Mesurer l'impact sur les prix...",
        hint: "Actions concrètes, pas des vœux. Test, prototype, feedback...",
        options: [],
        feedback: "Des étapes claires vous évitent de vous perdre.",
      },
      {
        id: "phase5_prototype",
        type: "choice",
        text: "Quel niveau de prototype avez-vous atteint ?",
        options: [
          {
            id: "p5_opt1",
            text: "MVP fonctionnel testé avec les utilisateurs",
            value: 100,
            consequences: "Excellent ! Vous avez validé votre solution avec des vrais utilisateurs.",
          },
          {
            id: "p5_opt2",
            text: "Prototype fonctionnel mais pas encore testé",
            value: 75,
            consequences: "Prochaine étape : testez avec vos utilisateurs !",
          },
          {
            id: "p5_opt3",
            text: "Mock-ups ou wireframes uniquement",
            value: 50,
            consequences: "C'est un bon début. Créez un prototype fonctionnel rapidement.",
          },
        ],
        feedback: "Les tests utilisateurs sont essentiels pour valider votre approche.",
      },
      {
        id: "phase5_feedback",
        type: "choice",
        text: "Avez-vous reçu du feedback utilisateur positif ?",
        options: [
          {
            id: "p5_opt4",
            text: "Oui, feedback très positif et demandes claires",
            value: 100,
            consequences: "Super ! Vous êtes sur la bonne voie. Continuez à écouter vos utilisateurs.",
          },
          {
            id: "p5_opt5",
            text: "Feedback mitigé, quelques points à améliorer",
            value: 70,
            consequences: "Normal ! Itérez et améliorez votre produit.",
          },
          {
            id: "p5_opt6",
            text: "Pas encore de feedback utilisateur",
            value: 40,
            consequences: "C'est critique ! Testez votre produit dès que possible.",
          },
        ],
        feedback: "Le feedback utilisateur est votre meilleur guide pour améliorer votre produit.",
      },
    ],
  },
  {
    id: 6,
    title: "Pré-pitch et validation",
    subtitle: "Mesurez la maturité de votre projet",
    emoji: "🏆",
    description:
      "Synthétisez votre parcours, créez un pitch et recevez un score de maturité.",
    questions: [
      {
        id: "phase6_pitch",
        type: "choice",
        text: "Pouvez-vous pitcher votre projet en 2 minutes ?",
        options: [
          {
            id: "p6_opt1",
            text: "Oui, pitch clair et convaincant",
            value: 100,
            consequences: "Excellent ! Vous êtes prêt à convaincre vos premiers investisseurs.",
          },
          {
            id: "p6_opt2",
            text: "Partiellement, besoin de plus de pratique",
            value: 70,
            consequences: "À travailler. Pratiquez votre pitch régulièrement.",
          },
          {
            id: "p6_opt3",
            text: "Non, trop compliqué à synthétiser",
            value: 40,
            consequences: "Clarifiez votre message avant de pitcher.",
          },
        ],
        feedback: "Un bon pitch est une compétence clé pour trouver du financement.",
      },
      {
        id: "phase6_readiness",
        type: "choice",
        text: "Vous sentez-vous prêt à commencer ?",
        options: [
          {
            id: "p6_opt4",
            text: "Oui, très confiant et motivé",
            value: 100,
            consequences: "Parfait ! Lancez-vous maintenant ! Vous êtes prêt.",
          },
          {
            id: "p6_opt5",
            text: "Partiellement, quelques inquiétudes",
            value: 70,
            consequences: "C'est normal. Adressez vos inquiétudes une par une.",
          },
          {
            id: "p6_opt6",
            text: "Non, trop de points à clarifier",
            value: 40,
            consequences: "Prenez le temps qu'il faut pour être confiant avant de commencer.",
          },
        ],
        feedback: "La confiance et la clarté sont essentielles pour réussir.",
      },
    ],
  },
];
