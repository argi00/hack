# ✅ CHECKLIST DÉPLOIEMENT VERCEL - ISM INCUBATEUR

## 📋 Étapes à Suivre (Dans l'ordre!)

### ✅ 1. Créer le Projet Vercel (2 min)

1. Allez sur https://vercel.com
2. Cliquez "Add New" → "Project"
3. Importez: `argi00/hack`
4. **NE TOUCHEZ À RIEN** → Cliquez "Deploy"
5. Attendez 2-3 minutes

**Résultat:** ✅ App déployée (avec SQLite temporaire)

---

### ✅ 2. Ajouter PostgreSQL (1 min)

Dans le projet Vercel:

1. Cliquez sur l'onglet **"Storage"**
2. **"Create Database"**
3. Sélectionnez **"Postgres"**
4. Région: **"Frankfurt"** (ou Europe West)
5. Nom: `ism-incubateur-db` (ou laissez par défaut)
6. Cliquez **"Create"**

**Résultat:** ✅ Database créée et connectée automatiquement

Vercel ajoute automatiquement ces variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` ✨ (c'est celle-ci qu'on utilise!)
- `POSTGRES_URL_NON_POOLING`

---

### ✅ 3. Configurer les Variables (1 min)

Dans le projet Vercel:

1. **Settings** → **Environment Variables**
2. Ajoutez **UNE SEULE** variable:

| Name | Value |
|------|-------|
| `SESSION_SECRET` | `VotreSuperSecretKey123!ChangezMoi` |

**⚠️ IMPORTANT:** Générez un vrai secret en production:
```bash
openssl rand -base64 32
```

3. Cliquez **"Save"**

**Résultat:** ✅ Variables configurées

---

### ✅ 4. Redéployer (1 min)

Deux options:

**Option A: Via Vercel Dashboard**
1. **Deployments** (onglet)
2. Trouvez le dernier déploiement
3. Cliquez sur les **"..."** → **"Redeploy"**
4. Cochez **"Use existing Build Cache"** → Redeploy

**Option B: Via Git Push**
```bash
git commit --allow-empty -m "redeploy with postgres"
git push
```

**Résultat:** ✅ App redéployée avec PostgreSQL

---

### ✅ 5. Exécuter les Migrations (2 min)

**Option A: Via Vercel CLI (Recommandé)**

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Se connecter
vercel login

# 3. Lier au projet
vercel link

# 4. Télécharger les variables d'environnement
vercel env pull .env.production

# 5. Exécuter les migrations
npx prisma migrate deploy

# 6. (Optionnel) Charger les données de test
npx prisma db seed
```

**Option B: Dans Vercel (Plus complexe)**
1. Ajoutez un fichier `migrate.mjs` à la racine
2. Configurez-le comme une API route
3. Appelez l'endpoint une fois

**Résultat:** ✅ Tables créées et données chargées

---

### ✅ 6. Vérification Finale (1 min)

Testez ces URLs (remplacez par votre domaine):

- ✅ https://votre-app.vercel.app → Homepage
- ✅ https://votre-app.vercel.app/login → Login
- ✅ https://votre-app.vercel.app/inscription → Inscription
- ✅ https://votre-app.vercel.app/ressources → Ressources
- ✅ https://votre-app.vercel.app/contact → Contact

**Testez le login avec:**
- Email: `admin@ism.sn`
- Password: `Admin123!`

**Résultat:** ✅ Tout fonctionne!

---

## 🎯 Résumé Rapide (TL;DR)

```bash
# 1. Deploy sur Vercel
vercel

# 2. Créer Postgres dans Dashboard Vercel
# (Storage → Create → Postgres)

# 3. Ajouter SESSION_SECRET dans Environment Variables

# 4. Migrations
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed

# 5. Redeploy
vercel --prod
```

---

## 🔧 Dépannage

### "Database connection failed"
- Vérifiez que PostgreSQL est bien créé dans Storage
- Les variables `POSTGRES_*` doivent être automatiquement présentes

### "Migration failed"
```bash
# Reset et réessayer
npx prisma migrate reset --skip-seed
npx prisma migrate deploy
npx prisma db seed
```

### "SESSION_SECRET not defined"
- Ajoutez-le dans Settings → Environment Variables
- Redéployez après

### "Build failed"
- Vérifiez les logs dans Vercel Dashboard
- Testez localement: `npm run build`

---

## 📊 Monitoring Post-Déploiement

Dans Vercel Dashboard:

1. **Analytics** → Voir le trafic
2. **Speed Insights** → Performance
3. **Logs** → Erreurs et warnings
4. **Storage → Postgres** → Métriques DB

---

## ✨ Fonctionnalités Bonus

### Domaine Personnalisé
1. Settings → Domains
2. Ajoutez votre domaine
3. Suivez les instructions DNS

### CI/CD Automatique
✅ Déjà configuré! Chaque push sur `main` = redéploiement auto

### Preview Deployments
✅ Chaque PR = URL de preview unique

### Rollback
Si un déploiement pose problème:
1. Deployments → Version précédente
2. "..." → "Promote to Production"

---

## 🎉 C'est Terminé!

Votre plateforme ISM Incubateur est maintenant:
- ✅ Déployée sur Vercel
- ✅ Avec base de données PostgreSQL
- ✅ SSL automatique
- ✅ CI/CD configuré
- ✅ Monitoring actif
- ✅ Prête pour la production!

**URL de production:** Notez-la ici: ___________________________

**Prochaines étapes:**
- [ ] Configurer un domaine personnalisé
- [ ] Activer Vercel Analytics
- [ ] Configurer les emails (notifications)
- [ ] Ajouter du contenu réel
- [ ] Inviter votre équipe

---

📞 **Support:** Si vous avez des questions, consultez:
- [POSTGRES_SETUP.md](./POSTGRES_SETUP.md) - Configuration détaillée
- [DEPLOY.md](./DEPLOY.md) - Guide complet
- Documentation Vercel: https://vercel.com/docs
