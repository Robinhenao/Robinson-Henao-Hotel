import { PruebaResolvers } from './prueba/resolvers';
import { UserCustomResolvers } from './user/resolvers';
import { HabitacionCustomResolvers }  from './habitaciones/resolvers';
import { ReservaCustomResolvers } from './reserva/resolvers';

const customResolvers = [
  PruebaResolvers,
  UserCustomResolvers,
  HabitacionCustomResolvers,
  ReservaCustomResolvers,
];

export { customResolvers };
