import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Facultades por defecto
  const faculties = [
    'Ingeniería',
    'Tecnologica',
    'ASAB',
    'Macarena',
    'Vivero',
    'Bosa',
  ];

  for (const name of faculties) {
    const exists = await prisma.faculty.findFirst({
      where: { faculty_name: name },
    });

    if (!exists) {
      await prisma.faculty.create({
        data: { faculty_name: name },
      });
    }
  }

  // Roles por defecto
  const roles = [
    'Admin',
    'Estudiante',
    'Profesor',
    'Invitado',
    'SuperAdmin',
    'Educador',
  ];

  for (const name of roles) {
    const exists = await prisma.rol.findFirst({
      where: { name_rol: name },
    });

    if (!exists) {
      await prisma.rol.create({
        data: { name_rol: name },
      });
    }
  }
}

main()
  .then(async () => {
    console.log('✅ Datos de seed insertados');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error ejecutando seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
