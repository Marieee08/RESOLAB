-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "machineId" TEXT;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
