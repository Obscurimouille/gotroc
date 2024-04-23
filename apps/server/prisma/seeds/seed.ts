import { PrismaClient } from '@prisma/client';
import { SeedCategories } from './categories.js';
import { DEFAULT_HASH_SALT, DEFAULT_PASSWORD, SeedUsers } from './users.js';
import { SeedOffers } from './offers.js';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // Generate all categories and subcategories
  for (const [mainCategoryName, subCategoryNames] of Object.entries(SeedCategories)) {
    await prisma.mainCategory.upsert({
      where: { name: mainCategoryName },
      update: {},
      create: {
        name: mainCategoryName,
        subCategories: {
          create: subCategoryNames.map((subCategory) =>
            typeof subCategory === 'string'
              ? { name: subCategory }
              : {
                  name: subCategory.value,
                  illustration: !subCategory.illustration
                    ? undefined
                    : {
                        create: {
                          uuid: subCategory.illustration.uuid,
                          extension: subCategory.illustration.extension,
                        },
                      },
                },
          ),
        },
      },
    });
  }

  // Generate all users and their offers
  const defaultPasswordHash = await bcrypt.hash(DEFAULT_PASSWORD, DEFAULT_HASH_SALT);
  let offerIndex = 0;
  for (const seedUser of SeedUsers) {
    await prisma.user.upsert({
      where: { email: seedUser.email },
      update: {},
      create: {
        username: seedUser.username,
        firstname: seedUser.firstname,
        lastname: seedUser.lastname,
        email: seedUser.email,
        password: defaultPasswordHash,
        isAdmin: seedUser.isAdmin
          ? {
              create: {},
            }
          : {},
        avatar: !seedUser.avatar
          ? undefined
          : {
              create: {
                uuid: seedUser.avatar[0],
                extension: seedUser.avatar[1],
              },
            },
        offers: {
          create: Array.from({ length: seedUser.nbDefaultOffers }).map(() => {
            if (offerIndex >= SeedOffers.length) offerIndex = 0;
            const offer = SeedOffers[offerIndex++];
            return {
              ...offer,
              status: offer.status || 'ACCEPTED',
              ...{
                images: {
                  create: offer.images.map((image: any, index: number) => ({
                    image: {
                      create: {
                        uuid: image.uuid,
                        extension: image.extension,
                      },
                    },
                    position: index + 1,
                  })),
                },
              },
            };
          }),
        },
      },
    });
  }

  // Generate all ratings
  for (const seedUser of SeedUsers) {
    if (seedUser.ratings?.length) {
      for (const rating of seedUser.ratings) {
        await prisma.rating.create({
          data: {
            value: rating.value,
            note: rating.note,
            authorId: (await prisma.user.findUnique({
              where: { username: rating.authorUsername },
            }))!.id,
            targetId: (await prisma.user.findUnique({ where: { email: seedUser.email } }))!.id,
            datetime: rating.date,
          },
        });
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
