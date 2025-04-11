using Microsoft.EntityFrameworkCore;
using SistemaDeReservas.Models;  // Importa el espacio de nombres donde está la clase Reserva

namespace SistemaDeReservas.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Reserva> Reservas { get; set; }
    }
}