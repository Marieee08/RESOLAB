/*
  Warnings:

  - You are about to drop the column `Email` on the `AccInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `AccInfo` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Machine` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `AccInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `AccInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `AccInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `AccInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Desc` to the `Machine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Image` to the `Machine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Machine` to the `Machine` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AccInfo_Email_key";

-- AlterTable
ALTER TABLE "AccInfo" DROP COLUMN "Email",
DROP COLUMN "Password",
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Machine" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "videoUrl",
ADD COLUMN     "Desc" TEXT NOT NULL,
ADD COLUMN     "Image" TEXT NOT NULL,
ADD COLUMN     "Link" TEXT,
ADD COLUMN     "Machine" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AccInfo_clerkId_key" ON "AccInfo"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "AccInfo_email_key" ON "AccInfo"("email");
