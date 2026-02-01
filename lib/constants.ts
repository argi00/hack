// Rôles utilisateurs
export enum UserRole {
  USER = "USER",
  COACH = "COACH",
  ADMIN = "ADMIN",
}

export const roleLabels: Record<UserRole, string> = {
  [UserRole.USER]: "Utilisateur",
  [UserRole.COACH]: "Coach",
  [UserRole.ADMIN]: "Administrateur",
};

export const roleColors: Record<UserRole, string> = {
  [UserRole.USER]: "#FF6600", // Orange
  [UserRole.COACH]: "#10B981", // Vert
  [UserRole.ADMIN]: "#0066FF", // Bleu
};

// Catégories de feedbacks
export enum FeedbackCategory {
  PRODUIT = "PRODUIT",
  MARCHE = "MARCHE",
  BUSINESS = "BUSINESS",
  EQUIPE = "EQUIPE",
  AUTRE = "AUTRE",
}

export const feedbackCategoryLabels: Record<FeedbackCategory, string> = {
  [FeedbackCategory.PRODUIT]: "Produit",
  [FeedbackCategory.MARCHE]: "Marché",
  [FeedbackCategory.BUSINESS]: "Business",
  [FeedbackCategory.EQUIPE]: "Équipe",
  [FeedbackCategory.AUTRE]: "Autre",
};

// Priorités de feedbacks
export enum FeedbackPriority {
  BASSE = "BASSE",
  MOYENNE = "MOYENNE",
  HAUTE = "HAUTE",
}

export const feedbackPriorityLabels: Record<FeedbackPriority, string> = {
  [FeedbackPriority.BASSE]: "Basse",
  [FeedbackPriority.MOYENNE]: "Moyenne",
  [FeedbackPriority.HAUTE]: "Haute",
};

export const feedbackPriorityColors: Record<FeedbackPriority, string> = {
  [FeedbackPriority.BASSE]: "#10B981", // Vert
  [FeedbackPriority.MOYENNE]: "#F59E0B", // Orange
  [FeedbackPriority.HAUTE]: "#EF4444", // Rouge
};

// Statuts de projets
export enum ProjectStatus {
  PRE_INCUBATION = "pre-incubation",
  INCUBATION = "incubation",
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  [ProjectStatus.PRE_INCUBATION]: "Pré-incubation",
  [ProjectStatus.INCUBATION]: "Incubation",
};

export const projectStatusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.PRE_INCUBATION]: "#9CA3AF", // Gris
  [ProjectStatus.INCUBATION]: "#3B82F6", // Bleu
};
