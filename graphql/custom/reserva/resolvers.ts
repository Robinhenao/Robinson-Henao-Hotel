import prisma from 'config/prisma'; // Asegúrate de importar tu cliente Prisma correctamente

const ReservaCustomResolvers = {
  Query: {
    // Obtener todas las reservas
    getReservas: async () => {
      try {
        return await prisma.reserva.findMany(); // Obtiene todas las reservas
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        throw new Error("No se pudieron obtener las reservas.");
      }
    },

    
    getReserva: async (_: any, args: { id: string }) => {
      try {
        return await prisma.reserva.findUnique({
          where: { id: args.id }, // Buscar reserva por su ID
        });
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
        throw new Error("No se pudo obtener la reserva.");
      }
    },
  },

  Mutation: {
    // Crear una nueva reserva
    createReserva: async (_: any, args: { data: any }) => {
      try {
        return await prisma.reserva.create({
          data: args.data, // Crear una nueva reserva con los datos proporcionados
        });
      } catch (error) {
        console.error("Error al crear la reserva:", error);
        throw new Error("No se pudo crear la reserva.");
      }
    },

    // Actualizar una reserva existente
    updateReserva: async (_: any, args: { where: { id: string }; data: any }) => {
      try {
        return await prisma.reserva.update({
          where: { id: args.where.id },  // Actualizar la reserva por su ID
          data: args.data,               // Nuevos datos de la reserva
        });
      } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        throw new Error("No se pudo actualizar la reserva.");
      }
    },

    // Eliminar una reserva
    deleteReserva: async (_: any, args: { id: string }) => {
      try {
        return await prisma.reserva.delete({
          where: { id: args.id }, // Eliminar la reserva por su ID
        });
      } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        throw new Error("No se pudo eliminar la reserva.");
      }
    },
  },
};

export { ReservaCustomResolvers };
