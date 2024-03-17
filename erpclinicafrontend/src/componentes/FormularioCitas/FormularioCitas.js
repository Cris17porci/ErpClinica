// components/FormularioCitas.js
import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import DatePicker from 'react-datepicker'; // Importar el componente DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Importar los estilos del DatePicker
import { Modal, Button } from '@mui/material'; // Importar componentes de Material UI

// Consulta GraphQL para obtener los días y horas hábiles para citas
const GET_AVAILABLE_SLOTS = gql`
    query {
        availableSlots {
        id
        date
        startTime
        endTime
    }
}
`;

// Mutación GraphQL para crear una cita
const CREATE_APPOINTMENT = gql`
    mutation CreateAppointment($input: AppointmentInput!) {
        createAppointment(input: $input) {
            id
    }
}
`;

// Componente de formulario de cita
const FormularioCitas = () => {
    const [formData, setFormData] = useState({}); // Estado para almacenar los datos del formulario
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

    // Realizar la consulta GraphQL para obtener los días y horas hábiles para citas
    const { loading: loadingSlots, error: slotsError, data: slotsData } = useQuery(GET_AVAILABLE_SLOTS);

    // Realizar la mutación GraphQL para crear una cita
    const [createAppointment, { loading: creatingAppointment }] = useMutation(CREATE_APPOINTMENT, {
        onError: () => {
            // Mostrar modal de error si hay un error de conexión al enviar la cita
            setModalOpen(true);
        }
    });

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ejecutar la mutación GraphQL con los datos del formulario
            await createAppointment({ variables: { input: formData } });
            // Limpiar el formulario después de enviar los datos
            setFormData({});
        } catch (error) {
        console.error('Error al enviar la cita:', error);
        }
    };

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Función para manejar los cambios en la fecha seleccionada
    const handleDateChange = (date) => {
        setFormData({ ...formData, date: date });
    };

    // Función para renderizar las fechas y horas hábiles disponibles en el calendario
    const renderSlots = () => {
        if (loadingSlots) return null; // Si está cargando, no renderizar nada
        if (slotsError || !slotsData || !slotsData.availableSlots) {
            // Si hay error o no hay datos, retornar las fechas y horas predeterminadas
            const today = new Date();
            const defaultSlots = [];

            // Habilitar desde hoy de 8 AM a 8 PM de lunes a sábado con intervalo de 30 minutos
            for (let i = 0; i < 6; i++) {
                const currentDate = new Date(today);
                currentDate.setDate(today.getDate() + i);
            
                // Iniciar desde las 8 AM
                currentDate.setHours(8);
                currentDate.setMinutes(0);
                defaultSlots.push(new Date(currentDate));
                // Agregar intervalos de 30 minutos hasta las 8 PM
                while (currentDate.getHours() < 20) {
                    currentDate.setMinutes(currentDate.getMinutes() + 30);
                    defaultSlots.push(new Date(currentDate));
                }
            }
            return defaultSlots;
        }
        // Transformar los datos obtenidos de GraphQL a fechas válidas para el calendario
        return slotsData.availableSlots.map(slot => new Date(slot.date + 'T' + slot.startTime));
    };

    return (
        <div>
            <h2>Reservar cita</h2>
            <form onSubmit={handleSubmit}>
            {/* Campos del formulario */}
            <input type="text" name="name" placeholder="Nombre" value={formData.name || ''} onChange={handleChange} />
            <input type="email" name="email" placeholder="Correo electrónico" value={formData.email || ''} onChange={handleChange} />
            <input type="text" name="phone" placeholder="Celular" value={formData.phone || ''} onChange={handleChange} />
            <input type="text" name="instagram" placeholder="Usuario de Instagram" value={formData.instagram || ''} onChange={handleChange} />
            <input type="text" name="rut" placeholder="RUT" value={formData.rut || ''} onChange={handleChange} />
            <DatePicker
            selected={formData.date} // Fecha seleccionada
            onChange={handleDateChange} // Función para manejar cambios de fecha
            dateFormat="dd/MM/yyyy" // Formato de fecha
            minDate={new Date()} // Fecha mínima (hoy)
            filterDate={date => date.getDay() !== 0} // Filtrar los domingos
            excludeDates={renderSlots()} // Fechas y horas obtenidas de GraphQL
            />
            <button type="submit" disabled={creatingAppointment}>Reservar</button>
            </form>
            {/* Modal de error */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <div>
                <h3>Error de conexión</h3>
                <p>No se puede enviar la cita en este momento debido a un problema de conexión.</p>
                <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
            </div>
            </Modal>
        </div>
    );
};

export default FormularioCitas;