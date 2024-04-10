/*
  Warnings:

  - You are about to drop the column `firstnme` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `firstnme`,
    ADD COLUMN `firstname` VARCHAR(191) NULL;
