# 📋 User Stories & Flow UX/UI - Rôles Admin & Coach

## 🎯 Hiérarchie des Rôles
```
User (Utilisateur) → Coach (Mentor) → Admin (Administrateur)
```

---

## 👤 USER STORY: ADMINISTRATEUR

### **US-01: Admin - Voir tous les utilisateurs**
**En tant qu'** administrateur
**Je veux** accéder à un tableau de bord avec la liste de tous les utilisateurs
**Pour que** je puisse les gérer et avoir une vue d'ensemble

**Critères d'acceptation:**
- ✅ Tableau avec colonnes: Nom, Email, Téléphone, Rôle, Nombre de projets, Date inscription
- ✅ Recherche par nom/email
- ✅ Filtrage par rôle (User, Coach, Admin)
- ✅ Pagination (10, 25, 50 users par page)
- ✅ Tri par colonne (nom, date, nombre projets)
- ✅ Action: voir les détails d'un utilisateur

---

### **US-02: Admin - Voir les projets d'un utilisateur**
**En tant qu'** administrateur
**Je veux** cliquer sur un utilisateur pour voir tous ses projets
**Pour que** je puisse suivre la progression de ses travaux

**Critères d'acceptation:**
- ✅ Modal/Page détails utilisateur avec infos personnelles
- ✅ Liste des projets avec: Nom, Statut, Date création, Coaches assignés
- ✅ Voir le détail d'un projet (description, feedbacks, progression)
- ✅ Bouton retour vers la liste des utilisateurs
- ✅ Afficher: 0 projet → message "Pas de projet"

---

### **US-03: Admin - Gérer les rôles**
**En tant qu'** administrateur
**Je veux** modifier le rôle d'un utilisateur (User → Coach, Coach → Admin)
**Pour que** je puisse promouvoir les utilisateurs

**Critères d'acceptation:**
- ✅ Dropdown pour sélectionner le rôle: User, Coach, Admin
- ✅ Confirmation avant changement
- ✅ Notification toast de succès
- ✅ Historique des changements de rôles

---

### **US-04: Admin - Désactiver/Activer un utilisateur**
**En tant qu'** administrateur
**Je veux** désactiver un compte utilisateur (soft delete)
**Pour que** je puisse suspendre l'accès sans perdre les données

**Critères d'acceptation:**
- ✅ Bouton "Désactiver" qui mark le user comme inactif
- ✅ L'utilisateur ne peut plus se connecter
- ✅ Ses projets restent visibles pour l'historique
- ✅ Bouton "Réactiver" pour les comptes désactivés

---

## 🎓 USER STORY: COACH

### **US-05: Coach - Voir les projets assignés**
**En tant que** coach
**Je veux** accéder à un tableau de bord avec mes projets assignés
**Pour que** je puisse donner des feedbacks et mentorer les utilisateurs

**Critères d'acceptation:**
- ✅ Liste des projets assignés au coach
- ✅ Colonnes: Projet, Utilisateur, Statut, Dernière mise à jour
- ✅ Filtrage par statut (En cours, Terminé)
- ✅ Tri par date de dernière mise à jour
- ✅ Clic pour voir le détail du projet et l'utilisateur

---

### **US-06: Coach - Voir les détails d'un projet**
**En tant que** coach
**Je veux** voir le détail complet d'un projet assigné
**Pour que** je puisse évaluer sa progression et ses points forts/faibles

**Critères d'acceptation:**
- ✅ Infos du projet: Nom, Description, Statut, Dates
- ✅ Infos de l'utilisateur: Nom, Email, Téléphone
- ✅ Score de maturité du projet (%)
- ✅ Section feedbacks existants
- ✅ Formulaire pour ajouter un nouveau feedback

---

### **US-07: Coach - Donner un feedback**
**En tant que** coach
**Je veux** ajouter un feedback structuré sur un projet
**Pour que** l'utilisateur reçoive des commentaires constructifs

**Critères d'acceptation:**
- ✅ Formulaire avec:
  - Catégorie feedback: Produit, Marché, Business, Équipe, Autre
  - Priorité: Basse, Moyenne, Haute
  - Texte du feedback (min 20 caractères)
- ✅ Bouton "Envoyer feedback"
- ✅ Notification confirmant l'envoi
- ✅ Date/heure du feedback affichée
- ✅ Historique des feedbacks affichés avec nom du coach

---

### **US-08: Coach - Voir les feedbacks donnés**
**En tant que** coach
**Je veux** voir l'historique de mes feedbacks
**Pour que** je puisse suivre mes interactions avec les utilisateurs

**Critères d'acceptation:**
- ✅ Dashboard "Mes feedbacks"
- ✅ Liste avec: Projet, Utilisateur, Catégorie, Priorité, Date
- ✅ Possibilité d'éditer/supprimer ses propres feedbacks
- ✅ Filtrage par projet ou catégorie

---

## 👥 USER STORY: UTILISATEUR (Enrichissement)

