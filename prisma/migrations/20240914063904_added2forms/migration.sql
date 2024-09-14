-- CreateTable
CREATE TABLE "ClientSatisfaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "C1" INTEGER,
    "C2" INTEGER,
    "C3" INTEGER,
    "C4" INTEGER,
    "C5" INTEGER,
    "C6" INTEGER,
    "C7" INTEGER,
    "C8" INTEGER,
    "utilReqId" INTEGER NOT NULL,
    CONSTRAINT "ClientSatisfaction_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CitizenSatisfaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Sex" TEXT,
    "Age" INTEGER,
    "CC1" INTEGER,
    "CC2" INTEGER,
    "CC3" INTEGER,
    "CC4" INTEGER,
    "CC5" INTEGER,
    "SQD0" INTEGER,
    "SQD1" INTEGER,
    "SQD2" INTEGER,
    "SQD3" INTEGER,
    "SQD4" INTEGER,
    "SQD5" INTEGER,
    "SQD6" INTEGER,
    "SQD7" INTEGER,
    "SQD8" INTEGER,
    "Suggestions" TEXT,
    "utilReqId" INTEGER NOT NULL,
    CONSTRAINT "CitizenSatisfaction_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientSatisfaction_utilReqId_key" ON "ClientSatisfaction"("utilReqId");

-- CreateIndex
CREATE UNIQUE INDEX "CitizenSatisfaction_utilReqId_key" ON "CitizenSatisfaction"("utilReqId");
