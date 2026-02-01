# Déploiement sur Vercel - ISM Incubateur

## 🚀 Étapes de Déploiement

### 1. Préparation
- ✅ Code pushé sur GitHub (branche `main`)
- ✅ Build vérifié localement (`npm run build`)
- ✅ Fichiers de configuration créés (`vercel.json`, `.vercelignore`)

### 2. Déploiement sur Vercel

#### Option A: Via l'interface Vercel (Recommandé)

1. **Aller sur Vercel**
   - Visitez: https://vercel.com
   - Connectez-vous avec votre compte GitHub

2. **Nouveau Projet**
   - Cliquez sur "Add New Project"
   - Sélectionnez le repository: `argi00/hack`
   - Cliquez sur "Import"

3. **Configuration du Projet**
   ```
   Project Name: ism-incubateur (ou votre choix)
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build (détecté automatiquement)
   Output Directory: .next (détecté automatiquement)
   Install Command: npm install (détecté automatiquement)
   ```

4. **Variables d'Environnement** (Important!)
   Ajoutez ces variables dans la section "Environment Variables":
   
   ```
   DATABASE_URL=file:./prisma/dev.db
   SESSION_SECRET=your-super-secret-key-change-this-in-production
   ```

   **Note**: Pour la production, utilisez une vraie base de données (PostgreSQL, MySQL, etc.)

5. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes

6. **Post-Déploiement**
   Une fois déployé, vous devez initialiser la base de données:
   - Dans le dashboard Vercel, allez dans "Settings" > "Functions"
   - Ou utilisez Vercel CLI pour exécuter les migrations

#### Option B: Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ou directement en production
vercel --prod
```

### 3. Configuration Post-Déploiement

#### Migrations Prisma
Après le premier déploiement, exécutez:

```bash
# Via Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

#### Ou ajoutez un script de build:
Dans `package.json`, modifiez:
```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

### 4. Base de Données en Production

**⚠️ Important**: SQLite n'est pas recommandé pour la production sur Vercel.

#### Options recommandées:

**Option 1: Vercel Postgres (Recommandé)**
```bash
# Installer le package Vercel Postgres
npm install @vercel/postgres
```

Puis dans Vercel Dashboard:
- Storage > Create Database > Postgres
- Copiez le `DATABASE_URL` généré
- Ajoutez-le aux variables d'environnement

**Option 2: Supabase (Gratuit)**
1. Créez un compte sur https://supabase.com
2. Créez un nouveau projet
3. Copiez la connection string PostgreSQL
4. Ajoutez-la comme `DATABASE_URL` dans Vercel

**Option 3: PlanetScale (MySQL)**
1. Créez un compte sur https://planetscale.com
2. Créez une database
3. Obtenez la connection string
4. Utilisez-la comme `DATABASE_URL`

Puis modifiez `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // ou "mysql" selon votre choix
  url      = env("DATABASE_URL")
}
```

### 5. Vérification

Après déploiement, testez:
- ✅ Page d'accueil: https://votre-app.vercel.app
- ✅ Inscription: https://votre-app.vercel.app/inscription
- ✅ Login: https://votre-app.vercel.app/login
- ✅ Ressources: https://votre-app.vercel.app/ressources
- ✅ Contact: https://votre-app.vercel.app/contact

### 6. Domaine Personnalisé (Optionnel)

Dans Vercel Dashboard:
1. Settings > Domains
2. Ajoutez votre domaine
3. Suivez les instructions DNS

### 7. CI/CD Automatique

✅ **Déjà configuré!** 
Chaque push sur `main` déclenchera automatiquement un nouveau déploiement.

### 8. Monitoring

Vercel fournit automatiquement:
- 📊 Analytics
- 🐛 Error tracking
- 📈 Performance metrics
- 📝 Build logs

Accédez-y via le dashboard Vercel.

## 🔧 Dépannage

### Erreur: "Module not found"
```bash
# Vérifiez que toutes les dépendances sont dans package.json
npm install
```

### Erreur: "Database connection failed"
- Vérifiez que `DATABASE_URL` est bien défini
- Pour la production, utilisez PostgreSQL/MySQL au lieu de SQLite

### Erreur: "Build failed"
- Vérifiez les logs dans Vercel Dashboard
- Testez localement: `npm run build`

### Erreur: "Prisma Client not generated"
- Ajoutez `prisma generate` dans le build command
- Ou utilisez le script `vercel-build`

## 📞 Support

- Documentation Vercel: https://vercel.com/docs
- Documentation Next.js: https://nextjs.org/docs
- Documentation Prisma: https://www.prisma.io/docs

## ✅ Checklist Finale

- [ ] Code pushé sur GitHub
- [ ] Variables d'environnement configurées
- [ ] Base de données choisie (PostgreSQL recommandé)
- [ ] Migrations exécutées
- [ ] Seeds de données chargés (optionnel)
- [ ] Tests effectués sur l'URL de production
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] Analytics activés
- [ ] Monitoring en place

🎉 **Votre application est maintenant live!**
