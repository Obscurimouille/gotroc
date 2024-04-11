-- CreateTable
CREATE TABLE `OfferImage` (
    `uuid` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `extension` VARCHAR(191) NOT NULL,
    `offerId` INTEGER NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OfferImage` ADD CONSTRAINT `OfferImage_offerId_fkey` FOREIGN KEY (`offerId`) REFERENCES `Offer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
