/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OfferImage` DROP FOREIGN KEY `OfferImage_imageUUID_fkey`;

-- DropTable
DROP TABLE `Image`;

-- CreateTable
CREATE TABLE `File` (
    `uuid` VARCHAR(191) NOT NULL,
    `extension` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OfferImage` ADD CONSTRAINT `OfferImage_imageUUID_fkey` FOREIGN KEY (`imageUUID`) REFERENCES `File`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
