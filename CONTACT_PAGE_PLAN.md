# 📞 Plan - Page Contact ISM Incubateur

## 🎯 Objectif
Créer une page de contact complète permettant aux entrepreneurs de prendre contact avec l'ISM pour :
- Questions générales
- Inscription/Support
- Feedback
- Partenariats

---

## 📋 Structure de la page

### 1. HERO SECTION
```
Titre: "Nous Sommes Là Pour Vous"
Sous-titre: "Contactez l'ISM Incubateur pour toute question ou demande de partenariat"
Icône: 📞
Fond: Gradient avec baobab
```

### 2. INFORMATIONS DE CONTACT (3 colonnes)

#### 📍 Localisation
- **Siège Social**
  - Adresse: Dakar, Sénégal
  - Pays: Sénégal
  - Région: Île de Gorée (ou autre localisation)

#### 📞 Téléphone
- Numéro principal: +221 33 XX XX XX
- Support utilisateurs: +221 33 XX XX XX
- Partenariats: +221 33 XX XX XX

#### ✉️ Email
- Email général: contact@ismincubateur.sn
- Support technique: support@ismincubateur.sn
- Partenariats: partenaires@ismincubateur.sn
- Feedback: feedback@ismincubateur.sn

#### 🕐 Horaires
- Lundi - Vendredi: 08:00 - 18:00 (Heure d'Afrique de l'Ouest)
- Samedi: 09:00 - 13:00
- Dimanche: Fermé
- Jours fériés: Fermé

---

## 3. FORMULAIRE DE CONTACT (2 colonnes)

### Colonne 1: Formulaire
```
Champs:
├─ Prénom (text, obligatoire)
├─ Nom (text, obligatoire)
├─ Email (email, obligatoire)
├─ Téléphone (tel, optionnel)
├─ Type de demande (dropdown, obligatoire):
│  ├─ Question générale
│  ├─ Support technique
│  ├─ Inscription/Participation
│  ├─ Feedback
│  ├─ Partenariat
│  └─ Autre
├─ Objet (text, obligatoire, min 10 caractères)
├─ Message (textarea, obligatoire, min 50 caractères)
├─ Accepte les conditions (checkbox, obligatoire)
└─ Boutons:
   ├─ Envoyer (bg-[#FF6600])
   └─ Réinitialiser

Validation:
• Tous les champs requis
• Email valide
• Message min 50 caractères
• Message max 2000 caractères
```

### Colonne 2: Carte & Infos
```
🗺️ CARTE GOOGLE MAPS
├─ Localisation ISM Dakar
├─ Markerclickable pour afficher l'adresse complète
└─ Lien "Ouvrir dans Google Maps"

📋 INFORMATIONS COMPLÉMENTAIRES
├─ "Heures de réponse"
│  └─ Généralement sous 24h
├─ "Préférez un appel?"
│  └─ Cliquez sur les numéros pour appeler
├─ "Suivez-nous"
│  └─ Icônes réseaux sociaux
│     ├─ LinkedIn
│     ├─ Twitter/X
│     ├─ Facebook
│     └─ Instagram
└─ "FAQ"
   └─ Lien vers page FAQ (/faq)
```

---

## 4. SECTIONS SUPPLÉMENTAIRES

### 4.1 ÉQUIPE PRINCIPALE (Optionnel)
```
Affiche les membres clés de l'équipe:

Colonne 1: Directeur Général
├─ Avatar (placeholder)
├─ Nom: [Nom du DG]
├─ Poste: Directeur Général
├─ Email: [email]
└─ Lien LinkedIn

Colonne 2: Responsable Incubation
├─ Avatar (placeholder)
├─ Nom: [Nom]
├─ Poste: Responsable Programme Incubation
├─ Email: [email]
└─ Lien LinkedIn

Colonne 3: Responsable Coaching
├─ Avatar (placeholder)
├─ Nom: [Nom]
├─ Poste: Responsable Coaching & Mentoring
├─ Email: [email]
└─ Lien LinkedIn
```

