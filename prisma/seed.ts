import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default facilities
  const defaultFacilities = [
    { name: 'Wi-Fi', isDefault: true },
    { name: 'Parking', isDefault: true },
    { name: 'Laundry', isDefault: true },
    { name: 'Security', isDefault: true },
    { name: 'Common Room', isDefault: true },
  ];

  for (const facility of defaultFacilities) {
    await prisma.facility.upsert({
      where: { name: facility.name },
      update: {},
      create: facility,
    });
  }

  console.log('Default facilities have been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });