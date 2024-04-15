/*
  Warnings:

  - Added the required column `position` to the `OfferImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OfferImage` ADD COLUMN `position` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `OfferImage` ADD CONSTRAINT `OfferImage_imageUUID_fkey` FOREIGN KEY (`imageUUID`) REFERENCES `Image`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
