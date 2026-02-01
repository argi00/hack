# 🎯 Quick Start - Tests Immédiats

## 5 Minutes pour Tester

### 1️⃣ Serveur Lancé? ✓
```bash
npm run dev
# http://localhost:3000 devrait marcher
```

### 2️⃣ Admin Dashboard (30 sec)
```
URL: http://localhost:3000/admin
Email: admin@ismincubateur.sn
MDP: Admin@123456

✅ Voir:
- 3 cartes stats (bleu/vert/orange)
- Tableau avec 6 users
- Recherche en haut
- Filtre par rôle
- Cliquez sur un user → modal
```

### 3️⃣ Coach Dashboard (30 sec)
```
URL: http://localhost:3000/coach
Email: coach.marie@ismincubateur.sn
MDP: Coach@123456

✅ Voir:
- 3 cartes stats
- 1 carte projet (TechLocal)
- 1 feedback existant
- Bouton "Ajouter un feedback"
- Cliquez bouton → modal formulaire
```

### 4️⃣ Test Feedback (1 min)
```
En tant que Coach:
1. Cliquez "Ajouter un feedback"
2. Choisissez catégorie (ex: "Produit")
3. Choisissez priorité (ex: "Haute")
4. Écrivez 20 caractères minimum
5. Cliquez "Envoyer feedback"
6. ✅ Modal ferme = succès!
```

### 5️⃣ Test Admin Filtre (1 min)
```
En tant qu'Admin:
1. Tapez "marie" dans recherche
2. → Affiche uniquement Marie Diallo
3. Sélectionnez "Coach" dans filtre
4. → Affiche 2 coaches
5. Cliquez sur un coach → modal
6. ✅ Modal montre ses infos!
```

---

## 🚨 Si quelque chose ne marche pas:

### Admin page blanche?
```bash
# Vérifier la console F12
# Vérifier l'API: http://localhost:3000/api/admin/users
# Si erreur: redémarrer npm run dev
```

### Coach page blanche?
```bash
# Même chose, vérifier F12
# Vérifier: http://localhost:3000/api/coach/projects
```

### Modal ne s'ouvre pas?
```bash
# Vérifier console F12 pour erreurs JavaScript
# Vérifier que Framer Motion est chargé
# Rafraîchir la page (Ctrl+Shift+R)
```

### Données manquantes?
```bash
# Relancer le seed:
npx tsx scripts/seed.ts
```

---

## 📱 Responsive Test (1 min)

```
1. F12 → Mode téléphone
2. Tablet (768px)
   ✅ Doit être 2 colonnes
3. Mobile (375px)
   ✅ Doit être 1 colonne
4. Table doit avoir scroll horizontal
```

---

## 📊 À Voir Absolument

### ✨ Design UX/UI
- 🎨 Couleurs cohérentes (admin bleu, coach vert, user orange)
- ✨ Animations smooth au chargement
- 🎯 Badges bien visibles
- 📱 Responsive perfect

### ⚡ Interactions
- 🔍 Recherche en temps réel
- 📌 Filtres qui changent les données
- 🎬 Modals avec animations
- 🔄 Loading spinners

### 💪 Données
- 👥 6 comptes de test complets
- 📦 2 projets avec feedbacks
- 🔗 Relations correctes (user→projet→feedback)

---

## 🎓 Ce Qui a Été Créé

### 📁 Fichiers Clés
```
app/admin/page.tsx          ← Dashboard Admin
app/coach/page.tsx          ← Dashboard Coach
components/ui/*.tsx         ← 6 composants
app/api/admin/*.ts          ← 2 routes API
app/api/coach/*.ts          ← 2 routes API
scripts/seed.ts             ← Données test
```

### 🗄️ Base de Données
- User avec rôles (USER, COACH, ADMIN)
- Coach (lié à User)
- Project (lié à User)
- CoachProject (Many-to-Many)
- Feedback (lié à Coach, Project, User)

### 📚 Documentation
- USER_STORIES_ADMIN_COACH.md (9 stories)
- ADMIN_COACH_DEMO.md (guide démo)
- IMPLEMENTATION_SUMMARY.md (résumé tech)
- TEST_GUIDE.md (guide testing)

---

## 🎯 Points Clés à Vérifier

✅ **Admin peut:**
- [ ] Voir tous les utilisateurs
- [ ] Rechercher par nom/email
- [ ] Filtrer par rôle
- [ ] Voir détails utilisateur
- [ ] Voir les projets de l'utilisateur

✅ **Coach peut:**
- [ ] Voir ses projets mentorés
- [ ] Voir les infos entrepreneurs
- [ ] Ajouter un feedback
- [ ] Voir historique feedbacks

✅ **Design:**
- [ ] Responsive mobile/tablet/desktop
- [ ] Animations fluides
- [ ] Couleurs cohérentes
- [ ] Badges visibles
- [ ] Modals propres

---

## 🚀 Prêt pour Démo?

**OUI! ✅**

Le système est:
- ✅ Complètement fonctionnel
- ✅ Avec données de test réalistes
- ✅ Avec design UX/UI professionnel
- ✅ Avec animations fluides
- ✅ Entièrement documenté
- ✅ Versionné en Git

---

## 💡 Rappel des Comptes

| Rôle | Email | MDP |
|------|-------|-----|
| Admin | admin@ismincubateur.sn | Admin@123456 |
| Coach 1 | coach.marie@ismincubateur.sn | Coach@123456 |
| Coach 2 | coach.clement@ismincubateur.sn | Coach@123456 |

---

**C'est parti pour la démo! 🎉**
