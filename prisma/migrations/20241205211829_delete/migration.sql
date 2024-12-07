-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_machineId_fkey";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
