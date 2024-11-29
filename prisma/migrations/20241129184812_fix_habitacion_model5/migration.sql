/*
  Warnings:

  - The primary key for the `Habitacion` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Habitacion" DROP CONSTRAINT "Habitacion_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Habitacion_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Habitacion_id_seq";
