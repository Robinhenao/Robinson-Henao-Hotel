import { CalculadoraResolvers } from './calculadora/resolvers';
import { PruebaResolvers } from './prueba/resolvers';
import { UserCustomResolvers } from './user/resolvers';
import { ProductCustomResolvers } from './product/resolvers';

const customResolvers = [
  CalculadoraResolvers,
  PruebaResolvers,
  UserCustomResolvers,
  ProductCustomResolvers,
];

export { customResolvers };
