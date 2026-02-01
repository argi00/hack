# 👥 Parcours Utilisateurs - ISM Incubateur

## 🟢 PARCOURS USER (Entrepreneur)

### 1. Authentification
```
LOGIN PAGE (/login)
├─ Email: user.fatou@example.com
├─ Password: User@123456
└─ Cliquer "Connexion"

OU

INSCRIPTION PAGE (/inscription)
├─ Étape 1: Nom, Prénom, Email, Tel
├─ Étape 2: Description du projet
├─ Étape 3: Confirmer
└─ Page succès + Redirection Dashboard
```

### 2. Dashboard USER
```
Affiche après connexion:
├─ Welcome message "Bienvenue [Nom]"
├─ 📊 Mes Projets (pré-incubation + incubation)
├─ 🎮 Jeu Éducatif
├─ 🏆 Mes Hackathons enregistrés
├─ 💬 Feedbacks reçus des coaches
└─ Liens rapides vers ressources
```

### 3. Jeu Éducatif (/jeu-educatif)
```
PHASE 1: LE PROBLÈME 🎯
├─ Question: "Quel problème voulez-vous résoudre?"
├─ Input: Champ texte (min. 50 caractères)
└─ Score possible: 150 points

    ↓

PHASE 2: LA SOLUTION 💡
├─ Question: "Comment allez-vous résoudre ce problème?"
├─ Input: Champ texte (min. 50 caractères)
└─ Score possible: 140 points

    ↓

PHASE 3: LE MARCHÉ 📊
├─ Question: "Quelle est la taille de votre marché?"
├─ Input: Champ texte (min. 30 caractères)
└─ Score possible: 135 points

    ↓

PHASE 4: L'ÉQUIPE 👥
├─ Question: "Qui est dans votre équipe?"
├─ Input: Champ texte (min. 30 caractères)
└─ Score possible: 130 points

    ↓

RÉSULTAT FINAL
├─ Score total: 0-555
├─ Score de maturité: 0-100%
├─ Résumé du projet généré automatiquement
└─ Bouton "Sauvegarder" ou "Continuer"
```

### 4. Mes Projets (/mes-projets)
```
LISTE DES PROJETS
├─ Projets Pré-incubation (du jeu)
│  ├─ Titre
│  ├─ Description
│  ├─ Score de maturité %
│  ├─ Date de création
│  └─ Bouton "Voir détails"
│
└─ Projets Incubation (formels)
   ├─ Titre
   ├─ Description
   ├─ Statut (En cours / Terminé)
   ├─ Feedbacks reçus (nombre)
   ├─ Date de création
   └─ Bouton "Voir détails" + "Voir feedbacks"

DÉTAIL DU PROJET
├─ Informations complètes
├─ Historique des feedbacks reçus
│  └─ Pour chaque feedback:
│     ├─ Catégorie (Produit, Marché, Business, etc)
│     ├─ Priorité (Basse, Moyenne, Haute)
│     ├─ Texte du feedback
│     ├─ Coach qui a écrit
│     └─ Date
├─ Score de maturité actuel
└─ Boutons "Partager" ou "Archiver"
```

### 5. Page Ressources (/ressources)
```
HERO SECTION
└─ Titre: "Ressources pour Entrepreneurs"

BARRE DE RECHERCHE
├─ Placeholder: "Chercher une ressource..."
├─ Recherche en temps réel
└─ Bouton X pour effacer

FILTRES PAR CATÉGORIE
├─ Bouton "Tous"
├─ 📋 Guides Généraux
├─ 🚀 Lancement du Projet
├─ 💼 Business Model
├─ 🎤 Pitch & Présentation
├─ 💰 Financement & Budget
├─ 📊 Métriques & Données
├─ 🌐 Marketing & Distribution
└─ ⚙️ Outils Recommandés

GRILLE DE RESSOURCES
└─ Pour chaque ressource:
   ├─ Image/Emoji
   ├─ Catégorie
   ├─ Titre
   ├─ Description (2 lignes)
   ├─ 🏷️ Niveau (Débutant/Intermédiaire/Avancé)
   ├─ ⏱️ Durée (7-20 min)
   ├─ ⭐ Bouton "Sauvegarder"
   └─ Bouton "En Savoir Plus" → Détail
```

