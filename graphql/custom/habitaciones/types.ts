import { gql } from 'apollo-server-micro';

export const CustomHabitacionType = gql`
  type Habitacion {
    id: ID!
    nombre: String!
    bloque: String!
    sesion: String!
    precio: String!
    numeroCamas: String!
  }

  input HabitacionCreateInput {
    nombre: String!
    bloque: String!
    sesion: String!
    precio: String!
    numeroCamas: String!
  }

  input HabitacionUpdateInput {
    nombre: String
    bloque: String
    sesion: String
    precio: String
    numeroCamas: String
  }

  input HabitacionWhereUniqueInput {
    id: ID!
  }

  type Mutation {
    createHabitacion(data: HabitacionCreateInput!): Habitacion!
    upsertHabitacion(
      where: HabitacionWhereUniqueInput!
      create: HabitacionCreateInput!
      update: HabitacionUpdateInput!
    ): Habitacion!
  }
`;