### 4.2 RÉSEAUX SOCIAUX
```
🌐 SUIVEZ-NOUS

LinkedIn: [Lien vers page LinkedIn]
Twitter/X: [Lien vers compte]
Facebook: [Lien vers page]
Instagram: [Lien vers compte]
YouTube: [Lien vers chaîne]
```

### 4.3 FAQ RAPIDE
```
Questions fréquentes:
├─ "Quel est le délai de réponse?"
│  └─ Généralement 24h pendant les jours ouvrables
├─ "Comment s'inscrire?"
│  └─ Cliquez sur "S'inscrire" en haut du site
├─ "Y a-t-il des frais?"
│  └─ Non, le programme est gratuit
├─ "Quels projets acceptez-vous?"
│  └─ Tout projet innovant au Sénégal
└─ "Voir plus de questions →" (lien vers /faq)
```

---

## 5. TRAITEMENT DU FORMULAIRE

### Backend API Route
```
POST /api/contact
├─ Validation des données
├─ Vérification honeypot (spam protection)
├─ Envoi email de confirmation (utilisateur)
├─ Envoi email ISM (contact@ismincubateur.sn)
└─ Réponse JSON
   ├─ {"success": true, "message": "Message envoyé"}
   └─ {"success": false, "message": "Erreur..."}
```

### Données stockées
```
Modèle ContactSubmission (Prisma):
├─ id
├─ firstName
├─ lastName
├─ email
├─ phone (optionnel)
├─ type (générale, technique, etc)
├─ subject
├─ message
├─ status (nouveau, lu, en_cours, résolu)
├─ response (réponse de l'équipe ISM)
├─ createdAt
└─ updatedAt
```

### Emails
```
EMAIL 1 - Confirmation utilisateur:
Sujet: "✓ Votre message a été reçu"
Corps:
  "Bonjour [Prénom],
   
   Merci pour votre message. 
   Nous l'avons bien reçu et vous répondrons sous 24h.
   
   Référence: [ID]
   Date: [Date]
   Type de demande: [Type]
   
   Cordialement,
   Équipe ISM Incubateur"

EMAIL 2 - Notification équipe ISM:
Sujet: "📩 Nouveau message de contact: [Nom]"
Corps:
  "Nouveau message de contact reçu
  
  Nom: [Prénom Nom]
  Email: [Email]
  Téléphone: [Téléphone]
  Type: [Type]
  Objet: [Objet]
  
  Message:
  [Message]
  
  Lien pour répondre: [Lien admin]"
```

---

## 6. DESIGN & STYLES

### Couleurs
```
Primaire: #FF6600 (Orange ISM)
Secondaire: #704214 (Marron Baobab)
Accent: #E8F5E9 (Vert clair)
Fond: #F5EDE3 (Beige clair)
Texte: #2C2C2C
```

### Composants
```
Formulaire:
├─ Input: Border #E0E0E0, focus #FF6600
├─ Textarea: Même style que inputs
├─ Dropdown: Style standard
├─ Bouton Envoyer: 
│  └─ bg-[#FF6600], hover:bg-[#E55A00], px-8 py-3
├─ Bouton Réinitialiser: 
│  └─ bg-gray-200, hover:bg-gray-300, px-8 py-3
└─ Messages validation:
   ├─ Erreur: text-red-600
   └─ Succès: text-green-600
```

### Layout responsive
```
Desktop (1024px+):
├─ 2 colonnes (Formulaire | Carte & Infos)
└─ Sections 4.1-4.3 pleine largeur

Tablet (768px):
├─ 1 colonne (Formulaire)
├─ Puis Carte & Infos
└─ Sections adaptées

Mobile (< 768px):
├─ Tout empilé verticalement
├─ Boutons pleine largeur
└─ Police réduite
```

---

## 7. STRUCTURE DES FICHIERS À CRÉER

