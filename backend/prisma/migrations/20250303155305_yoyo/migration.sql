-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('THEORY', 'PRACTICAL', 'BOTH');

-- CreateEnum
CREATE TYPE "TeacherAssignmentType" AS ENUM ('THEORY', 'PRACTICAL');

-- CreateEnum
CREATE TYPE "StudentSemesterStatus" AS ENUM ('PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "ArrangementStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "TeacherExamRole" AS ENUM ('INVIGILATOR', 'SUPERVISOR', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "availabilityStatus" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semesters" (
    "id" SERIAL NOT NULL,
    "instituteId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "semesters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Division" (
    "id" SERIAL NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SubjectType" NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DivisionSubject" (
    "id" SERIAL NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "DivisionSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" SERIAL NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DivisionTeacher" (
    "id" SERIAL NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "assignmentType" "TeacherAssignmentType" NOT NULL DEFAULT 'THEORY',

    CONSTRAINT "DivisionTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchTeacher" (
    "id" SERIAL NOT NULL,
    "batchId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "assignmentType" "TeacherAssignmentType" NOT NULL DEFAULT 'PRACTICAL',

    CONSTRAINT "BatchTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentSemester" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "status" "StudentSemesterStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "StudentSemester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentDivision" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "batchId" INTEGER,

    CONSTRAINT "StudentDivision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bench" (
    "id" SERIAL NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "maxSeats" INTEGER NOT NULL,
    "occupiedSeats" INTEGER NOT NULL DEFAULT 0,
    "posX" INTEGER NOT NULL,
    "posY" INTEGER NOT NULL,

    CONSTRAINT "Bench_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSeatingArrangement" (
    "id" SERIAL NOT NULL,
    "examSessionId" INTEGER NOT NULL,
    "benchId" INTEGER NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "status" "ArrangementStatus" NOT NULL DEFAULT 'DRAFT',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamSeatingArrangement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSession" (
    "id" SERIAL NOT NULL,
    "examId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "sessionStart" TIMESTAMP(3) NOT NULL,
    "sessionEnd" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "ExamSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSessionTeacher" (
    "id" SERIAL NOT NULL,
    "examSessionId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "role" "TeacherExamRole" NOT NULL DEFAULT 'INVIGILATOR',

    CONSTRAINT "ExamSessionTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamTeacherArrangement" (
    "id" SERIAL NOT NULL,
    "examSessionId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "posX" INTEGER NOT NULL,
    "posY" INTEGER NOT NULL,
    "status" "ArrangementStatus" NOT NULL DEFAULT 'DRAFT',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamTeacherArrangement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "semesters_name_key" ON "semesters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Division_semesterId_name_key" ON "Division"("semesterId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DivisionSubject_divisionId_subjectId_key" ON "DivisionSubject"("divisionId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Batch_divisionId_name_key" ON "Batch"("divisionId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "DivisionTeacher_divisionId_subjectId_key" ON "DivisionTeacher"("divisionId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "BatchTeacher_batchId_subjectId_key" ON "BatchTeacher"("batchId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_name_key" ON "Classroom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Bench_classroomId_label_key" ON "Bench"("classroomId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "ExamSeatingArrangement_benchId_seatNumber_key" ON "ExamSeatingArrangement"("benchId", "seatNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ExamSeatingArrangement_studentId_key" ON "ExamSeatingArrangement"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamSessionTeacher_examSessionId_teacherId_key" ON "ExamSessionTeacher"("examSessionId", "teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamTeacherArrangement_examSessionId_teacherId_key" ON "ExamTeacherArrangement"("examSessionId", "teacherId");

-- AddForeignKey
ALTER TABLE "semesters" ADD CONSTRAINT "semesters_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Division" ADD CONSTRAINT "Division_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivisionSubject" ADD CONSTRAINT "DivisionSubject_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivisionSubject" ADD CONSTRAINT "DivisionSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivisionTeacher" ADD CONSTRAINT "DivisionTeacher_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivisionTeacher" ADD CONSTRAINT "DivisionTeacher_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DivisionTeacher" ADD CONSTRAINT "DivisionTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchTeacher" ADD CONSTRAINT "BatchTeacher_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchTeacher" ADD CONSTRAINT "BatchTeacher_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchTeacher" ADD CONSTRAINT "BatchTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemester" ADD CONSTRAINT "StudentSemester_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemester" ADD CONSTRAINT "StudentSemester_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDivision" ADD CONSTRAINT "StudentDivision_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDivision" ADD CONSTRAINT "StudentDivision_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDivision" ADD CONSTRAINT "StudentDivision_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bench" ADD CONSTRAINT "Bench_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSeatingArrangement" ADD CONSTRAINT "ExamSeatingArrangement_benchId_fkey" FOREIGN KEY ("benchId") REFERENCES "Bench"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSeatingArrangement" ADD CONSTRAINT "ExamSeatingArrangement_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSeatingArrangement" ADD CONSTRAINT "ExamSeatingArrangement_examSessionId_fkey" FOREIGN KEY ("examSessionId") REFERENCES "ExamSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSession" ADD CONSTRAINT "ExamSession_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSession" ADD CONSTRAINT "ExamSession_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSessionTeacher" ADD CONSTRAINT "ExamSessionTeacher_examSessionId_fkey" FOREIGN KEY ("examSessionId") REFERENCES "ExamSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSessionTeacher" ADD CONSTRAINT "ExamSessionTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamTeacherArrangement" ADD CONSTRAINT "ExamTeacherArrangement_examSessionId_fkey" FOREIGN KEY ("examSessionId") REFERENCES "ExamSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamTeacherArrangement" ADD CONSTRAINT "ExamTeacherArrangement_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
