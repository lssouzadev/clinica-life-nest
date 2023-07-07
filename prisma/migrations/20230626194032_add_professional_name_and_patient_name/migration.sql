/*
  Warnings:

  - Added the required column `patient_name` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professional_name` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "patient_name" TEXT NOT NULL,
ADD COLUMN     "professional_name" TEXT NOT NULL;
