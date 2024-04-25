/*
  Warnings:

  - Added the required column `requiresCondition` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiresMileage` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Offer` ADD COLUMN `condition` ENUM('NEW', 'EXCELLENT', 'GOOD', 'FAIR', 'DAMAGED') NULL,
    ADD COLUMN `mileage` INTEGER NULL;

-- AlterTable
ALTER TABLE `SubCategory` ADD COLUMN `requiresCondition` BOOLEAN NOT NULL,
    ADD COLUMN `requiresMileage` BOOLEAN NOT NULL;
