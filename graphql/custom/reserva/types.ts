import { gql } from 'apollo-server-micro';

export const CustomReservaType = gql`
  type Reserva {
    id: ID!
    fechaLlegada: DateTime!   
    fechaSalida: DateTime!    
    habitacionId: String!
    usuarioId: String!
  }

  input ReservaCreateInput {
    fechaLlegada: DateTime!  
    fechaSalida: DateTime!    
    habitacionId: String!
    usuarioId: String!
  }

  input ReservaUpdateInput {
    fechaLlegada: DateTime   
    fechaSalida: DateTime
    habitacionId: String!
    usuarioId: String!
  }


  input ReservaWhereUniqueInput {
    id: ID!
  }


  type Query {
    getReservas: [Reserva!]!   
    getReserva(id: ID!): Reserva   
  }


  type Mutation {
    createReserva(data: ReservaCreateInput!): Reserva!
    updateReserva(
      where: ReservaWhereUniqueInput!
      data: ReservaUpdateInput!
    ): Reserva!   
    deleteReserva(id: ID!): Reserva!
  }
`;