```
app/
├─ contact/
│  └─ page.tsx (Page contact)
│
components/
├─ contact/
│  ├─ ContactForm.tsx (Formulaire)
│  ├─ ContactInfo.tsx (Infos + Carte)
│  ├─ TeamSection.tsx (Équipe)
│  └─ ContactHero.tsx (Hero section)
│
app/api/
└─ contact/
   └─ route.ts (Gestion des messages)

lib/
└─ email.ts (Service d'envoi d'emails)
```

---

## 8. INTÉGRATIONS

### Envoi d'emails
```
Service: Nodemailer ou SendGrid
Configuration:
├─ SMTP_HOST: [Configuration serveur]
├─ SMTP_PORT: 587
├─ SMTP_USER: contact@ismincubateur.sn
├─ SMTP_PASSWORD: [Token sécurisé]
└─ Destinataires:
   ├─ contact@ismincubateur.sn
   ├─ support@ismincubateur.sn
   └─ admin@ismincubateur.sn
```

### Google Maps
```
API Key: [Clé Google Maps API]
Localisation ISM:
├─ Latitude: [À déterminer]
├─ Longitude: [À déterminer]
├─ Zoom: 17
└─ Marqueur: "ISM Incubateur"
```

---

## 9. COMPÉTENCES PÉDAGOGIQUES

### Accessibilité
```
✓ Labels avec htmlFor
✓ Attributs ARIA si nécessaire
✓ Focus visible sur inputs
✓ Validation côté client ET serveur
✓ Messages d'erreur clairs
```

### Sécurité
```
✓ Honeypot field (champ caché pour spambots)
✓ Rate limiting (max 5 messages/heure par IP)
✓ CSRF protection via Next.js
✓ Validation rigoureuse des données
✓ Pas de stockage de données sensibles en plain text
```

### Performance
```
✓ Lazy loading de la Google Maps
✓ Optimisation des images
✓ Minification CSS/JS
✓ Cache de 24h pour la page statique
```

---

## 10. CAS D'USAGE

### Utilisateur veut poser une question
```
1. Va sur /contact
2. Voit les infos de contact rapides
3. Remplit le formulaire:
   - Type: "Question générale"
   - Objet: "Comment rejoindre le programme?"
   - Message: Texte de la question
4. Clique "Envoyer"
5. Reçoit email de confirmation
6. Équipe ISM reçoit le message
7. Réponse sous 24h
```

### Startup veut s'inscrire
```
1. Va sur /contact
2. Clique "S'inscrire" (ou utilise formulaire)
3. Type: "Inscription/Participation"
4. Fournit détails du projet
5. Message envoyé
6. Coach de l'ISM le contacte
```

### Partner veut collaborer
```
1. Va sur /contact
2. Type: "Partenariat"
3. Décrit proposition
4. Email automatiquement envoyé à partenaires@ismincubateur.sn
5. Réunion planifiée
```

---

## 11. CONTENU STATIQUE À REMPLIR

**À compléter avec les vraies données ISM:**
- [ ] Adresse complète du siège
- [ ] Numéro de téléphone principal
- [ ] Email de contact principal
- [ ] Horaires d'ouverture exact
- [ ] Noms des membres de l'équipe clé
- [ ] Comptes réseaux sociaux
- [ ] Localisation Google Maps
- [ ] Logo pour email

---

## 12. CTA (CALL TO ACTION)

```
En bas de page:
"🚀 Prêt à rejoindre l'écosystème ISM?"

Boutons:
├─ "S'inscrire maintenant" → /inscription
└─ "Voir les ressources" → /ressources
```

---

## 📅 ROADMAP D'IMPLÉMENTATION

**Phase 1 (Semaine 1):** 
✓ Créer page statique avec infos + formulaire simple

**Phase 2 (Semaine 2):**
✓ Intégrer Google Maps
✓ Créer API backend pour traiter les messages

**Phase 3 (Semaine 3):**
✓ Implémenter système d'emails
✓ Ajouter équipe section
✓ Tests complets

**Phase 4 (Semaine 4):**
✓ Optimisations
✓ Déploiement
✓ Monitoring

