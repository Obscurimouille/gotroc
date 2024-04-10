/*
  Warnings:

  - The primary key for the `MainCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MainCategory` table. All the data in the column will be lost.
  - You are about to drop the column `subCategoryId` on the `Offer` table. All the data in the column will be lost.
  - The primary key for the `SubCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the column `mainCategoryId` on the `SubCategory` table. All the data in the column will be lost.
  - Added the required column `subCategoryName` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainCategoryName` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Offer` DROP FOREIGN KEY `Offer_subCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `SubCategory` DROP FOREIGN KEY `SubCategory_mainCategoryId_fkey`;

-- DropIndex
DROP INDEX `MainCategory_name_key` ON `MainCategory`;

-- DropIndex
DROP INDEX `SubCategory_name_key` ON `SubCategory`;

-- AlterTable
ALTER TABLE `MainCategory` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `Offer` DROP COLUMN `subCategoryId`,
    ADD COLUMN `subCategoryName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SubCategory` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `mainCategoryId`,
    ADD COLUMN `mainCategoryName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`name`);

-- AddForeignKey
ALTER TABLE `SubCategory` ADD CONSTRAINT `SubCategory_mainCategoryName_fkey` FOREIGN KEY (`mainCategoryName`) REFERENCES `MainCategory`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_subCategoryName_fkey` FOREIGN KEY (`subCategoryName`) REFERENCES `SubCategory`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
