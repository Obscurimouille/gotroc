/*
  Warnings:

  - The primary key for the `OfferImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `extension` on the `OfferImage` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `OfferImage` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `OfferImage` table. All the data in the column will be lost.
  - Added the required column `id` to the `OfferImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUUID` to the `OfferImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OfferImage` DROP PRIMARY KEY,
    DROP COLUMN `extension`,
    DROP COLUMN `position`,
    DROP COLUMN `uuid`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `imageUUID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Image` (
    `uuid` VARCHAR(191) NOT NULL,
    `extension` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
