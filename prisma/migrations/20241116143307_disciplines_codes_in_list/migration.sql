/*
  Warnings:

  - The `code` column on the `Discipline` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Discipline_code_key";

-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "code",
ADD COLUMN     "code" TEXT[];
