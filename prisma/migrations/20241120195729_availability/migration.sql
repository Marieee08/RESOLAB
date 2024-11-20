/*
  Warnings:

  - You are about to drop the column `EquipmentHrs` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `EquipmentQty` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Facility` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `FacilityHrs` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `FacilityQty` on the `ProcessInfo` table. All the data in the column will be lost.
  - You are about to drop the column `ToolsHrs` on the `ProcessInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ProcessInfo" DROP COLUMN "EquipmentHrs",
DROP COLUMN "EquipmentQty",
DROP COLUMN "Facility",
DROP COLUMN "FacilityHrs",
DROP COLUMN "FacilityQty",
DROP COLUMN "ToolsHrs";
