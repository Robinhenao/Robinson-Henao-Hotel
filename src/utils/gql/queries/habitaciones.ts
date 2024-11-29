import { gql } from 'apollo-server-micro';

export const GET_HABITACIONES = gql`
  query GetHabitaciones {
    habitaciones {
      id
      nombre
      bloque
      sesion
      precio
      numeroCamas
    }
  }
`;
