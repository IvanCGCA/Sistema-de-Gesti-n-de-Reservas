import api from './axiosConfig';

export const obtenerReservas = async () => {
  try {
    const response = await api.get('Reserva');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    throw error;
  }
};

export const agregarReserva = async (reserva) => {
  try {
    const response = await api.post('Reserva', reserva);
    return response.data;
  } catch (error) {
    console.error('Error al agregar reserva:', error);
    throw error;
  }
};

export const eliminarReserva = async (id) => {
  try {
    await api.delete(`Reserva/${id}`);
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    throw error;
  }
};
export const actualizarReserva = async (id, reserva) => {
  const res = {        
      Id: id, 
      Nombre: reserva.nombre, 
      Fecha: reserva.fecha, 
      NumeroDePersonas: reserva.numeroDePersonas 
  };  
  try {
      console.log("Enviando datos:", res); 
      const response = await api.put(`Reserva/${id}`, res); 
      console.log("Respuesta del servidor:", response.data); 
      return response.data;
  } catch (error) {
      console.error('Error al actualizar la reserva:', error.response ? error.response.data : error.message);
      throw error;
  }
};