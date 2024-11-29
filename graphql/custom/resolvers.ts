import { CalculadoraResolvers } from './calculadora/resolvers';
import { PruebaResolvers } from './prueba/resolvers';
import { UserCustomResolvers } from './user/resolvers';
import { ProductCustomResolvers } from './product/resolvers';
import { HabitacionCustomResolvers }  from './habitaciones/resolvers';

const customResolvers = [
  CalculadoraResolvers,
  PruebaResolvers,
  UserCustomResolvers,
  ProductCustomResolvers,
  HabitacionCustomResolvers,
];

export { customResolvers };
