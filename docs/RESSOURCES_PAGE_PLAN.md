# 📚 Page Ressources - Plan Détaillé

## 🎯 Vision Globale

La page **Ressources** est un hub centralisé pour accompagner les utilisateurs dans leur parcours d'incubation. Elle propose des **guides, tutoriels, outils et bonnes pratiques** organisés par thème et niveau d'expertise.

**Objectif:** Créer une ressource éducative accessible à tous (Users, Coaches, Admins) pour accélérer l'apprentissage et la réussite des projets.

---

## 👥 USER STORIES

### **US-R01: Utilisateur - Consulter les ressources disponibles**
**En tant qu'** utilisateur / coach / admin
**Je veux** accéder à une page centrale avec toutes les ressources disponibles
**Pour que** je puisse m'auto-former et améliorer mes compétences entrepreneuriales

**Critères d'acceptation:**
- ✅ Page organisée en catégories claires (Guides, Tutoriels, Outils, Templates)
- ✅ Visible et accessible pour tous les rôles (User, Coach, Admin)
- ✅ Design attrayant avec icônes et cartes visuelles
- ✅ Navigation intuitive et hiérarchie claire
- ✅ Responsive sur mobile/tablet/desktop

---

### **US-R02: Utilisateur - Filtrer les ressources par catégorie**
**En tant qu'** utilisateur
**Je veux** filtrer les ressources par thème (Business Model, Pitch, Pitch Deck, etc.)
**Pour que** je trouve rapidement ce dont j'ai besoin

**Critères d'acceptation:**
- ✅ Tabs/Boutons de filtrage par catégorie:
  - 📋 Guides Généraux
  - 🚀 Lancement du Projet
  - 💼 Business Model
  - 🎤 Pitch & Présentation
  - 💰 Financement & Budget
  - 📊 Métriques & Données
  - 🌐 Marketing & Distribution
  - ⚙️ Outils Recommandés
- ✅ Affichage immédiat des ressources filtrées
- ✅ Badge indiquant le nombre de ressources par catégorie

---

### **US-R03: Utilisateur - Consulter le détail d'une ressource**
**En tant qu'** utilisateur
**Je veux** cliquer sur une ressource pour voir son contenu complet
**Pour que** je puisse apprendre et mettre en pratique les conseils

**Critères d'acceptation:**
- ✅ Page détail avec:
  - Titre et description complète
  - Catégorie et niveau de difficulté (Débutant/Intermédiaire/Avancé)
  - Durée de lecture/visionnage estimée
  - Tags/Mots clés
  - Contenu principal (texte, images, vidéo, lien)
  - Auteur/Source
  - Date de publication
  - "Sauvegarder" la ressource
  - Ressources connexes suggérées
- ✅ Navigation: Précédent/Suivant
- ✅ Bouton "Retour aux ressources"

---

### **US-R04: Utilisateur - Sauvegarder ses ressources préférées**
**En tant qu'** utilisateur
**Je veux** marquer une ressource comme "favori" ou "À lire plus tard"
**Pour que** je puisse les retrouver facilement et planifier mon apprentissage

**Critères d'acceptation:**
- ✅ Bouton "⭐ Sauvegarder" sur chaque ressource
- ✅ Les ressources sauvegardées apparaissent dans une section "Mes ressources"
- ✅ Badge dans le header indiquant le nombre de ressources sauvegardées
- ✅ Possibilité de supprimer d'une ressource de mes favoris
- ✅ Les favoris sont persistants (stockés en base de données)

---

### **US-R05: Utilisateur - Rechercher une ressource**
**En tant qu'** utilisateur
**Je veux** utiliser une barre de recherche pour trouver rapidement une ressource
**Pour que** j'accède directement au contenu qui m'intéresse

**Critères d'acceptation:**
- ✅ Barre de recherche visible en haut de page
- ✅ Recherche en temps réel (live search)
- ✅ Résultats affichent: Titre, Catégorie, Aperçu
- ✅ Si aucun résultat: message "Pas de ressource trouvée"
- ✅ Possibilité de réinitialiser la recherche

---

