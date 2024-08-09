import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.findMany();
    for (const u of user) {
      await tx.user.update({
        where: { id: u.id },
        data: {
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          phone: u.phone,
          timezoneCode: u.timezoneCode,
          password: u.password,
          emailVerified: u.emailVerified,
          isAcitve: u.isAcitve,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        },
      });
    }
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
