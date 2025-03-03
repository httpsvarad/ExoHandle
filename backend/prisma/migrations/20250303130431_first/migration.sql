-- CreateTable
CREATE TABLE "institutes" (
    "id" SERIAL NOT NULL,
    "createdBy" UUID NOT NULL,
    "access" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "noOfClassRooms" INTEGER NOT NULL,
    "noOfStudents" INTEGER NOT NULL,
    "noOfTeachers" INTEGER NOT NULL,
    "noOfSemesters" INTEGER NOT NULL,
    "noOfBenches" INTEGER NOT NULL,

    CONSTRAINT "institutes_pkey" PRIMARY KEY ("id")
);
