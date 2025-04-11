import React, { useState, useEffect } from 'react';
import { obtenerReservas, agregarReserva, eliminarReserva, actualizarReserva } from './reservasService';
import './App.css';

function App() {
  const [reservas, setReservas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [numeroDePersonas, setNumeroDePersonas] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await obtenerReservas();
        setReservas(data);
      } catch (error) {
        console.error('Error al cargar reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaReserva = { nombre, fecha, numeroDePersonas };
    try {
      if (idSeleccionado) {
        await actualizarReserva(idSeleccionado, nuevaReserva);
        setMensaje('Reserva actualizada correctamente.');
      } else {
        const data = await agregarReserva(nuevaReserva);
        setReservas([...reservas, data]);
        setMensaje('Reserva agregada correctamente.');
      }
      setNombre('');
      setFecha('');
      setNumeroDePersonas('');
      setIdSeleccionado(null);
      const data = await obtenerReservas();
      setReservas(data);
    } catch (error) {
      console.error('Error al agregar o actualizar reserva:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await eliminarReserva(id);
      setReservas(reservas.filter((reserva) => reserva.id !== id));
      setMensaje('Reserva eliminada correctamente.');
    } catch (error) {
      console.error('Error al eliminar reserva:', error);
    }
  };

  const handleSelect = (reserva) => {
    setIdSeleccionado(reserva.id);
    setNombre(reserva.nombre);
    setFecha(reserva.fecha);
    setNumeroDePersonas(reserva.numeroDePersonas);
    setMensaje('Editando la reserva seleccionada.');
  };

  return (
    <div className="container">
      <h1>Sistema de Gestión de Reservas</h1>
      {mensaje && <p className="mensaje">{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          placeholder="Fecha"
          required
        />
        <input
          type="number"
          value={numeroDePersonas}
          onChange={(e) => setNumeroDePersonas(Math.max(0, e.target.value))}
          placeholder="Número de personas"
          required
        />
        <button type="submit">{idSeleccionado ? 'Actualizar Reserva' : 'Agregar Reserva'}</button>
      </form>

      <table className="reservas-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Número de Personas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.nombre}</td>
              <td>{reserva.fecha}</td>
              <td>{reserva.numeroDePersonas}</td>
              <td>
                <button className="update" onClick={() => handleSelect(reserva)}>
                  Seleccionar
                </button>
                <button onClick={() => handleDelete(reserva.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;