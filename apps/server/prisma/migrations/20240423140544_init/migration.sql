-- DropForeignKey
ALTER TABLE `OfferImage` DROP FOREIGN KEY `OfferImage_offerId_fkey`;

-- AddForeignKey
ALTER TABLE `OfferImage` ADD CONSTRAINT `OfferImage_offerId_fkey` FOREIGN KEY (`offerId`) REFERENCES `Offer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
