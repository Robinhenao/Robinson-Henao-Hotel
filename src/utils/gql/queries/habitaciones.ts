import { gql } from 'apollo-server-micro';

const GET_HABITACIONES = gql`
  query getHabitaciones {
    getHabitaciones {
      id
      nombre
      bloque
      sesion
      precio
      numeroCamas
    }
  }
`;

export { GET_HABITACIONES};