### 6. Détail d'une Ressource (/ressources/[id])
```
HEADER
├─ Image grand format
├─ 📋 Catégorie
├─ 🎯 Niveau (Débutant/Intermédiaire/Avancé)
├─ ⏱️ Durée
└─ ⭐ Bouton "Sauvegarder"

CONTENU
├─ Titre
├─ Description
├─ Auteur / Source / Date
├─ Contenu complet
│  ├─ Headings
│  ├─ Paragraphes
│  ├─ Listes
│  ├─ Bold/Italics
│  └─ Liens
├─ Tags (#hashtags)
└─ Notification quand sauvegardée

RESSOURCES CONNEXES
├─ "Vous pourriez aussi aimer:"
├─ 3 ressources suggérées
└─ Cliquer pour naviguer

NAVIGATION
├─ Bouton "← Retour aux ressources"
└─ Boutons "← Précédent" / "Suivant →"
```

### 7. Mes Ressources Sauvegardées
```
PAGE (accessible depuis menu)
├─ Liste de toutes les ressources sauvegardées
├─ Pour chaque ressource:
│  ├─ Titre
│  ├─ Catégorie
│  ├─ Date sauvegardée
│  ├─ Bouton "Voir"
│  └─ Bouton "Supprimer de mes favoris"
└─ Pagination (12 par page)
```

### 8. Hackathons (/hackathons)
```
LISTE DES HACKATHONS
├─ Pour chaque hackathon:
│  ├─ Image
│  ├─ Titre
│  ├─ Dates (début/fin)
│  ├─ Dotation
│  ├─ Description
│  ├─ Places disponibles
│  └─ Bouton "S'inscrire"
│
└─ Hackathons où utilisateur est inscrit:
   └─ Badge "✓ Inscrit"
```

---

## 🔵 PARCOURS COACH

### 1. Authentification
```
LOGIN PAGE (/login)
├─ Email: coach.marie@ismincubateur.sn
├─ Password: Coach@123456
└─ Cliquer "Connexion"
    → Dashboard Coach (/coach)
```

### 2. Dashboard Coach
```
LAYOUT: Deux panneaux

┌─ PANNEAU GAUCHE ──────────────────────┐
│ LISTE DES UTILISATEURS                │
├────────────────────────────────────────┤
│ Tableau avec colonnes:                 │
│ • Nom                                  │
│ • Email                                │
│ • Tel                                  │
│ • Nombre de projets                    │
│ • Statut (Actif/Inactif)              │
│                                        │
│ Actions:                               │
│ • Cliquer sur ligne → Voir détails     │
│ • Rechercher par nom/email             │
│ • Filtrer par statut                   │
└────────────────────────────────────────┘

┌─ PANNEAU DROIT ───────────────────────┐
│ DÉTAILS UTILISATEUR SÉLECTIONNÉ        │
├───────────────────────────────────────┤
│ Infos personnelles:                    │
│ • Nom, Prénom, Email, Tel              │
│ • Date d'inscription                   │
│ • Nombre total de projets              │
│                                        │
│ PROJETS INCUBATION (formels)            │
│ ├─ Liste des projets                   │
│ ├─ Pour chaque projet:                 │
│ │  ├─ Titre, Statut                    │
│ │  ├─ Feedbacks reçus (nombre)         │
│ │  ├─ Date création                    │
│ │  └─ Bouton "Voir"                    │
│ │                                      │
│ │  AJOUTER FEEDBACK                    │
│ │  ├─ Catégorie (dropdown):            │
│ │  │  • Produit                        │
│ │  │  • Marché                         │
│ │  │  • Business                       │
│ │  │  • Équipe                         │
│ │  │  • Autre                          │
│ │  ├─ Priorité (dropdown):             │
│ │  │  • Basse                          │
│ │  │  • Moyenne                        │
│ │  │  • Haute                          │
│ │  ├─ Texte du feedback (textarea)     │
│ │  └─ Bouton "Envoyer"                 │
│ │     → Notification succès            │
│ │                                      │
│ └─ Historique des feedbacks:           │
│    ├─ Tous les feedbacks envoyés       │
│    ├─ Date, Catégorie, Priorité, Texte│
│    └─ Possibilité de voir l'historique │
│                                        │
│ PROJETS PRÉ-INCUBATION (Jeu)           │
│ ├─ Projets complétés au jeu éducatif   │
│ ├─ Pour chaque projet:                 │
│ │  ├─ Titre généré                     │
│ │  ├─ Score de maturité                │
│ │  ├─ 📋 RÉSUMÉ DU PROJET:             │
│ │  │  ├─ Problème: "..."               │
│ │  │  ├─ Solution: "..."               │
│ │  │  ├─ Marché: "..."                 │
│ │  │  └─ Équipe: "..."                 │
│ │  ├─ Date de création                 │
│ │  └─ Bouton "Ajouter feedback"        │
│ │                                      │
│ └─ Ajouter feedback (même formulaire)  │
│    ├─ Catégorie, Priorité, Texte       │
│    └─ Bouton "Envoyer"                 │
│                                        │
└────────────────────────────────────────┘
```