### **US-R06: Coach - Accéder aux ressources pour conseiller les utilisateurs**
**En tant que** coach
**Je veux** consulter les ressources pour pouvoir les recommander à mes utilisateurs
**Pour que** je puisse diriger efficacement le développement de leurs projets

**Critères d'acceptation:**
- ✅ Section "Ressources à recommander" pour sélectionner et partager
- ✅ Pouvoir copier un lien de ressource pour le partager
- ✅ Voir une liste des ressources consultées récemment
- ✅ Possibilité d'ajouter une note personnelle à une ressource

---

### **US-R07: Admin - Gérer les ressources**
**En tant qu'** administrateur
**Je veux** accéder à un panneau de gestion pour ajouter/modifier/supprimer des ressources
**Pour que** je puisse maintenir la base de ressources à jour

**Critères d'acceptation:**
- ✅ Lien "Gestion des ressources" accessible uniquement aux admins
- ✅ Tableau listant toutes les ressources avec:
  - Titre, Catégorie, Statut (Publié/Brouillon), Date création, Auteur
  - Actions: Éditer, Prévisualiser, Supprimer
- ✅ Formulaire d'ajout/édition:
  - Titre, Description, Catégorie (dropdown)
  - Niveau de difficulté
  - Durée estimée
  - Contenu principal (éditeur rich text)
  - URL externe (si c'est un lien)
  - Upload image/vidéo
  - Tags
  - Auteur/Source
- ✅ Bouton "Publier" ou "Sauvegarder comme brouillon"
- ✅ Historique des modifications

---

## 🔄 FLOW UX/UI - PARCOURS UTILISATEUR

### **Flow 1: Utilisateur - Découvrir et consulter une ressource**

```
Accueil
    ↓
[Clic "Ressources" dans Header]
    ↓
[Page Ressources - Vue Principale]
├─ Banner hero avec titre et description
├─ Barre de recherche
├─ Tabs de catégories
└─ Grille de ressources par catégorie
    ↓
[Clic sur une ressource OU Recherche]
    ↓
[Détail Ressource]
├─ Titre + Description complète
├─ Catégorie, Niveau, Durée
├─ Contenu principal
├─ Auteur/Source + Date
├─ Bouton "⭐ Sauvegarder"
├─ Section "Ressources connexes"
└─ Navigation (Précédent/Suivant)
    ↓
[Retour aux Ressources] ou [Voir Ressource Suivante]
```

### **Flow 2: Utilisateur - Sauvegarder et consulter ses favoris**

```
Page Ressources
    ↓
[Clic ⭐ sur une ressource]
    ↓
✅ Notification: "Ressource sauvegardée"
    ↓
[Badge "Mes ressources" (+1)]
    ↓
[Clic sur "Mes ressources"]
    ↓
[Mes Favoris]
├─ Liste des ressources sauvegardées
├─ Filtre par catégorie
└─ Option supprimer
    ↓
[Clic pour consulter] ou [Supprimer des favoris]
```

### **Flow 3: Coach - Consulter et recommander une ressource**

```
Page Ressources
    ↓
[Consulter les ressources]
    ↓
[Détail Ressource]
├─ Contenu complet
├─ Bouton "Copier le lien"
├─ Bouton "Recommander à un utilisateur"
└─ Ajouter une note personnelle
    ↓
[Recommandation partagée avec utilisateur]
```

### **Flow 4: Admin - Gérer les ressources**

```
Dashboard Admin
    ↓
[Clic "Gestion des ressources"]
    ↓
[Tableau Ressources]
├─ Liste de toutes les ressources
├─ Filtrage par statut/catégorie
└─ Actions (Éditer, Supprimer, Prévisualiser)
    ↓
[Clic "Ajouter" ou "Éditer"]
    ↓
[Formulaire Ressource]
├─ Titre, Description, Catégorie
├─ Contenu (éditeur rich text)
├─ Upload média
├─ Sauvegarder/Publier
└─ ✅ Confirmation
    ↓
[Ressource visible en production]
```

---

## 🎨 UI/UX DESIGN

### **1. Architecture Globale**

```
┌─────────────────────────────────────────────────┐
│                     HEADER                       │
│  Logo | Accueil | Mes projets | Hackathons |    │
│       Ressources (CURRENT) | Contact | Login    │
└─────────────────────────────────────────────────┘
│                                                   │
│  ┌──────────────────────────────────────────┐    │
│  │          HERO SECTION (Section-Baobab)   │    │
│  │  "Développez vos compétences entrepreneurs"   │
│  │         Icône + Description courte        │    │
│  └──────────────────────────────────────────┘    │
│                                                   │
│  ┌──────────────────────────────────────────┐    │
│  │  🔍 BARRE DE RECHERCHE                   │    │
│  │  [                                    ]  │    │
│  └──────────────────────────────────────────┘    │
│                                                   │
│  ┌──────────────────────────────────────────┐    │
│  │  📋 GUIDES | 🚀 LANCEMENT | 💼 BUSINESS  │    │
│  │  🎤 PITCH | 💰 FINANCEMENT | ... (TABS)  │    │
│  └──────────────────────────────────────────┘    │
│                                                   │
│  ┌──────────────────────────────────────────┐    │
│  │       RESSOURCES (GRILLE DE CARTES)      │    │
│  │  ┌────────┐  ┌────────┐  ┌────────┐     │    │
│  │  │Ressour │  │Ressour │  │Ressour │     │    │
│  │  │ce 1    │  │ce 2    │  │ce 3    │     │    │
│  │  │        │  │        │  │        │     │    │
│  │  │[En     │  │[En     │  │[En     │     │    │
│  │  │Savoir+]│  │Savoir+]│  │Savoir+]│     │    │
│  │  └────────┘  └────────┘  └────────┘     │    │
│  │                                          │    │
│  │  ┌────────┐  ┌────────┐  ┌────────┐     │    │
│  │  │Ressour │  │Ressour │  │Ressour │     │    │
│  │  │ce 4    │  │ce 5    │  │ce 6    │     │    │
│  │  └────────┘  └────────┘  └────────┘     │    │
│  └──────────────────────────────────────────┘    │
│                                                   │
│  ┌──────────────────────────────────────────┐    │
│  │           PAGINATION / LOAD MORE         │    │
│  │         [Précédent] [1] [2] [3] [Suivant] │  │
│  └──────────────────────────────────────────┘    │
│                                                   │
└─────────────────────────────────────────────────┘
│                    FOOTER                         │
└─────────────────────────────────────────────────┘
```

### **2. Design de Carte Ressource**

```
┌─────────────────────────────────────┐
│   [Image/Icône 200px x 150px]      │
│                                     │
│  🏷️ Catégorie | ⏱️ 5 min | 📊 Int.│
│                                     │
│  Titre de la Ressource              │
│  (Police: 18px, Gras)              │
│                                     │
│  Aperçu: Découvrez comment créer... │
│  (2 lignes max, Police: 14px)      │
│                                     │
│  Auteur: John Doe | 15 Jan 2026    │
│  (Police: 12px, Gris)              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [En Savoir Plus →]  [⭐]   │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### **3. Page Détail Ressource**

```
┌────────────────────────────────────────────────┐
│  [← Retour aux Ressources]                     │
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │     GRANDE IMAGE/VIDÉO (100% width)     │  │
│  │             400px height                  │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  🏷️ Catégorie | ⏱️ Durée | 📊 Niveau         │
│                                                │
│  Titre de la Ressource                        │
│  (Police: 32px, Gras, Couleur primaire)      │
│                                                │
│  Auteur: John Doe | 15 Jan 2026                │
│                                                │
│  [⭐ Sauvegarder]  [🔗 Partager]              │
│                                                │
│  ─────────────────────────────────────────    │
│                                                │
│  CONTENU PRINCIPAL                            │
│  ────────────────────                         │
│  Lorem ipsum dolor sit amet... (Texte riche)  │
│  - Bullet point 1                             │
│  - Bullet point 2                             │
│  - Bullet point 3                             │
│                                                │
│  [Images/Diagrammes intégrés]                 │
│                                                │
│  ─────────────────────────────────────────    │
│                                                │
│  RESSOURCES CONNEXES                          │
│  ────────────────────                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │Ressource │ │Ressource │ │Ressource │      │
│  │ Connexe1 │ │ Connexe2 │ │ Connexe3 │      │
│  └──────────┘ └──────────┘ └──────────┘      │
│                                                │
│  [← Précédent Ressource] [Suivant Ressource →]│
│                                                │
└────────────────────────────────────────────────┘
```

### **4. Catégories et Icônes**

| Catégorie | Icône | Couleur | Emoji |
|-----------|-------|---------|-------|
| Guides Généraux | 📖 | #3B82F6 (Bleu) | 📋 |
| Lancement du Projet | 🚀 | #10B981 (Vert) | 🚀 |
| Business Model | 💼 | #8B5CF6 (Violet) | 💼 |
| Pitch & Présentation | 🎤 | #EC4899 (Rose) | 🎤 |
| Financement & Budget | 💰 | #F59E0B (Jaune) | 💰 |
| Métriques & Données | 📊 | #06B6D4 (Cyan) | 📊 |
| Marketing & Distribution | 🌐 | #FF6B6B (Rouge) | 🌐 |
| Outils Recommandés | ⚙️ | #6366F1 (Indigo) | ⚙️ |

### **5. Niveaux de Difficulté**

| Niveau | Badge | Couleur | Description |
|--------|-------|---------|-------------|
| Débutant | 🟢 | #10B981 | Pour les nouveaux entrepreneurs |
| Intermédiaire | 🟡 | #F59E0B | Concepts avancés, bonne base requise |
| Avancé | 🔴 | #EF4444 | Expertise nécessaire, cas complexes |

### **6. Composants UI à Créer**

```
├── ResourceCard.tsx
│   └── Affiche une ressource en format carte
│
├── ResourceGrid.tsx
│   └── Grille responsive de cartes ressources
│
├── CategoryFilter.tsx
│   └── Tabs/Boutons pour filtrer par catégorie
│
├── SearchBar.tsx
│   └── Barre de recherche avec live search
│
├── ResourceDetail.tsx
│   └── Page complète d'une ressource
│
├── ResourceForm.tsx (Admin)
│   └── Formulaire CRUD pour gérer les ressources
│
├── SavedResources.tsx
│   └── Page "Mes ressources sauvegardées"
│
├── DifficultyBadge.tsx
│   └── Badge niveau de difficulté
│
└── ResourceMeta.tsx
    └── Affiche catégorie, durée, auteur, date
```

### **7. Palette de Couleurs**

```
Primaire:     #704214 (Marron ISM)
Secondaire:   #FF6600 (Orange)
Success:      #10B981 (Vert)
Warning:      #F59E0B (Jaune)
Danger:       #EF4444 (Rouge)
Info:         #06B6D4 (Cyan)
Fond:         #F5EBE0 (Beige/Baobab)
Texte:        #1F2937 (Gris foncé)
Bordure:      #E5E7EB (Gris clair)
```

---

## 📊 CONTENU - Ressources d'Exemple

### **📋 Guides Généraux** (3 ressources)
1. **"10 Étapes pour Lancer Votre Startup"**
   - Description: Un guide complet des première étapes pour démarrer
   - Durée: 12 min de lecture
   - Niveau: Débutant

2. **"Le Guide Complet du Business Plan"**
   - Description: Apprenez à structurer un business plan solide
   - Durée: 18 min de lecture
   - Niveau: Débutant

3. **"Mentalité Entrepreneuriale: 7 Qualités Clés"**
   - Description: Développez les traits essentiels des entrepreneurs réussis
   - Durée: 8 min de lecture
   - Niveau: Débutant

### **🚀 Lancement du Projet** (3 ressources)
1. **"MVP: Définir Votre Produit Minimum Viable"**
   - Durée: 10 min
   - Niveau: Débutant

2. **"Go-to-Market Strategy: Comment Entrer le Marché"**
   - Durée: 15 min
   - Niveau: Intermédiaire

3. **"De l'Idée au Produit: 6 Mois Accélérés"**
   - Durée: 20 min (Vidéo)
   - Niveau: Avancé

### **💼 Business Model** (3 ressources)
1. **"Canvas Business Model Expliqué"**
   - Durée: 12 min
   - Niveau: Débutant

2. **"Modèles de Revenu: Choisir le Bon pour Votre Startup"**
   - Durée: 14 min
   - Niveau: Intermédiaire

3. **"Scaling Your Business Model"**
   - Durée: 16 min
   - Niveau: Avancé

### **🎤 Pitch & Présentation** (3 ressources)
1. **"Créer un Pitch Deck Gagnant en 7 Étapes"**
   - Durée: 13 min
   - Niveau: Débutant

2. **"L'Art de Pitcher Devant les Investisseurs"**
   - Durée: 11 min
   - Niveau: Intermédiaire

3. **"Storytelling pour Entrepreneurs"**
   - Durée: 9 min
   - Niveau: Intermédiaire

### **💰 Financement & Budget** (3 ressources)
1. **"Financer Votre Startup: Toutes les Options"**
   - Durée: 15 min
   - Niveau: Débutant

2. **"Budgetisation pour Startups"**
   - Durée: 12 min
   - Niveau: Intermédiaire

3. **"Négocier avec les Investisseurs"**
   - Durée: 14 min
   - Niveau: Avancé

### **📊 Métriques & Données** (3 ressources)
1. **"KPIs Essentiels pour Votre Startup"**
   - Durée: 10 min
   - Niveau: Débutant

2. **"Analytics: Mesurer Votre Succès"**
   - Durée: 13 min
   - Niveau: Intermédiaire

3. **"Unit Economics: Rentabilité Par Client"**
   - Durée: 12 min
   - Niveau: Avancé

### **🌐 Marketing & Distribution** (3 ressources)
1. **"Marketing Digital pour Startups"**
   - Durée: 14 min
   - Niveau: Débutant

2. **"Growth Hacking: Techniques de Croissance Rapide"**
   - Durée: 16 min
   - Niveau: Intermédiaire

3. **"Distribution Strategy: Atteindre Vos Clients"**
   - Durée: 13 min
   - Niveau: Intermédiaire

### **⚙️ Outils Recommandés** (5 ressources)
1. **"Figma pour les Startups"**
   - Durée: 8 min
   - Niveau: Débutant

2. **"Notion: Organiser Votre Startup"**
   - Durée: 10 min
   - Niveau: Débutant

3. **"Lean Canvas vs Business Model Canvas"**
   - Durée: 7 min
   - Niveau: Débutant

4. **"Google Analytics pour Mesurer le Trafic"**
   - Durée: 11 min
   - Niveau: Intermédiaire

5. **"Hotjar: Comprendre le Comportement Utilisateur"**
   - Durée: 9 min
   - Niveau: Intermédiaire

---

## 🗄️ MODÈLE DE DONNÉES - Prisma Schema

```prisma
model Resource {
  id            String    @id @default(cuid())
  title         String    @unique
  description   String    @db.Text
  content       String    @db.Text
  category      String    // Guides, Lancement, Business, Pitch, Finance, Metriques, Marketing, Outils
  difficulty    String    // Debutant, Intermediaire, Avance
  duration      Int       // En minutes
  imageUrl      String?
  videoUrl      String?
  externalUrl   String?   // URL externe si c'est un lien
  author        String
  source        String?   // D'où vient la ressource
  status        String    @default("draft") // draft ou published
  tags          String[]  // Array de tags
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  savedBy       SavedResource[]
  relatedResources RelatedResource[] @relation("from")
  relatedTo     RelatedResource[] @relation("to")
  
  @@index([category])
  @@index([difficulty])
  @@index([status])
}

model SavedResource {
  id         String   @id @default(cuid())
  userId     String
  resourceId String
  savedAt    DateTime @default(now())
  
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  resource   Resource @relation(fields: [resourceId], references: [id], onDelete: Cascade)
  
  @@unique([userId, resourceId])
  @@index([userId])
}

model RelatedResource {
  id              String   @id @default(cuid())
  fromResourceId  String
  toResourceId    String
  
  fromResource    Resource @relation("from", fields: [fromResourceId], references: [id], onDelete: Cascade)
  toResource      Resource @relation("to", fields: [toResourceId], references: [id], onDelete: Cascade)
  
  @@unique([fromResourceId, toResourceId])
}
```

---

## 🔌 API ENDPOINTS

### **Routes Publiques** (Accessible: User, Coach, Admin)

```
GET    /api/resources
       Query params: category, difficulty, search, page, limit
       Response: { resources: [], total, hasMore }

GET    /api/resources/:id
       Response: { resource: Resource, relatedResources: [] }

GET    /api/resources/featured
       Response: { resources: Resource[] (8 ressources populaires) }

GET    /api/categories
       Response: { categories: [] }
```

### **Routes Authentifiées** (Accessible: User, Coach, Admin)

```
POST   /api/resources/:id/save
       Response: { success: true, saved: true }

DELETE /api/resources/:id/save
       Response: { success: true, saved: false }

GET    /api/user/saved-resources
       Query params: page, limit
       Response: { resources: [], total }
```

### **Routes Admin**

```
POST   /api/admin/resources
       Body: { title, description, content, category, ... }
       Response: { resource: Resource }

PUT    /api/admin/resources/:id
       Body: { title, description, content, ... }
       Response: { resource: Resource }

DELETE /api/admin/resources/:id
       Response: { success: true }

GET    /api/admin/resources
       Query params: status, category, search, page, limit
       Response: { resources: [], total }

PATCH  /api/admin/resources/:id/publish
       Response: { resource: Resource }
```

---

## 📈 Métriques de Succès

| Métrique | Objectif | Mesure |
|----------|----------|--------|
| Ressources consultées | 100+ par mois | Google Analytics |
| Taux de sauvegarde | 30% | Nombre de SavedResource |
| Temps moyen sur la page | 5+ min | Google Analytics |
| Catégorie plus visitée | Guides/Lancement | Événements trackés |
| Satisfaction utilisateur | 4.5/5 | Feedback & Ratings |

---

## 🚀 Roadmap d'Implémentation

**Phase 1 (Semaine 1-2):**
- ✅ Créer modèles Prisma
- ✅ Implémenter API endpoints
- ✅ Créer page Ressources principale
- ✅ Ajouter contenu d'exemple (24 ressources)

**Phase 2 (Semaine 3):**
- ✅ Filtrage par catégorie
- ✅ Recherche live
- ✅ Page détail ressource
- ✅ Système de sauvegarde

**Phase 3 (Semaine 4):**
- ✅ Dashboard admin (CRUD)
- ✅ Page "Mes ressources"
- ✅ Ressources connexes
- ✅ Tests et optimisations

---

## ✅ Checklist Implémentation

- [ ] Créer modèles Prisma (Resource, SavedResource, RelatedResource)
- [ ] Ajouter 24 ressources de base dans la seed
- [ ] Créer API routes (GET, POST, PUT, DELETE)
- [ ] Créer composant ResourceCard
- [ ] Créer composant ResourceGrid
- [ ] Créer page /ressources/page.tsx
- [ ] Implémenter CategoryFilter
- [ ] Implémenter SearchBar
- [ ] Créer page détail /ressources/[id]/page.tsx
- [ ] Implémenter bouton "Sauvegarder"
- [ ] Créer page "Mes ressources" /mon-profil/ressources/page.tsx
- [ ] Implémenter admin panel /admin/ressources/page.tsx
- [ ] Ajouter animations Framer Motion
- [ ] Responsive design mobile/tablet/desktop
- [ ] Tests E2E
- [ ] Optimisations SEO
- [ ] Déploiement

---

## 📝 Notes Techniques

1. **Performance:**
   - Pagination pour éviter charger toutes les ressources
   - Images optimisées (Next.js Image component)
   - Lazy loading des ressources connexes

2. **SEO:**
   - Meta tags dynamiques par ressource
   - Structured data (Schema.org)
   - Sitemap ressources

3. **UX:**
   - Animations de transition smooth
   - États loading/error/empty
   - Confirmation avant suppression
   - Toast notifications

4. **Accessibilité:**
   - Alt text sur les images
   - ARIA labels sur les boutons
   - Contraste suffisant
   - Navigation au clavier

