-- AlterTable
ALTER TABLE `application` ADD COLUMN `paymentStatus` VARCHAR(191) NOT NULL DEFAULT 'pending',
    ADD COLUMN `stripePaymentId` VARCHAR(191) NULL;
