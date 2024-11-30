-- CreateTable
CREATE TABLE "Reserva" (
    "id" TEXT NOT NULL,
    "fechaLlegada" TIMESTAMP(3) NOT NULL,
    "fechaSalida" TIMESTAMP(3) NOT NULL,
    "habitacionId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);
