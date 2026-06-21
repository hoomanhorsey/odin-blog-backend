-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSuspended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "suspensionDate" TIMESTAMP(3),
ADD COLUMN     "suspensionReason" TEXT;
