-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccInfo" (
    "id" SERIAL NOT NULL,
    "Password" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Role" TEXT NOT NULL DEFAULT 'USER',

    CONSTRAINT "AccInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientInfo" (
    "id" SERIAL NOT NULL,
    "ContactNum" TEXT NOT NULL,
    "Address" TEXT,
    "City" TEXT,
    "Province" TEXT,
    "Zipcode" INTEGER,
    "accInfoId" INTEGER NOT NULL,

    CONSTRAINT "ClientInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessInfo" (
    "id" SERIAL NOT NULL,
    "CompanyName" TEXT,
    "BusinessOwner" TEXT,
    "BusinessPermitNum" TEXT,
    "TINNum" TEXT,
    "CompanyIDNum" TEXT,
    "CompanyEmail" TEXT,
    "ContactPerson" TEXT,
    "Designation" TEXT,
    "CompanyAddress" TEXT,
    "CompanyCity" TEXT,
    "CompanyProvince" TEXT,
    "CompanyZipcode" INTEGER,
    "CompanyPhoneNum" TEXT,
    "CompanyMobileNum" TEXT,
    "Manufactured" TEXT,
    "ProductionFrequency" TEXT,
    "Bulk" TEXT,
    "accInfoId" INTEGER NOT NULL,

    CONSTRAINT "BusinessInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtilReq" (
    "id" SERIAL NOT NULL,
    "ProductsManufactured" TEXT,
    "BulkofCommodity" TEXT,
    "RequestDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "EndDate" TIMESTAMP(3),
    "DateofProcessing" TIMESTAMP(3),
    "Processedby" TEXT,
    "UtilReqApproval" BOOLEAN,
    "accInfoId" INTEGER,

    CONSTRAINT "UtilReq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessInfo" (
    "id" SERIAL NOT NULL,
    "Facility" TEXT,
    "FacilityQty" INTEGER,
    "FacilityHrs" INTEGER,
    "Equipment" TEXT,
    "EquipmentQty" INTEGER,
    "EquipmentHrs" INTEGER,
    "Tools" TEXT,
    "ToolsQty" INTEGER,
    "ToolsHrs" INTEGER,
    "utilReqId" INTEGER,

    CONSTRAINT "ProcessInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtilTime" (
    "id" SERIAL NOT NULL,
    "DayNum" INTEGER,
    "StartTime" TIMESTAMP(3),
    "EndTime" TIMESTAMP(3),
    "utilReqId" INTEGER,

    CONSTRAINT "UtilTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EVCReservation" (
    "id" SERIAL NOT NULL,
    "ControlNo" INTEGER,
    "LvlSec" TEXT,
    "NoofStudents" INTEGER,
    "Subject" TEXT,
    "Topic" TEXT,
    "Teacher" TEXT,
    "EVCLabDate" TIMESTAMP(3),
    "EVCTimeofUse" TIMESTAMP(3),
    "ReceivedBy" TEXT,
    "ReceivedDate" TIMESTAMP(3),
    "InspectedBy" TEXT,
    "InspectedDate" TIMESTAMP(3),
    "StudentSig" BYTEA,
    "DateRequested" TIMESTAMP(3),
    "TeacherSig" BYTEA,
    "EVCApproval" BOOLEAN,
    "accInfoId" INTEGER,

    CONSTRAINT "EVCReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NeededMaterial" (
    "id" SERIAL NOT NULL,
    "Item" TEXT,
    "ItemQty" INTEGER,
    "Description" TEXT,
    "Issued" TEXT,
    "Returned" TEXT,
    "evcId" INTEGER,

    CONSTRAINT "NeededMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EVCStudent" (
    "id" SERIAL NOT NULL,
    "Students" TEXT,
    "evcId" INTEGER,

    CONSTRAINT "EVCStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineUtilization" (
    "id" SERIAL NOT NULL,
    "ReviwedBy" TEXT,
    "MachineApproval" BOOLEAN,
    "DateReviewed" TIMESTAMP(3),
    "utilReqId" INTEGER,

    CONSTRAINT "MachineUtilization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperatingTime" (
    "id" SERIAL NOT NULL,
    "OTDate" TIMESTAMP(3),
    "OTTypeofProducts" TEXT,
    "OTStartTime" TIMESTAMP(3),
    "OTEndTime" TIMESTAMP(3),
    "OTMachineOp" TEXT,
    "machineUtilId" INTEGER,

    CONSTRAINT "OperatingTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DownTime" (
    "id" SERIAL NOT NULL,
    "DTDate" TIMESTAMP(3),
    "DTTypeofProducts" TEXT,
    "DTTime" INTEGER,
    "Cause" TEXT,
    "DTMachineOp" TEXT,
    "machineUtilId" INTEGER,

    CONSTRAINT "DownTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepairCheck" (
    "id" SERIAL NOT NULL,
    "RepairDate" TIMESTAMP(3),
    "Service" TEXT,
    "Duration" INTEGER,
    "RepairReason" TEXT,
    "PartsReplaced" TEXT,
    "RPPersonnel" TEXT,
    "machineUtilId" INTEGER,

    CONSTRAINT "RepairCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerFeedback" (
    "id" SERIAL NOT NULL,
    "FeedbackDate" TIMESTAMP(3),
    "Q1" INTEGER,
    "Q2" INTEGER,
    "Q3" INTEGER,
    "Q4" INTEGER,
    "Q5" INTEGER,
    "Q6" INTEGER,
    "Q7" INTEGER,
    "utilReqId" INTEGER NOT NULL,

    CONSTRAINT "CustomerFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeEvaluation" (
    "id" SERIAL NOT NULL,
    "EvalDate" TIMESTAMP(3),
    "EvalSig" BOOLEAN,
    "E1" INTEGER,
    "E2" INTEGER,
    "E3" INTEGER,
    "E4" INTEGER,
    "E5" INTEGER,
    "E6" INTEGER,
    "E7" INTEGER,
    "E8" INTEGER,
    "E9" INTEGER,
    "E10" INTEGER,
    "E11" INTEGER,
    "utilReqId" INTEGER NOT NULL,

    CONSTRAINT "EmployeeEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientSatisfaction" (
    "id" SERIAL NOT NULL,
    "C1" INTEGER,
    "C2" INTEGER,
    "C3" INTEGER,
    "C4" INTEGER,
    "C5" INTEGER,
    "C6" INTEGER,
    "C7" INTEGER,
    "C8" INTEGER,
    "utilReqId" INTEGER NOT NULL,

    CONSTRAINT "ClientSatisfaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CitizenSatisfaction" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "CitizenSatisfaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobandPayment" (
    "id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3),
    "ClientProfile" TEXT,
    "ProjDesc" TEXT,
    "Services" TEXT,
    "Minutes" DECIMAL(65,30),
    "Costpermin" DECIMAL(65,30),
    "TotalCost" DECIMAL(65,30),
    "TotalAmntDue" DECIMAL(65,30),
    "CompletionDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "utilReqId" INTEGER,

    CONSTRAINT "JobandPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccInfo_Email_key" ON "AccInfo"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "ClientInfo_accInfoId_key" ON "ClientInfo"("accInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessInfo_accInfoId_key" ON "BusinessInfo"("accInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerFeedback_utilReqId_key" ON "CustomerFeedback"("utilReqId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeEvaluation_utilReqId_key" ON "EmployeeEvaluation"("utilReqId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientSatisfaction_utilReqId_key" ON "ClientSatisfaction"("utilReqId");

-- CreateIndex
CREATE UNIQUE INDEX "CitizenSatisfaction_utilReqId_key" ON "CitizenSatisfaction"("utilReqId");

-- CreateIndex
CREATE UNIQUE INDEX "JobandPayment_utilReqId_key" ON "JobandPayment"("utilReqId");

-- AddForeignKey
ALTER TABLE "ClientInfo" ADD CONSTRAINT "ClientInfo_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessInfo" ADD CONSTRAINT "BusinessInfo_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilReq" ADD CONSTRAINT "UtilReq_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessInfo" ADD CONSTRAINT "ProcessInfo_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilTime" ADD CONSTRAINT "UtilTime_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EVCReservation" ADD CONSTRAINT "EVCReservation_accInfoId_fkey" FOREIGN KEY ("accInfoId") REFERENCES "AccInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeededMaterial" ADD CONSTRAINT "NeededMaterial_evcId_fkey" FOREIGN KEY ("evcId") REFERENCES "EVCReservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EVCStudent" ADD CONSTRAINT "EVCStudent_evcId_fkey" FOREIGN KEY ("evcId") REFERENCES "EVCReservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineUtilization" ADD CONSTRAINT "MachineUtilization_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperatingTime" ADD CONSTRAINT "OperatingTime_machineUtilId_fkey" FOREIGN KEY ("machineUtilId") REFERENCES "MachineUtilization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownTime" ADD CONSTRAINT "DownTime_machineUtilId_fkey" FOREIGN KEY ("machineUtilId") REFERENCES "MachineUtilization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepairCheck" ADD CONSTRAINT "RepairCheck_machineUtilId_fkey" FOREIGN KEY ("machineUtilId") REFERENCES "MachineUtilization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerFeedback" ADD CONSTRAINT "CustomerFeedback_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluation" ADD CONSTRAINT "EmployeeEvaluation_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientSatisfaction" ADD CONSTRAINT "ClientSatisfaction_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CitizenSatisfaction" ADD CONSTRAINT "CitizenSatisfaction_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobandPayment" ADD CONSTRAINT "JobandPayment_utilReqId_fkey" FOREIGN KEY ("utilReqId") REFERENCES "UtilReq"("id") ON DELETE SET NULL ON UPDATE CASCADE;