### 3. Flux d'ajout de feedback
```
1. Cliquer "Ajouter feedback" pour un projet
   ↓
2. Modal/Form s'ouvre
   ├─ Catégorie (obligatoire)
   ├─ Priorité (obligatoire)
   └─ Texte (obligatoire, min. 20 caractères)
   ↓
3. Cliquer "Envoyer"
   ↓
4. Notification: "✓ Feedback envoyé avec succès"
   ↓
5. Utilisateur reçoit notification: "💬 Nouveau feedback reçu"
   ↓
6. Feedback apparaît dans l'historique du projet
```

---

## 🔴 PARCOURS ADMIN

### 1. Authentification
```
LOGIN PAGE (/login)
├─ Email: admin@ismincubateur.sn
├─ Password: Admin@123456
└─ Cliquer "Connexion"
    → Dashboard Admin (/admin)
```

### 2. Dashboard Admin
```
LAYOUT: Deux panneaux

┌─ PANNEAU GAUCHE ──────────────────────┐
│ GESTION DES UTILISATEURS               │
├────────────────────────────────────────┤
│ Tableau de tous les utilisateurs:      │
│                                        │
│ Colonnes:                              │
│ • Nom                                  │
│ • Email                                │
│ • Rôle (USER / COACH / ADMIN)          │
│ • Nombre de projets                    │
│ • Statut (Actif ✓ / Inactif ✗)        │
│ • Actions                              │
│                                        │
│ Actions (pour chaque utilisateur):     │
│ • Cliquer sur ligne → Voir détails     │
│ • Dropdown Rôle:                       │
│   └─ Changer USER ↔ COACH ↔ ADMIN      │
│ • Bouton "Désactiver" / "Réactiver"    │
│ • Bouton "Supprimer"                   │
│                                        │
│ Filtres:                               │
│ • Par Rôle (All / USER / COACH / ADMIN)│
│ • Par Statut (All / Actif / Inactif)   │
│ • Recherche (Nom/Email)                │
│ • Pagination                           │
│                                        │
└────────────────────────────────────────┘

┌─ PANNEAU DROIT ───────────────────────┐
│ DÉTAILS UTILISATEUR SÉLECTIONNÉ        │
├───────────────────────────────────────┤
│ INFOS PERSONNELLES                     │
│ ├─ Avatar                              │
│ ├─ Nom, Prénom                         │
│ ├─ Email, Téléphone                    │
│ ├─ Date d'inscription                  │
│ ├─ Rôle actuel                         │
│ ├─ Statut (Actif/Inactif)              │
│ └─ Dernière connexion                  │
│                                        │
│ ACTIONS ADMIN                          │
│ ├─ Dropdown "Changer rôle"             │
│ │  ├─ Promocion USER → COACH            │
│ │  ├─ Promotion COACH → ADMIN           │
│ │  └─ Demotion (inverse)                │
│ │     → Confirmation + Notification     │
│ ├─ Bouton "Désactiver"                 │
│ │  └─ Utilisateur ne peut plus se       │
│ │     connecter (à moins de réactivé)   │
│ ├─ Bouton "Réactiver"                  │
│ │  └─ Permet la reconnexion             │
│ └─ Bouton "Supprimer définitivement"    │
│    └─ Danger: Suppression irréversible  │
│                                        │
│ PROJETS DE L'UTILISATEUR                │
│ ├─ Projets Incubation:                 │
│ │  ├─ Titre, Statut, Feedback count    │
│ │  ├─ Date création                    │
│ │  └─ Bouton "Voir détails"            │
│ │                                      │
│ ├─ Projets Pré-incubation:             │
│ │  ├─ Titre généré                     │
│ │  ├─ Score de maturité                │
│ │  ├─ 📋 RÉSUMÉ COMPLET:               │
│ │  │  ├─ Problème                      │
│ │  │  ├─ Solution                      │
│ │  │  ├─ Marché                        │
│ │  │  └─ Équipe                        │
│ │  └─ Bouton "Voir"                    │
│ │                                      │
│ └─ Historique des feedbacks reçus      │
│                                        │
└────────────────────────────────────────┘
```

