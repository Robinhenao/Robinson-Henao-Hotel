import { gql } from 'apollo-server-micro';

const CREATE_RESERVA = gql`
  mutation createReserva($data: ReservaCreateInput!) {
    createReserva(data: $data) {
      id
      fechaLlegada
      fechaSalida
      habitacionId
      usuarioId
    }
  }
`;

export { CREATE_RESERVA };