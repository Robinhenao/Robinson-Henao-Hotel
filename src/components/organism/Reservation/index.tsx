import React, { useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_HABITACIONES } from '@/src/utils/gql/queries/habitaciones';
import { GET_RESERVAS } from '@/src/utils/gql/queries/reservas';
import { CREATE_RESERVA } from '@/src/utils/gql/mutations/reservas';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

interface Habitacion {
  id: string;
  nombre: string;
  bloque: string;
  precio: string;
  numeroCamas: string;
}

export default function HabitacionesList() {
  const [filters, setFilters] = useState({
    fechaInicio: '',
    fechaFin: '',
  });

  const [] = useState<string | null>(null);

  // Query para obtener las habitaciones
  const { loading: loadingHabitaciones, error: errorHabitaciones, data: habitacionesData } = useQuery(GET_HABITACIONES);

  // Query para obtener las reservas
  const { loading: loadingReservas, error: errorReservas, data: reservasData } = useQuery(GET_RESERVAS);

  // Mutation para crear una reserva
  const [createReserva] = useMutation(CREATE_RESERVA);

  const { data: session} = useSession(); // Obtén la sesión del usuario

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleReserva = async (habitacionId: string) => {
    if (!session) {
      Swal.fire({
        icon: 'error',
        title: 'No autenticado',
        text: 'Por favor, inicie sesión para realizar una reserva.',
      });
      return;
    }

    const usuarioId = session.user?.id; // Extrae el ID del usuario desde la sesión

    // Asegurarse de que las fechas estén en formato ISO-8601
    const fechaInicio = new Date(filters.fechaInicio).toISOString();
    const fechaFin = new Date(filters.fechaFin).toISOString();

    try {
      const { data } = await createReserva({
        variables: {
          data: {
            fechaLlegada: fechaInicio,
            fechaSalida: fechaFin,
            habitacionId: habitacionId,
            usuarioId: usuarioId, // Usa el ID del usuario aquí
          }
        }
      });

      // Mostrar alerta de éxito con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Reserva realizada exitosamente',
        showConfirmButton: false,
        timer: 2000, // La alerta desaparecerá después de 2 segundos
      });

      // Limpiar campos de fecha
      setFilters({
        fechaInicio: '',
        fechaFin: '',
      });

      console.log('Reserva creada:', data.createReserva);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al realizar la reserva',
        text: "Error al procesar la reserva",
      });
    }
  };

  const filterHabitaciones = () => {
    // Convertir las fechas de entrada a objetos Date
    const fechaInicio = new Date(filters.fechaInicio);
    const fechaFin = new Date(filters.fechaFin);

    // Si no hay fechas seleccionadas, mostrar todas las habitaciones
    if (!fechaInicio.getTime() || !fechaFin.getTime()) {
      return habitacionesData?.getHabitaciones || [];
    }

    return habitacionesData?.getHabitaciones.filter((habitacion: Habitacion) => {
      // Filtrar habitaciones que ya tienen reservas entre las fechas seleccionadas
      const reservas = reservasData?.getReservas || [];
      const estaReservada = reservas.some((reserva: any) => {
        const reservaInicio = new Date(reserva.fechaLlegada);
        const reservaFin = new Date(reserva.fechaSalida);
        
        // Verificar si las fechas de la reserva se solapan con las fechas seleccionadas
        return (
          reserva.habitacionId === habitacion.id && // Verificar que sea la misma habitación
          (fechaInicio < reservaFin && fechaFin > reservaInicio) // Solapamiento de fechas
        );
      });
      return !estaReservada; // Retornar las habitaciones que no están reservadas entre las fechas
    });
  };

  if (loadingHabitaciones || loadingReservas) {
    return <p>Cargando datos...</p>;
  }

  if (errorHabitaciones) {
    return <p>Error al cargar habitaciones: {errorHabitaciones.message}</p>;
  }

  if (errorReservas) {
    return <p>Error al cargar reservas: {errorReservas.message}</p>;
  }

  const habitacionesFiltradas = filterHabitaciones();

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Reservar Habitaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div>
              <label htmlFor="fechaInicio" className="block text-sm font-medium">
                Fecha Inicio
              </label>
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={filters.fechaInicio}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="fechaFin" className="block text-sm font-medium">
                Fecha Fin
              </label>
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={filters.fechaFin}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Bloque</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Número de Camas</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {habitacionesFiltradas.length > 0 ? (
                habitacionesFiltradas.map((habitacion: Habitacion) => (
                  <TableRow key={habitacion.id}>
                    <TableCell>{habitacion.nombre}</TableCell>
                    <TableCell>{habitacion.bloque}</TableCell>
                    <TableCell>${habitacion.precio}</TableCell>
                    <TableCell>{habitacion.numeroCamas}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleReserva(habitacion.id)}
                        variant="default"
                        className="text-xs"
                      >
                        Reservar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No hay habitaciones disponibles para las fechas seleccionadas.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
