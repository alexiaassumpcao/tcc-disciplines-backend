/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Discipline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Preference` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTI_OPTION', 'ONE_OPTION');

-- CreateEnum
CREATE TYPE "Rate" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');

-- CreateTable
CREATE TABLE "PreferenceQuestion" (
    "id" TEXT NOT NULL,
    "text" VARCHAR NOT NULL,
    "uniqueName" VARCHAR NOT NULL,
    "options" JSONB NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "rate" "Rate" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PreferenceQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferencesSelected" (
    "id" TEXT NOT NULL,
    "studentId" VARCHAR NOT NULL,
    "total" INTEGER NOT NULL,
    "recommended" INTEGER NOT NULL,
    "personal" INTEGER NOT NULL,
    "percentageOfCorrect" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PreferencesSelected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problems" (
    "id" TEXT NOT NULL,
    "text" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplinesSelected" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DisciplinesSelected_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PreferenceQuestion_uniqueName_key" ON "PreferenceQuestion"("uniqueName");

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_code_key" ON "Discipline"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_name_key" ON "Preference"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Student_code_key" ON "Student"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
