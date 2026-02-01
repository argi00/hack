# 🚀 Déploiement Rapide - ISM Incubateur

## Étape 1: Déployer sur Vercel (2 minutes)

1. **Aller sur** https://vercel.com
2. **Connectez-vous** avec GitHub
3. **Import project** → Sélectionnez `argi00/hack`
4. **Cliquez "Deploy"** (sans rien configurer pour l'instant)

✅ Votre app sera déployée avec SQLite (temporaire)

## Étape 2: Ajouter PostgreSQL (3 minutes)

### Dans le Dashboard Vercel:

1. **Onglet "Storage"** → **"Create Database"** → **"Postgres"**
2. **Région:** `Frankfurt` (ou la plus proche)
3. **Create**

✅ La database sera automatiquement connectée!

## Étape 3: Variables d'Environnement

Dans **Settings → Environment Variables**, ajoutez:

```
SESSION_SECRET = votre-secret-production-ici
```

Les variables PostgreSQL sont ajoutées automatiquement par Vercel:
- ✅ `POSTGRES_URL`
- ✅ `POSTGRES_PRISMA_URL`
- ✅ `POSTGRES_URL_NON_POOLING`

## Étape 4: Redéployer

1. **Deployments** → Dernier déploiement → **"Redeploy"**

Ou simplement faire un nouveau commit:
```bash
git commit --allow-empty -m "trigger redeploy"
git push
```

## Étape 5: Migrations (Important!)

Dans **Settings → Functions**, ou via CLI:

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Exécuter les migrations
vercel env pull .env.production
npx prisma migrate deploy

# (Optionnel) Charger les données de test
npx prisma db seed
```

## ✅ C'est Tout!

Votre app est maintenant en production avec PostgreSQL!

**URL de test:**
- Homepage: https://votre-app.vercel.app
- Login: https://votre-app.vercel.app/login
- Ressources: https://votre-app.vercel.app/ressources

## 🔧 Comptes de Test

Une fois les seeds chargés:

**Admin:**
- Email: `admin@ism.sn`
- Mot de passe: `Admin123!`

**Coach:**
- Email: `coach@ism.sn`
- Mot de passe: `Coach123!`

**Utilisateur:**
- Email: `user@ism.sn`
- Mot de passe: `User123!`

## 📊 Monitoring

Vercel fournit automatiquement:
- 📈 Analytics
- 🐛 Error tracking
- ⚡ Performance metrics

Accédez-y dans le dashboard!

## 🆘 Besoin d'aide?

Voir [POSTGRES_SETUP.md](./POSTGRES_SETUP.md) pour plus de détails.
