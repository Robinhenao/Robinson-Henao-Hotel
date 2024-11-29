/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "Habitacion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "bloque" TEXT NOT NULL,
    "sesion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "numeroCamas" INTEGER NOT NULL,

    CONSTRAINT "Habitacion_pkey" PRIMARY KEY ("id")
);