### **US-09: Utilisateur - Voir ses feedbacks reçus**
**En tant qu'** utilisateur
**Je veux** voir tous les feedbacks reçus des coaches
**Pour que** je puisse améliorer mes projets

**Critères d'acceptation:**
- ✅ Page "Feedbacks reçus" dans mon profil
- ✅ Liste des feedbacks par projet
- ✅ Affichage: Coach, Catégorie, Priorité, Date, Texte
- ✅ Marquer un feedback comme "Lu"
- ✅ Nombre de feedbacks non lus en badge

---

## 🔄 FLOW UX/UI - PARCOURS UTILISATEUR

### **Flow 1: Admin - Consulter les utilisateurs et leurs projets**

```
Admin Dashboard
    ↓
[Liste Utilisateurs]
├─ Recherche/Filtrage
├─ Tableau avec actions
└─ Clic sur utilisateur
    ↓
[Détail Utilisateur]
├─ Infos personnelles
├─ Changer rôle
├─ Désactiver/Activer
└─ [Voir ses projets]
    ↓
[Projets de l'utilisateur]
├─ Liste projects
└─ Clic sur project
    ↓
[Détail Projet]
├─ Description
├─ Feedbacks reçus
└─ Retour
```

### **Flow 2: Coach - Donner des feedbacks**

```
Coach Dashboard
    ↓
[Mes Projets Assignés]
├─ Filtrage/Tri
└─ Clic sur projet
    ↓
[Détail Projet]
├─ Infos utilisateur & projet
├─ Score de maturité
├─ Historique feedbacks
└─ [Ajouter Feedback]
    ↓
[Formulaire Feedback]
├─ Catégorie (dropdown)
├─ Priorité (radio buttons)
├─ Texte (textarea)
└─ [Envoyer]
    ↓
✅ Confirmation & Notification
```

### **Flow 3: Utilisateur - Consulter ses feedbacks**

```
Mon Profil
    ↓
[Mes Projets]
    ↓
Clic sur projet
    ↓
[Détail Projet]
├─ Mes infos
├─ Statut du projet
├─ Score de maturité
└─ [Feedbacks]
    ↓
[Feedbacks reçus]
├─ Liste chronologique
├─ Filtre par coach
├─ Marquer comme lu
└─ Badge nombre non lus
```

---

## 🎨 Éléments UX/UI Clés

### **Design System**
| Élément | Couleur/Style |
|---------|--------------|
| Admin | 🔵 Bleu (#0066FF) |
| Coach | 🟢 Vert (#10B981) |
| User | 🟡 Orange (#FF6600) |
| Feedback Haute Priorité | 🔴 Rouge (#EF4444) |
| Feedback Moyenne | 🟡 Orange (#F59E0B) |
| Feedback Basse | 🟢 Vert (#10B981) |

### **Composants Réutilisables**
- ✅ Modal Détail Utilisateur
- ✅ Tableau Responsive avec tri/filtrage
- ✅ Carte Projet
- ✅ Formulaire Feedback
- ✅ Badge Rôle (Admin/Coach/User)
- ✅ Badge Priorité Feedback
- ✅ Timeline Feedbacks

### **Micro-interactions**
- ✅ Toast notifications (succès/erreur)
- ✅ Loading skeleton pendant les requêtes
- ✅ Confirmation avant suppression
- ✅ Animation smooth des modals
- ✅ Indication de page active

---

## 📊 Modifications DB Prisma Requises

```prisma
model User {
  // ... champs existants
  role            Role      @default(USER)  // USER | COACH | ADMIN
  isActive        Boolean   @default(true)
  coaches         Coach[]   // Coaches assignés à cet user
  feedbacks       Feedback[] // Feedbacks reçus
}

model Coach {
  id              String    @id @default(cuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id])
  assignedProjects CoachProject[]
  feedbacks       Feedback[]
  createdAt       DateTime  @default(now())
}

model CoachProject {
  id              String    @id @default(cuid())
  coachId         String
  coach           Coach     @relation(fields: [coachId], references: [id])
  projectId       String
  project         Project   @relation(fields: [projectId], references: [id])
  assignedAt      DateTime  @default(now())
  @@unique([coachId, projectId])
}

model Feedback {
  id              String    @id @default(cuid())
  coachId         String
  coach           Coach     @relation(fields: [coachId], references: [id])
  projectId       String
  project         Project   @relation(fields: [projectId], references: [id])
  category        String    // "produit" | "marche" | "business" | "equipe" | "autre"
  priority        String    // "basse" | "moyenne" | "haute"
  content         String
  isRead          Boolean   @default(false)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

enum Role {
  USER
  COACH
  ADMIN
}
```

---

## 🚀 Plan de Développement

**Phase 1:** Mise à jour schéma Prisma + migrations
**Phase 2:** Routes API pour Admin
**Phase 3:** Routes API pour Coach
**Phase 4:** Composants UI Dashboard Admin
**Phase 5:** Composants UI Dashboard Coach
**Phase 6:** Authentification & Autorisation
**Phase 7:** Tests & Déploiement
