import dotenv from 'dotenv';
import { logger, encryptPassword } from '../src/helpers';
import prisma from '../src/prisma_client';

// Cargar variables de entorno
dotenv.config();

async function main() {
  logger.info('Starting database seed...');

  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD) {
    throw new Error(
      'ADMIN_USER and ADMIN_PASSWORD must be set in environment variables',
    );
  }

  // Crear el rol administrador si no existe
  const adminRole = await prisma.rol.upsert({
    where: { rol: 'admin' },
    update: {},
    create: {
      rol: 'admin',
      title: 'Administrador',
    },
  });

  logger.info('Admin role created/verified');

  const username = process.env.ADMIN_USER;
  // Hashear la contraseña del usuario administrador
  const passwordHash = await encryptPassword(process.env.ADMIN_PASSWORD);

  // Crear el usuario administrador si no existe
  const adminUser = await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      fullname: 'Administrador',
      username,
      passwordHash,
    },
  });

  logger.info('Admin user created/verified');

  // Crear la relación UserRol si no existe
  await prisma.userRol.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      rolId: adminRole.id,
    },
  });

  logger.info(`Admin user-role relationship created/verified`);

  logger.info('Database seed completed successfully!');
}

main()
  .catch((e) => {
    logger.error(`Error during database seed: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
