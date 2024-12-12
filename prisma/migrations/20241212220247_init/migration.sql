-- AlterTable
ALTER TABLE "BusinessInfo" ADD COLUMN "Bulk" TEXT;
ALTER TABLE "BusinessInfo" ADD COLUMN "Manufactured" TEXT;
ALTER TABLE "BusinessInfo" ADD COLUMN "ProductionFrequency" TEXT;

-- AlterTable
ALTER TABLE "UtilReq" ADD COLUMN "PaymentDate" DATETIME;
ALTER TABLE "UtilReq" ADD COLUMN "ReceiptNumber" TEXT;
