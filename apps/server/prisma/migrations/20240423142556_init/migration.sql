-- AlterTable
ALTER TABLE `SubCategory` ADD COLUMN `illustrationUUID` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `SubCategory` ADD CONSTRAINT `SubCategory_illustrationUUID_fkey` FOREIGN KEY (`illustrationUUID`) REFERENCES `File`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
