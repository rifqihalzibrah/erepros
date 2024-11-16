-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyId` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `bedrooms` VARCHAR(191) NOT NULL,
    `moveInDate` DATETIME(3) NOT NULL,
    `fee` DOUBLE NOT NULL,
    `transactionMethod` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `ssn` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `licenseId` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `currentAddress` VARCHAR(191) NOT NULL,
    `dateOfMoveIn` DATETIME(3) NOT NULL,
    `rentAmount` DOUBLE NOT NULL,
    `reasonForMoving` VARCHAR(191) NOT NULL,
    `landlordName` VARCHAR(191) NOT NULL,
    `landlordPhone` VARCHAR(191) NOT NULL,
    `employer` VARCHAR(191) NOT NULL,
    `jobTitle` VARCHAR(191) NOT NULL,
    `employerAddress` VARCHAR(191) NOT NULL,
    `contactPhone` VARCHAR(191) NOT NULL,
    `supervisorName` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `income` DOUBLE NOT NULL,
    `assistanceReceived` BOOLEAN NOT NULL,
    `assistanceAmount` DOUBLE NULL,
    `additionalIncome` BOOLEAN NOT NULL,
    `additionalIncomeAmount` DOUBLE NULL,
    `eviction` BOOLEAN NOT NULL,
    `refusedRent` BOOLEAN NOT NULL,
    `refusedRentExplanation` VARCHAR(191) NULL,
    `felony` BOOLEAN NOT NULL,
    `felonyExplanation` VARCHAR(191) NULL,
    `emergencyName` VARCHAR(191) NOT NULL,
    `emergencyPhone` VARCHAR(191) NOT NULL,
    `emergencyRelationship` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Other` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `ssnLast4` VARCHAR(191) NOT NULL,
    `relationship` VARCHAR(191) NOT NULL,
    `applicationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `relationship` VARCHAR(191) NOT NULL,
    `applicationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Other` ADD CONSTRAINT `Other_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reference` ADD CONSTRAINT `Reference_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
