import { prisma } from '../lib/prisma';

async function main() {
  console.log('Test de connexion Prisma...\n');
  
  // Compter les utilisateurs
  const count = await prisma.user.count();
  console.log(`✓ Connexion réussie!`);
  console.log(`✓ Nombre d'utilisateurs: ${count}`);
  
  // Vous pouvez créer un utilisateur de test (décommentez si besoin)
  /*
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: 'hash_example',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+221 77 123 45 67',
      hasProject: false,
    },
  });
  console.log('\n✓ Utilisateur de test créé:', testUser);
  */
}

main()
  .catch((e) => {
    console.error('Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
