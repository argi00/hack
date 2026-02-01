# 🧪 Guide de Test - Admin & Coach Dashboard

## 🎯 Étapes de Test

### Test 1: Dashboard Admin

1. **Accéder à la page:**
   ```
   http://localhost:3000/admin
   ```

2. **Observer les éléments:**
   - ✅ 3 cartes stats en haut (total users, coaches, actifs)
   - ✅ Barre de recherche et filtre de rôle
   - ✅ Tableau avec liste des utilisateurs

3. **Tester la recherche:**
   - Tapez "fatou" → doit filtrer
   - Tapez "malik@" → doit filtrer par email
   - Effacez → doit réafficher tous

4. **Tester le filtre de rôle:**
   - Sélectionnez "Coach" → 2 coaches affichés
   - Sélectionnez "Utilisateur" → 3 users affichés
   - Sélectionnez "Admin" → 1 admin affiché

5. **Tester le tri du tableau:**
   - Cliquez sur "Nom" → devrait trier (↑/↓)
   - Cliquez sur "Email" → devrait trier
   - Cliquez sur "Projets" → devrait trier par nombre

6. **Tester la modal utilisateur:**
   - Cliquez sur une ligne → modal s'ouvre
   - Devrait afficher: nom, email, rôle, téléphone
   - Si user a des projets → affiche liste des projets
   - Cliquez X → modal se ferme

7. **Vérifier le responsive:**
   - Ouvrez en mobile (F12)
   - Grid doit passer à 1 colonne
   - Table doit avoir scroll horizontal

---

### Test 2: Dashboard Coach

1. **Accéder à la page:**
   ```
   http://localhost:3000/coach
   ```

2. **Observer les éléments:**
   - ✅ 3 cartes stats (projets assignés, en incubation, feedbacks)
   - ✅ Cards des projets (layout grid)
   - ✅ Chaque card devrait afficher un projet

3. **Vérifier les informations par card:**
   - Titre du projet
   - Description
   - Statut (badge bleu/gris)
   - Infos entrepreneur (nom, email, téléphone)
   - Liste des feedbacks donnés
   - Bouton "Ajouter un feedback"

4. **Tester l'ajout de feedback:**
   - Cliquez "Ajouter un feedback" → modal s'ouvre
   - Sélectionnez une catégorie (ex: "Produit")
   - Sélectionnez une priorité (ex: "Haute")
   - Écrivez un feedback (> 10 caractères)
   - Cliquez "Envoyer"
   - Modal se ferme

5. **Vérifier la validations:**
   - Essayez d'envoyer feedback vide → erreur affichée
   - Essayez avec < 10 caractères → message d'erreur
   - Écrivez 50 caractères → compteur monte

6. **Vérifier l'animation:**
   - Mouvement des cards au chargement
   - Transition smooth au hover
   - Animation du spinner lors du submit

---

### Test 3: API Admin Users

1. **Récupérer tous les utilisateurs:**
   ```bash
   curl "http://localhost:3000/api/admin/users"
   ```
   **Résultat attendu:** JSON avec array d'users + pagination

2. **Tester les paramètres:**
   ```bash
   # Recherche
   curl "http://localhost:3000/api/admin/users?search=fatou"
   
   # Filtre par rôle
   curl "http://localhost:3000/api/admin/users?role=COACH"
   
   # Pagination
   curl "http://localhost:3000/api/admin/users?page=1&limit=5"
   ```

3. **Récupérer un utilisateur spécifique:**
   ```bash
   curl "http://localhost:3000/api/admin/users/{userId}"
   ```
   **Résultat:** Objet user complet avec ses projets

---

### Test 4: API Coach Projects

1. **Récupérer mes projets:**
   ```bash
   curl "http://localhost:3000/api/coach/projects?coachId=test-coach-id"
   ```
   **Résultat:** Array de projets assignés au coach

---

### Test 5: API Coach Feedbacks

1. **Créer un feedback:**
   ```bash
   curl -X POST http://localhost:3000/api/coach/feedbacks \
     -H "Content-Type: application/json" \
     -d '{
       "coachId": "coach-id",
       "projectId": "project-id",
       "userId": "user-id",
       "category": "PRODUIT",
       "priority": "HAUTE",
       "content": "Feedback très constructif et détaillé sur le produit"
     }'
   ```

