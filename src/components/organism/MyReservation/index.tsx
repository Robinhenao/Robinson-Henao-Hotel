import React from 'react';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { GET_RESERVAS } from '@/src/utils/gql/queries/reservas';
import { GET_HABITACIONES } from '@/src/utils/gql/queries/habitaciones';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';

interface Habitacion {
  id: string;
  nombre: string;
  bloque: string;
  precio: string;
}

interface Reserva {
  id: string;
  fechaLlegada: string;
  fechaSalida: string;
  usuarioId: string;
  habitacionId: string;
  estado: string;
}

export default function MiReserva() {
  const { data: session, status } = useSession();

  // Queries para obtener reservas y habitaciones
  const { loading: loadingReservas, error: errorReservas, data: reservasData } = useQuery(GET_RESERVAS);
  const { loading: loadingHabitaciones, error: errorHabitaciones, data: habitacionesData } = useQuery(GET_HABITACIONES);

  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Verificar autenticación
  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  if (status === 'unauthenticated') {
    return (
      <Card className="w-full max-w-4xl mx-auto mt-10">
        <CardContent className="text-center p-10">
          <p>Debe iniciar sesión para ver sus reservas</p>
        </CardContent>
      </Card>
    );
  }

  // Manejar estados de carga y error
  if (loadingReservas || loadingHabitaciones) {
    return <p>Cargando datos...</p>;
  }

  if (errorReservas || errorHabitaciones) {
    return <p>Error al cargar datos: {errorReservas?.message || errorHabitaciones?.message}</p>;
  }

  // Filtrar reservas del usuario logueado
  const reservasUsuario: Reserva[] = reservasData?.getReservas.filter(
    (reserva: Reserva) => reserva.usuarioId === session?.user?.id
  ) || [];

  // Combinar información de habitaciones con reservas
  const reservasConHabitaciones = reservasUsuario.map((reserva) => {
    const habitacion = habitacionesData?.getHabitaciones.find(
      (habitacion: Habitacion) => habitacion.id === reserva.habitacionId
    );
    return {
      ...reserva,
      habitacion,
    };
  });

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Mis Reservas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Habitación</TableHead>
              <TableHead>Bloque</TableHead>
              <TableHead>Fecha Llegada</TableHead>
              <TableHead>Fecha Salida</TableHead>
              <TableHead>Pago</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservasConHabitaciones.length > 0 ? (
              reservasConHabitaciones.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell>{reserva.habitacion?.nombre || 'Sin información'}</TableCell>
                  <TableCell>{reserva.habitacion?.bloque || 'Sin información'}</TableCell>
                  <TableCell>{formatDate(reserva.fechaLlegada)}</TableCell>
                  <TableCell>{formatDate(reserva.fechaSalida)}</TableCell>
                  <TableCell>
                    {reserva.habitacion?.precio ? `$${reserva.habitacion.precio}` : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No tienes reservas activas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
