import prisma from 'config/prisma';

const HabitacionCustomResolvers = {
  Query: {},
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
