import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash the user's password
  const password = 'StrongPassword123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add a user with the 'admin' role
  await prisma.user.upsert({
    where: { email: 'admin1@example.com' },
    update: {},
    create: {
      email: 'admin13@example.com',
      isActive: true,
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      gender: 'Other',
      dob: new Date('1990-01-01'),
      address: '123 Admin St.',
      state: 'Admin State',
      country: 'Nigeria',
    },
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
