import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';

interface Habitacion {
  id: string;
  nombre: string;
  bloque: string;
  precio: number;
  numeroCamas: number;
}

export default function Component() {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([
    { id: '1', nombre: 'Habitación 101', bloque: 'A', precio: 100, numeroCamas: 2 },
    { id: '2', nombre: 'Habitación 102', bloque: 'A', precio: 120, numeroCamas: 1 },
    { id: '3', nombre: 'Habitación 201', bloque: 'B', precio: 150, numeroCamas: 3 },
    // Agregar más habitaciones según sea necesario
  ]);

  const [filters, setFilters] = useState({
    fechaInicio: '',
    fechaFin: '',
  });

  const [selectedHabitacion, setSelectedHabitacion] = useState<string | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleReserva = (id: string) => {
    setSelectedHabitacion(id);
    console.log(`Habitación reservada: ${id}, Fechas:`, filters);
    // Aquí puedes implementar la lógica de reserva, como enviar al backend.
  };

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
              {habitaciones.map((habitacion) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
