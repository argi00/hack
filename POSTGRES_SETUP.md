# Configuration PostgreSQL pour Production

## 🎯 Option Recommandée: Vercel Postgres (Gratuit)

### Étape 1: Créer la Base de Données Vercel Postgres

1. **Dans le Dashboard Vercel:**
   - Allez dans votre projet
   - Cliquez sur l'onglet "Storage"
   - Cliquez sur "Create Database"
   - Sélectionnez "Postgres"
   - Région: Choisissez la plus proche (ex: Frankfurt pour l'Europe)
   - Cliquez sur "Create"

2. **Connecter à votre projet:**
   - La base de données sera automatiquement liée
   - Les variables d'environnement seront ajoutées automatiquement

### Étape 2: Configuration Locale

Pour tester en local avec PostgreSQL:

```bash
# Installer PostgreSQL localement (Windows)
# Téléchargez depuis: https://www.postgresql.org/download/windows/

# Ou utilisez Docker
docker run --name ism-postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
```

Créez un fichier `.env.local`:
```env
# Pour développement local avec PostgreSQL
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/ism_incubateur?schema=public"

# Pour développement local avec SQLite (actuel)
# DATABASE_URL="file:./dev.db"

SESSION_SECRET="your-secret-key-here"
```

### Étape 3: Migrations

Une fois la base de données créée:

```bash
# 1. Générer le client Prisma
npx prisma generate

# 2. Créer les tables
npx prisma migrate deploy

# 3. (Optionnel) Charger les données de test
npx prisma db seed
```

### Étape 4: Variables d'Environnement Vercel

Vercel Postgres configure automatiquement ces variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` ← Utilisez celle-ci pour Prisma
- `POSTGRES_URL_NON_POOLING`

Dans Vercel Dashboard > Settings > Environment Variables, ajoutez:
```
DATABASE_URL = ${POSTGRES_PRISMA_URL}
SESSION_SECRET = your-production-secret-key
```

## 🔄 Alternative: Supabase (Gratuit + Plus de fonctionnalités)

### Étape 1: Créer un Projet Supabase

1. Allez sur https://supabase.com
2. Créez un compte (GitHub login)
3. Créez un nouveau projet:
   - Nom: `ism-incubateur`
   - Mot de passe: (notez-le!)
   - Région: `Europe (Frankfurt)` ou la plus proche

### Étape 2: Obtenir la Connection String

Dans Supabase Dashboard:
1. Settings > Database
2. Copiez la "Connection string" (mode: Transaction)
3. Remplacez `[YOUR-PASSWORD]` par votre mot de passe

Exemple:
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

### Étape 3: Configuration

Dans Vercel, ajoutez la variable:
```
DATABASE_URL=votre-connection-string-supabase
SESSION_SECRET=your-secret-key
```

En local (`.env.local`):
```env
DATABASE_URL="votre-connection-string-supabase"
SESSION_SECRET="your-secret-key"
```

### Étape 4: Migrations

```bash
# Pousser le schéma vers Supabase
npx prisma db push

# Ou créer une migration
npx prisma migrate deploy

# Charger les données
npx prisma db seed
```

## 📊 Comparaison des Options

| Critère | Vercel Postgres | Supabase | SQLite (actuel) |
|---------|----------------|----------|-----------------|
| **Prix** | Gratuit (5GB) | Gratuit (500MB) | Gratuit |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Production** | ✅ Oui | ✅ Oui | ❌ Non recommandé |
| **Setup** | Très facile | Facile | Déjà fait |
| **Features** | SQL basique | Auth, Storage, Realtime | Basique |
| **Backup** | Automatique | Automatique | Manuel |

## 🚀 Script de Migration Automatique

J'ai créé un script pour faciliter la migration:

```bash
# Basculer vers PostgreSQL
npm run migrate:postgres

# Revenir à SQLite (dev)
npm run migrate:sqlite
```

## 🔧 Dépannage

### Erreur: "SSL connection required"
Ajoutez à votre `DATABASE_URL`:
```
?sslmode=require
```

### Erreur: "Too many connections"
Utilisez connection pooling:
- Vercel: utilisez `POSTGRES_PRISMA_URL`
- Supabase: utilisez le mode "Transaction" dans la connection string

### Erreur: "Migration failed"
```bash
# Reset complet (⚠️ supprime toutes les données)
npx prisma migrate reset

# Puis
npx prisma migrate deploy
```

## ✅ Checklist

- [ ] Base de données PostgreSQL créée
- [ ] `DATABASE_URL` configurée dans Vercel
- [ ] `SESSION_SECRET` configurée dans Vercel
- [ ] Schema.prisma mis à jour (provider = "postgresql")
- [ ] Migrations exécutées
- [ ] Données de seed chargées
- [ ] Test de connexion réussi
- [ ] Déploiement Vercel réussi

## 🎯 Recommandation Finale

**Pour ce projet, je recommande Vercel Postgres** car:
1. ✅ Intégration native avec Vercel
2. ✅ Configuration automatique des variables
3. ✅ Pas de gestion externe
4. ✅ Backup automatique
5. ✅ Performance optimale

Voulez-vous que je continue avec Vercel Postgres?
