namespace SistemaDeReservas.Models
{
    public class Reserva
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Fecha { get; set; }
        public int NumeroDePersonas { get; set; }
    }
}