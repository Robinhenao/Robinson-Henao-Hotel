import { gql } from 'apollo-server-micro';

export const CREATE_HABITACION = gql`
  mutation CreateHabitacion($data: HabitacionCreateInput!) {
    createHabitacion(data: $data) {
      id
      nombre
      bloque
      sesion
      precio
      numeroCamas
    }
  }
`;