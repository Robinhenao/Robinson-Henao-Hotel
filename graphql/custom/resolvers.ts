import { PruebaResolvers } from './prueba/resolvers';
import { UserCustomResolvers } from './user/resolvers';
import { ProductCustomResolvers } from './product/resolvers';
import { HabitacionCustomResolvers }  from './habitaciones/resolvers';
import { ReservaCustomResolvers } from './reserva/resolvers';

const customResolvers = [
  PruebaResolvers,
  UserCustomResolvers,
  ProductCustomResolvers,
  HabitacionCustomResolvers,
  ReservaCustomResolvers,
];

export { customResolvers };
