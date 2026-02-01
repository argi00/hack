# 🎯 Guide de Présentation - ISM Incubateur Platform

## 📋 Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Structure de la plateforme](#structure-de-la-plateforme)
3. [Parcours utilisateur](#parcours-utilisateur)
4. [Parcours coach](#parcours-coach)
5. [Parcours admin](#parcours-admin)
6. [La page Ressources](#la-page-ressources)
7. [Points clés à mettre en avant](#points-clés-à-mettre-en-avant)
8. [Démo live - Scénarios](#démo-live---scénarios)
9. [Questions/Réponses anticipées](#questionsréponses-anticipées)

---

## Vue d'ensemble

**ISM Incubateur** est une plateforme digitale intégrée qui accompagne les entrepreneurs sénégalais du début de leur parcours jusqu'à la maturité de leur projet. Elle combine:

✅ **Jeu éducatif** - Apprentissage ludique par phases  
✅ **Hackathons** - Compétitions et networking  
✅ **Système de coaching** - Mentoring personnalisé  
✅ **Ressources** - Hub éducatif complet  
✅ **Gestion admin** - Suivi global des utilisateurs et projets

**Objectif:** Créer un écosystème d'innovation et d'entrepreneuriat au Sénégal

---

## Structure de la plateforme

### 🏠 Page d'accueil
- **Hero section** avec image de fond (étudiant)
- **Statistiques clés** (utilisateurs, projets, hackathons)
- **Sections principales:**
  - 🚀 Jeu éducatif (lancer votre projet rapidement)
  - 🎤 Hackathons (compétitions)
  - 📚 Ressources (apprentissage)
  - 💬 Communauté (témoignages)
  - 📞 Contact

### 🎮 Pages principales
- **Jeu Éducatif** (`/jeu-educatif`) - Parcours de 4 phases
- **Mes Projets** (`/mes-projets`) - Gestion des projets utilisateur
- **Hackathons** (`/hackathons`) - Liste des compétitions
- **Ressources** (`/ressources`) - Hub éducatif (24+ ressources)
- **Mentoring** (`/mentoring`) - Système de coaching
- **Authentification** (Login/Inscription)

### 👥 Rôles utilisateur
| Rôle | Accès | Permissions |
|------|-------|-------------|
| **USER** | Jeu, Projets, Ressources | Participer, Jouer, Consulter |
| **COACH** | + Dashboard Coach | Voir utilisateurs, Donner feedback |
| **ADMIN** | + Dashboard Admin | Gestion complète des utilisateurs |

---

## Parcours utilisateur

### 1️⃣ **Authentification**

**Login Page** (`/login`)
- Design attrayant avec baobab en fond
- Email/Mot de passe
- Lien "S'inscrire"
- Compte test: `user.fatou@example.com` / `User@123456`

**Inscription** (`/inscription`)
- Formulaire 3 étapes:
  - Étape 1: Infos personnelles (Nom, Prénom, Email, Tel)
  - Étape 2: Infos entreprise (Description du projet)
  - Étape 3: Confirmation
- Page de succès
- Redirection vers dashboard

### 2️⃣ **Dashboard utilisateur** (Après login)

Affiche:
- ✅ Projets en cours (pré-incubation et incubation)
- ✅ Score de maturité par projet
- ✅ Hackathons enregistrés
- ✅ Nombre de feedbacks reçus
- ✅ Liens rapides vers jeu éducatif

### 3️⃣ **Jeu éducatif** (`/jeu-educatif`)

**Parcours de 4 phases:**

**Phase 1: Le Problème** 🎯
- Question: "Quel problème voulez-vous résoudre?"
- Affichage: Champ texte, validations
- Score: 150 points possibles

**Phase 2: La Solution** 💡
- Question: "Comment allez-vous résoudre ce problème?"
- Score: 140 points possibles

**Phase 3: Le Marché** 📊
- Question: "Quelle est la taille de votre marché?"
- Score: 135 points possibles

**Phase 4: L'Équipe** 👥
- Question: "Qui est dans votre équipe?"
- Score: 130 points possibles

**Résultat final:**
- Score total (0-555)
- Score de maturité (%) basé sur la qualité des réponses
- Résumé du projet en une phrase

### 4️⃣ **Mes Projets** (`/mes-projets`)

Affiche tous les projets de l'utilisateur:
- **Projets pré-incubation** (jeu éducatif)
- **Projets incubation** (projets formels)

Pour chaque projet:
- Titre, Description
- Score de maturité
- Statut (en cours/terminé)
- Feedbacks reçus (nombre)
- Date de création

### 5️⃣ **Ressources** (`/ressources`)

**Page principale** - Hub éducatif avec:
- 🔍 **Barre de recherche** en temps réel
- 📂 **8 catégories** de ressources:
  - 📋 Guides Généraux
  - 🚀 Lancement du Projet
  - 💼 Business Model
  - 🎤 Pitch & Présentation
  - 💰 Financement & Budget
  - 📊 Métriques & Données
  - 🌐 Marketing & Distribution
  - ⚙️ Outils Recommandés
- 📊 **Grille de cartes** (3 colonnes responsive)
- ⭐ **Bouton sauvegarder** sur chaque ressource

**Détail d'une ressource** (`/ressources/[id]`)
- Titre, Image large
- Catégorie, Niveau (Débutant/Intermédiaire/Avancé), Durée
- Contenu complet (texte, images, liens)
- Auteur/Source, Date de publication
- ⭐ Bouton sauvegarder
- 🔗 Ressources connexes suggérées
- Navigation (Précédent/Suivant)

### 6️⃣ **Hackathons** (`/hackathons`)

Affiche:
- Liste des hackathons à venir
- Pour chaque hackathon:
  - Titre, Image
  - Dates (début/fin)
  - Description, Dotation
  - Nombre de places
  - Bouton "S'inscrire"

---

## Parcours coach

### 📊 Dashboard Coach (`/coach`)

**Vue principale - Deux panneaux:**

**Panneau gauche: Liste des utilisateurs**
- Tableau avec recherche/filtrage
- Colonnes: Nom, Email, Tel, Nombre de projets
- Clic sur utilisateur → voir détails

**Panneau droit: Projets et feedback**

Affiche deux types de projets:

**1. Projets incubation** (Formels)
- Liste avec: Nom, Statut, Date création
- Pour chaque projet:
  - Description, Feedbacks reçus
  - Formulaire pour ajouter feedback:
    - Catégorie (Produit, Marché, Business, Équipe, Autre)
    - Priorité (Basse, Moyenne, Haute)
    - Texte du feedback
    - Bouton "Envoyer"

**2. Projets pré-incubation** (Jeu éducatif)
- Liste des projets complétés au jeu
- Affichage: Score, Résumé du projet
- 📋 **Section "Résumé du projet"** avec tous les détails:
  - Problème identifié
  - Solution proposée
  - Marché visé
  - Composition de l'équipe
- Possibilité d'ajouter feedback aussi

**Compte coach test:** `coach.marie@ismincubateur.sn` / `Coach@123456`

---

## Parcours admin

### 👨‍💼 Dashboard Admin (`/admin`)

**Vue principale - Deux panneaux:**

**Panneau gauche: Gestion des utilisateurs**
- Tableau de tous les utilisateurs
- Colonnes: Nom, Email, Rôle, Projets, Actif
- Actions:
  - Changer le rôle (USER → COACH → ADMIN)
  - Désactiver/Réactiver un compte
  - Voir les détails

**Panneau droit: Détails utilisateur**
- Infos personnelles complètes
- Liste de ses projets (incubation + pré-incubation)
- Pour chaque projet:
  - Détails complets
  - Feedbacks reçus
  - Score de maturité
- Boutons d'actions (Promouvoir, Désactiver, etc.)

**Compte admin test:** `admin@ismincubateur.sn` / `Admin@123456`

---

## La page Ressources

### 🎯 Objectif
Fournir un **hub centralisé d'apprentissage** pour que les entrepreneurs développent rapidement leurs compétences.

### 📚 Contenu (24 ressources)

**📋 Guides Généraux** (3 ressources)
- 10 Étapes pour Lancer Votre Startup
- Le Guide Complet du Business Plan
- Mentalité Entrepreneuriale: 7 Qualités Clés

**🚀 Lancement du Projet** (3 ressources)
- MVP: Définir Votre Produit Minimum Viable
- Go-to-Market Strategy
- De l'Idée au Produit: 6 Mois Accélérés

**💼 Business Model** (3 ressources)
- Canvas Business Model Expliqué
- Modèles de Revenu
- Scaling Your Business Model

**🎤 Pitch & Présentation** (3 ressources)
- Créer un Pitch Deck Gagnant
- L'Art de Pitcher aux Investisseurs
- Storytelling pour Entrepreneurs

**💰 Financement & Budget** (3 ressources)
- Financer Votre Startup: Toutes les Options
- Budgetisation pour Startups
- Négocier avec les Investisseurs

**📊 Métriques & Données** (3 ressources)
- KPIs Essentiels
- Analytics: Mesurer Votre Succès
- Unit Economics

**🌐 Marketing & Distribution** (3 ressources)
- Marketing Digital pour Startups
- Growth Hacking
- Distribution Strategy

**⚙️ Outils Recommandés** (5 ressources)
- Figma, Notion, Lean Canvas
- Google Analytics, Hotjar

### ✨ Caractéristiques principales

1. **Accessibilité**
   - Visible pour User, Coach, Admin
   - Pas de restriction d'accès

2. **Recherche & Filtrage**
   - Barre de recherche en temps réel
   - Filtrage par catégorie
   - Filtrage par niveau de difficulté

3. **Sauvegarde personnelle**
   - ⭐ Bouton "Sauvegarder" sur chaque ressource
   - Page "Mes ressources sauvegardées"
   - Accès rapide aux favoris

4. **Design intuitif**
   - Cartes visuelles attrayantes
   - Images/icônes pour chaque catégorie
   - Responsive mobile/tablet/desktop

---

## Points clés à mettre en avant

### 🎯 Valeur proposée

1. **Parcours d'apprentissage complet**
   - Du débutant à l'expert
   - Ludique (jeu éducatif)
   - Guidé par des coaches

2. **Communauté & Networking**
   - Hackathons réguliers
   - Interaction avec coaches
   - Partage d'expériences

3. **Outils pratiques**
   - Ressources curatées
   - Business Model Canvas
   - Tracking du progrès

4. **Écosystème intégré**
   - Jeu + Coaching + Ressources + Hackathons
   - Tous les outils en un seul endroit

### 💪 Points forts techniques

- ✅ **Architecture scalable** (Next.js 16 + Prisma)
- ✅ **Design System cohérent** (Tailwind CSS 4)
- ✅ **Animations fluides** (Framer Motion)
- ✅ **Performance optimisée** (Image optimization, lazy loading)
- ✅ **Responsive 100%** (Mobile-first)
- ✅ **Authentification sécurisée** (JWT, httpOnly cookies)
- ✅ **Role-based access control** (RBAC)

---

## Démo live - Scénarios

### 📝 Scénario 1: Nouvel utilisateur (5 min)

**Étape 1:** Accueil et inscription
- Afficher page d'accueil (`/`)
- Montrer les sections clés
- Cliquer "S'inscrire"

**Étape 2:** Inscription en 3 étapes
- Remplir infos personnelles
- Décrire son projet brièvement
- Confirmer

**Étape 3:** Dashboard utilisateur
- Montrer les projets
- Stats hackathons
- Liens rapides

**Démo:**
```bash
Email: test@example.com
Password: Test@123456
```

---

### 🎮 Scénario 2: Jeu éducatif (7 min)

**Chemin:** Dashboard → Jeu Éducatif ou `/jeu-educatif`

**Étapes:**
1. Cliquer "Commencer le jeu"
2. Phase 1: Répondre "Quel problème?"
   - Ex: "Manque d'accès à internet en zone rurale"
3. Phase 2: Répondre "Comment le résoudre?"
   - Ex: "Offrir internet haut débit via satellite"
4. Phase 3: Répondre "Marché?"
   - Ex: "2 millions de personnes au Sénégal"
4. Phase 4: Répondre "Équipe?"
   - Ex: "3 co-fondateurs: Dev, Business, Ops"
5. Afficher résultat:
   - Score total
   - Score de maturité (%)
   - Résumé du projet

**Points à mettre en avant:**
- Ludique et engageant
- Génère automatiquement le résumé du projet
- Score de maturité basé sur la qualité des réponses

---

### 📚 Scénario 3: Page Ressources (5 min)

**Chemin:** `/ressources`

**Étapes:**
1. Afficher la page
   - Hero section
   - Barre de recherche
   - 8 catégories

2. Montrer le filtrage
   - Cliquer sur une catégorie (ex: "💼 Business")
   - Afficher les ressources filtrées

3. Cliquer sur une ressource
   - Afficher détail complet
   - Montrer contenu, auteur, durée
   - Cliquer ⭐ "Sauvegarder"
   - Notification: "Ressource sauvegardée"

4. Montrer "Mes ressources sauvegardées"
   - Accéder via menu ou lien
   - Afficher les favoris

**Points à mettre en avant:**
- Contenu riche et curatés
- 24+ ressources pour tous les niveaux
- Facilité d'accès et de sauvegarde

---

### 👨‍🏫 Scénario 4: Coach dashboard (8 min)

**Compte:** `coach.marie@ismincubateur.sn` / `Coach@123456`

**Chemin:** Login → Coach Dashboard (`/coach`)

**Étapes:**
1. Afficher la liste des utilisateurs
   - Rechercher un utilisateur
   - Montrer le tableau complet

2. Cliquer sur un utilisateur
   - Afficher ses projets (incubation + pré-incubation)
   - Montrer 📋 "Résumé du projet" du jeu

3. Ajouter un feedback
   - Sélectionner catégorie (Produit)
   - Priorité (Moyenne)
   - Écrire un feedback constructif
   - Cliquer "Envoyer"
   - Notification de succès

4. Montrer l'historique des feedbacks

**Points à mettre en avant:**
- Vue complète de tous les utilisateurs
- Accès facile aux projets
- Interface intuitive pour le coaching
- Feedback structuré et utile

---

### 👨‍💼 Scénario 5: Admin dashboard (8 min)

**Compte:** `admin@ismincubateur.sn` / `Admin@123456`

**Chemin:** Login → Admin Dashboard (`/admin`)

**Étapes:**
1. Afficher la liste des utilisateurs
   - Tableau complet avec tous les rôles
   - Filtrage par rôle

2. Promouvoir un utilisateur
   - Cliquer "Voir détails" sur un USER
   - Cliquer sur dropdown "Rôle"
   - Changer USER → COACH
   - Confirmation et notification

3. Désactiver un compte
   - Cliquer bouton "Désactiver"
   - Utilisateur marqué comme inactif

4. Voir les projets d'un utilisateur
   - Afficher tous ses projets
   - Détails complets avec feedbacks

**Points à mettre en avant:**
- Gestion centralisée des utilisateurs
- Promotion de roles facile
- Suivi complet de tous les projets
- Outil puissant pour l'administration

---

## Questions/Réponses anticipées

### ❓ **"Pourquoi un jeu éducatif?"**
✅ **Réponse:** 
- Rend l'apprentissage ludique et engageant
- Force les entrepreneurs à structurer leur pensée
- Génère automatiquement les documents clés (résumé du projet)
- Score de maturité objective basée sur la qualité des réponses

---

### ❓ **"Comment les coaches donnent du feedback?"**
✅ **Réponse:**
- Interface simple dans le dashboard coach
- Feedback structuré (catégorie, priorité, texte)
- Historique complet des feedbacks
- Les utilisateurs peuvent voir les feedbacks reçus

---

### ❓ **"Les ressources sont-elles mises à jour?"**
✅ **Réponse:**
- 24 ressources initiales couvrent les 8 thèmes clés
- Admin peut ajouter/modifier/supprimer des ressources
- Système de brouillon/publication pour contrôle de qualité
- Ressources sauvegardables pour accès ultérieur

---

### ❓ **"Comment mesurer le progrès?"**
✅ **Réponse:**
- Score de maturité du projet (% basé sur réponses)
- Score total au jeu éducatif (0-555)
- Feedbacks reçus des coaches
- Projets complétés en incubation
- Participation aux hackathons

---

### ❓ **"Peut-on intégrer d'autres outils?"**
✅ **Réponse:**
- Architecture modulaire et scalable
- API RESTful pour intégrations futures
- Possibilité d'ajouter:
  - Vidéos pour ressources
  - Webinaires en direct
  - Mentoring one-to-one
  - CRM pour gestion des investisseurs

---

### ❓ **"Comment ça fonctionne techniquement?"**
✅ **Réponse:**
- **Frontend:** Next.js 16 + React + TypeScript
- **Backend:** API routes Next.js + Prisma ORM
- **BDD:** SQLite (dev) → PostgreSQL (prod)
- **Auth:** JWT + httpOnly cookies
- **Styling:** Tailwind CSS 4 + Framer Motion
- **Déploiement:** Vercel (optimal pour Next.js)

---

## 🎬 Ordre de présentation recommandé

1. **Accueil** (1 min)
   - Montrer la page d'accueil
   - Expliquer la vision

2. **Ressources** (3 min)
   - Montrer le hub complet
   - Filterung et recherche
   - Sauvegarde

3. **Jeu Éducatif** (4 min)
   - Parcourir un projet complet
   - Montrer le score et le résumé

4. **Dashboard Coach** (4 min)
   - Voir les utilisateurs
   - Ajouter un feedback
   - Voir le résumé du projet

5. **Dashboard Admin** (3 min)
   - Promouvoir un utilisateur
   - Voir tous les projets
   - Montrer le contrôle

6. **Conclure** (1 min)
   - Récapituler les points clés
   - Questions?

**Total: ~16 minutes de démo**

---

## 📱 Accès rapide

| Page | URL | Role | Description |
|------|-----|------|-------------|
| Accueil | `/` | Public | Page d'accueil |
| Login | `/login` | Public | Authentification |
| Inscription | `/inscription` | Public | Créer un compte |
| Ressources | `/ressources` | All | Hub éducatif |
| Jeu Éducatif | `/jeu-educatif` | User+ | Parcours 4 phases |
| Mes Projets | `/mes-projets` | User | Gestion projets |
| Dashboard Coach | `/coach` | Coach+ | Vue coach |
| Dashboard Admin | `/admin` | Admin | Vue admin |
| Hackathons | `/hackathons` | All | Compétitions |

---

## 🚀 Lancer la démo

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

**Comptes de test:**
- **Admin:** admin@ismincubateur.sn / Admin@123456
- **Coach:** coach.marie@ismincubateur.sn / Coach@123456
- **User:** user.fatou@example.com / User@123456

---

## 📞 Notes supplémentaires

- Les données sont pré-remplies avec des exemples réalistes
- Toutes les interactions fonctionnent et sont fonctionnelles
- Le design est responsive et testé sur mobile
- Les animations sont fluides et professionnelles
- Le système est prêt pour la scalabilité future

**Bon courage pour votre présentation! 🎉**

