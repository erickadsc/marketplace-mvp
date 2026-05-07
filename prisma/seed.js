const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 10);

  const broker = await prisma.user.upsert({
    where: { email: "corretor@demo.com" },
    update: {},
    create: {
      name: "Corretor Demo",
      email: "corretor@demo.com",
      password,
      type: "BROKER",
      score: 5
    }
  });

  const client = await prisma.user.upsert({
    where: { email: "cliente@demo.com" },
    update: {},
    create: {
      name: "Cliente Demo",
      email: "cliente@demo.com",
      password,
      type: "CLIENT",
      score: 5
    }
  });

  const profile = await prisma.searchProfile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: client.id,
      city: "Sao Paulo",
      district: "Pinheiros",
      minPrice: 2500,
      maxPrice: 4500,
      bedrooms: 2,
      bathrooms: 2,
      parkingSpots: 1
    }
  });

  await prisma.proposal.upsert({
    where: { id: 1 },
    update: {},
    create: {
      brokerId: broker.id,
      profileId: profile.id,
      propertyLink: "https://exemplo.com/imovel/123",
      price: 3900,
      note: "Apartamento reformado a 10 minutos do metro.",
      availabilityConfirmed: true,
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000)
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
