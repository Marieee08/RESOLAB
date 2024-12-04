-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "Tool" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "Service" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
