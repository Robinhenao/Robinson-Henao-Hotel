import prisma from 'config/prisma';

const ProductCustomResolvers = {
  User: {},
  Query: {},
  Mutation: {
    upsertProduct: async (_: any, args: any) => {
      return await prisma.products.upsert({
        create: args.data.create,
        update: args.data.update,
        where: args.where,
      });
    },
  },
};

export { ProductCustomResolvers };
