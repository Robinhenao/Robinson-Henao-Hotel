import prisma from 'config/prisma';

const HabitacionCustomResolvers = {
  Query: {
    getHabitaciones: async () => {
      try {
        return await prisma.habitacion.findMany();
      } catch (error) {
        console.error("Error al listar las habitaciones:", error);
        throw new Error("No se pudieron obtener las habitaciones.");
      }
    },
  },
  Mutation: {
    createHabitacion: async (_: any, args: any) => {
      try {
        return await prisma.habitacion.create({
          data: args.data,
        });
      } catch (error) {
        console.error("Error al crear la habitación:", error);
        throw new Error("No se pudo crear la habitación.");
      }
    },
  },
};

export { HabitacionCustomResolvers };
