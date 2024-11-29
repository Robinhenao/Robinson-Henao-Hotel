import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { useMutation } from '@apollo/client';
import { CREATE_HABITACION } from '@/src/utils/gql/mutations/habitaciones';
import Swal from 'sweetalert2';

export default function RegistroHabitacion() {
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    bloque: '',
    sesion: '',
    precio: '',
    numeroCamas: '',
  });

  // Estado para manejar errores de validación
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string
  }>({});

  // Mutación para crear habitación
  const [upsertHabitacion, { loading }] = useMutation(CREATE_HABITACION, {
    onCompleted: () => {
      Swal.fire({
        icon: 'success',
        title: 'Habitación registrada exitosamente',
        showConfirmButton: false,
        timer: 2000, // La alerta desaparecerá después de 3 segundos
      });
      setFormData({
        nombre: '',
        bloque: '',
        sesion: '',
        precio: '',
        numeroCamas: '',
      });
      setValidationErrors({});
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar habitación',
        text: error.message, 
      });
    }
  });


  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    }

    if (!formData.bloque.trim()) {
      errors.bloque = 'El bloque es requerido';
    }

    if (!formData.sesion.trim()) {
      errors.sesion = 'La sesión es requerida';
    }

    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      errors.precio = 'El precio debe ser mayor a 0';
    }

    if (!formData.numeroCamas || parseInt(formData.numeroCamas) <= 0) {
      errors.numeroCamas = 'El número de camas debe ser mayor a 0';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar antes de enviar
    if (!validateForm()) return;

    try {
      await upsertHabitacion({
        variables: {
          data: {
            nombre: formData.nombre,
            bloque: formData.bloque,
            sesion: formData.sesion,
            precio: formData.precio,
            numeroCamas: formData.numeroCamas,
          },
        },
      });
    } catch (error) {
      console.error('Error en el envío:', error);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>Registro de Habitaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos del formulario con manejo de errores */}
          {[
            { name: 'nombre', label: 'Nombre', type: 'text' },
            { name: 'bloque', label: 'Bloque', type: 'text' },
            { name: 'sesion', label: 'Sesión', type: 'text' },
            { name: 'precio', label: 'Precio', type: 'number' },
            { name: 'numeroCamas', label: 'Número de Camas', type: 'number' }
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label 
                htmlFor={name} 
                className="block text-sm font-medium mb-1"
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  validationErrors[name] 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300'
                }`}
                required
              />
              {validationErrors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors[name]}
                </p>
              )}
            </div>
          ))}

          <Button 
            type="submit" 
            variant="default" 
            className="w-full mt-4" 
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar Habitación'}
          </Button>
        </form>
       
      </CardContent>
    </Card>
  );
}