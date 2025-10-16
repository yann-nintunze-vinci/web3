/*
  Warnings:

  - Added the required column `amount` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN "amount" DOUBLE PRECISION NOT NULL DEFAULT 10,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
