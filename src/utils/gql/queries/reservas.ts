import { gql } from 'apollo-server-micro';

const GET_RESERVAS = gql`
  query getReservas {
    getReservas {
      id
      fechaLlegada
      fechaSalida
      habitacionId
      usuarioId
    }
  }
`;

export { GET_RESERVAS };