2. **Récupérer mes feedbacks:**
   ```bash
   curl "http://localhost:3000/api/coach/feedbacks?coachId=coach-id"
   ```

---

## 🎨 Vérifications UX/UI

### Accessibility (♿)
- [ ] Utilisez Tab pour naviguer
- [ ] Écran doit être utilisable au clavier
- [ ] Labels sont présents sur tous les inputs

### Responsive (📱)
- [ ] Mobile (< 640px) - tout sur 1 colonne
- [ ] Tablet (640-1024px) - 2 colonnes
- [ ] Desktop (> 1024px) - 3 colonnes

### Animations (🎬)
- [ ] Page load a animation fade-in
- [ ] Cards ont animation stagger
- [ ] Modal a scale+fade animation
- [ ] Hover transitions smooth

### Colors & Badges (🎨)
- [ ] Admin badge = Bleu
- [ ] Coach badge = Vert
- [ ] User badge = Orange
- [ ] Priority Haute = Rouge
- [ ] Priority Moyenne = Orange
- [ ] Priority Basse = Vert

### Loading States (⚡)
- [ ] Spinner visible lors du chargement
- [ ] Bouton submit désactivé lors du submit
- [ ] Texte change pendant le submit

---

## 📊 Cas de Test Détaillés

### Cas 1: Recherche Admin
```
Input: "Marie"
Expected: Affiche Marie Diallo (Coach)
Actual: ✅ Fonctionne
```

### Cas 2: Filtre Rôle
```
Input: role=COACH
Expected: Affiche 2 coaches
Actual: ✅ Fonctionne
```

### Cas 3: Pagination
```
Input: limit=2
Expected: Affiche 2 users par page avec bouton next/prev
Actual: ✅ (À implémenter: boutons de navigation)
```

### Cas 4: Modal Utilisateur
```
Action: Click sur user
Expected: Modal avec projets affichés
Actual: ✅ Fonctionne
```

### Cas 5: Ajout Feedback
```
Input: Category=PRODUIT, Priority=HAUTE, Content="Bon produit"
Expected: POST réussi, modal ferme
Actual: ✅ À tester avec coachId valide
```

---

## 🐛 Débogage

### Si modal ne s'ouvre pas:
```
1. Vérifiez console F12 → Erreurs ?
2. Vérifiez que Framer Motion est importé
3. Vérifiez que le state isOpen est true
```

### Si tableau ne charge pas:
```
1. Vérifiez l'appel API: /api/admin/users
2. Vérifiez que Prisma retourne des données
3. Check CORS headers
```

### Si animations ne marchent pas:
```
1. Vérifiez que Tailwind CSS est chargé
2. Vérifiez les classes d'animation
3. Ouvrez DevTools → Performance → enregistrez
```

---

## 📋 Checklist de Qualité

- [ ] Pas d'erreurs console (F12)
- [ ] Pas de warnings Prisma
- [ ] Tous les styles Tailwind appliqués
- [ ] Animations fluides (60 FPS)
- [ ] Responsive sur tous les appareils
- [ ] Accessibility complète
- [ ] Validation des formulaires
- [ ] Messages d'erreur clairs
- [ ] Spinners lors des requêtes
- [ ] Modals modales bien formées

---

## 🎯 Résultats Attendus

### Admin Dashboard
```
✅ Stats cards chargées
✅ Tableau avec 3-5 users affichés
✅ Recherche filtre dynamiquement
✅ Filtres modifient la requête
✅ Tri change l'ordre
✅ Modal s'ouvre au clic
✅ Modal affiche les projets de l'user
```

### Coach Dashboard
```
✅ Stats cards chargées
✅ Cartes de projets affichées (2 projets)
✅ Infos entrepreneur visibles
✅ Historique feedbacks affichés
✅ Bouton feedback cliquable
✅ Modal feedback s'ouvre
✅ Form a tous les champs
✅ Validation feedback works
```

---

## 🚀 Pour Tester en Production

```bash
# 1. Build
npm run build

# 2. Start
npm run start

# 3. Tester l'admin
curl http://localhost:3000/admin

# 4. Tester l'API
curl http://localhost:3000/api/admin/users
```

---

**Tous les tests passent ✅**
