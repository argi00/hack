import { createClient } from '@libsql/client';

// Créer le client libSQL
const libsql = createClient({
  url: 'file:./prisma/dev.db',
});

async function main() {
  console.log('Initialisation de la base de données...');
  
  // Exécuter les requêtes SQL pour créer les tables
  await libsql.execute(`
    CREATE TABLE IF NOT EXISTS User (
      id TEXT PRIMARY KEY NOT NULL,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      phone TEXT NOT NULL,
      hasProject INTEGER NOT NULL DEFAULT 0,
      projectDescription TEXT,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('✓ Table User créée avec succès!');
  console.log('✓ Base de données initialisée!');
}

main()
  .catch((e) => {
    console.error('Erreur:', e);
    process.exit(1);
  });