### 3. Flux de promotion d'un utilisateur
```
1. Cliquer sur utilisateur dans la liste
   ↓
2. Voir ses détails à droite
   ↓
3. Cliquer sur dropdown "Rôle"
   └─ Options: USER / COACH / ADMIN
   ↓
4. Sélectionner nouveau rôle
   ↓
5. Confirmation popup:
   "Êtes-vous sûr de promouvoir [Nom] de [ANCIEN_ROLE] à [NOUVEAU_ROLE]?"
   ├─ Bouton "Confirmer"
   └─ Bouton "Annuler"
   ↓
6. Notification succès:
   "✓ [Nom] promu de [ANCIEN_ROLE] à [NOUVEAU_ROLE]"
   ↓
7. Liste mise à jour
   ↓
8. Utilisateur reçoit notification:
   "🎉 Vous avez été promu [NOUVEAU_ROLE]"
```

### 4. Flux de désactivation
```
1. Cliquer sur utilisateur
   ↓
2. Cliquer bouton "Désactiver"
   ↓
3. Confirmation:
   "Êtes-vous sûr de désactiver [Nom]?
    Il ne pourra pas se connecter."
   ├─ Bouton "Désactiver"
   └─ Bouton "Annuler"
   ↓
4. Notification: "✓ Utilisateur désactivé"
   ↓
5. Utilisateur voit "Compte désactivé" à la connexion
   ↓
6. (Mais le compte peut être réactivé)
```

---

## 📊 COMPARAISON DES PARCOURS

| Feature | USER | COACH | ADMIN |
|---------|------|-------|-------|
| **Voir ses projets** | ✅ | ❌ | ✅ (tous) |
| **Ajouter feedback** | ❌ | ✅ | ✅ |
| **Voir utilisateurs** | ❌ | ✅ (assignés) | ✅ (tous) |
| **Changer rôles** | ❌ | ❌ | ✅ |
| **Accès ressources** | ✅ | ✅ | ✅ |
| **Jeu éducatif** | ✅ | ❌ | ❌ |
| **Hackathons** | ✅ | ✅ | ✅ |
| **Sauvegarder ressources** | ✅ | ✅ | ✅ |

---

## 🔐 COMPTES DE TEST

```
👤 USER (Entrepreneur)
├─ Email: user.fatou@example.com
├─ Password: User@123456
└─ URL: http://localhost:3000/login

👨‍🏫 COACH (Mentor)
├─ Email: coach.marie@ismincubateur.sn
├─ Password: Coach@123456
└─ URL: http://localhost:3000/coach

👨‍💼 ADMIN (Administrateur)
├─ Email: admin@ismincubateur.sn
├─ Password: Admin@123456
└─ URL: http://localhost:3000/admin
```

---

## ✨ FLUX PRINCIPAL PAR RÔLE

### 🟢 USER
```
LOGIN → DASHBOARD → Choix:
├─ Jouer au jeu éducatif
├─ Voir mes projets
├─ Consulter ressources
├─ Voir feedbacks des coaches
└─ S'inscrire aux hackathons
```

### 🔵 COACH
```
LOGIN → COACH DASHBOARD → Voir utilisateurs:
├─ Sélectionner utilisateur
├─ Voir ses projets (incubation + jeu)
├─ Ajouter feedback(s)
├─ Lire le résumé du projet (jeu)
└─ Suivre la progression
```

### 🔴 ADMIN
```
LOGIN → ADMIN DASHBOARD → Gérer utilisateurs:
├─ Promouvoir COACH → ADMIN
├─ Désactiver/Réactiver comptes
├─ Voir tous les projets
├─ Voir tous les feedbacks
└─ Contrôle total
```

