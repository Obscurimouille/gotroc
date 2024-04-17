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
          create: subCategoryNames.map((name) => ({ name })),
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
        avatar: !seedUser.avatar ? undefined : {
          create: {
            uuid: seedUser.avatar[0],
            extension: seedUser.avatar[1],
          }
        },
        offers: {
          create: Array.from({ length: seedUser.nbDefaultOffers }).map(() => {
            if (offerIndex >= SeedOffers.length) offerIndex = 0;
            const offer = SeedOffers[offerIndex++];
            return {
              ...offer,
              ...{
                images: {
                  create: offer.images.map((image: any, index: number) => ({
                    image: {
                      create: {
                        uuid: image.uuid,
                        extension: image.extension,
                      }
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
