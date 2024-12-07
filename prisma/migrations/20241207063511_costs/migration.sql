/*
  Warnings:

  - You are about to drop the column `Costs` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "Costs" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "Costs";
