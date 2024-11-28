import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { useRouter } from 'next/router';

export default function Component() {
  const [formData, setFormData] = useState({
    nombre: '',
    bloque: '',
    sesion: '',
    precio: '',
    numeroCamas: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí procesas los datos del formulario, como enviarlos al backend
    console.log('Formulario enviado:', formData);
    // Redirigir o limpiar el formulario si es necesario
    setFormData({
      nombre: '',
      bloque: '',
      sesion: '',
      precio: '',
      numeroCamas: '',
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>Registro de Habitaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="bloque" className="block text-sm font-medium">
              Bloque
            </label>
            <input
              type="text"
              id="bloque"
              name="bloque"
              value={formData.bloque}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="sesion" className="block text-sm font-medium">
              Sesión
            </label>
            <input
              type="text"
              id="sesion"
              name="sesion"
              value={formData.sesion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="precio" className="block text-sm font-medium">
              Precio
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="numeroCamas" className="block text-sm font-medium">
              Número de Camas
            </label>
            <input
              type="number"
              id="numeroCamas"
              name="numeroCamas"
              value={formData.numeroCamas}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <Button type="submit" variant="default" className="w-full">
            Registrar Habitación
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
