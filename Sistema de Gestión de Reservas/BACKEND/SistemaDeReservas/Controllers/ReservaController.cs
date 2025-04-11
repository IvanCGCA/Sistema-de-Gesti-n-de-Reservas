using Microsoft.AspNetCore.Mvc;
using SistemaDeReservas.Data;
using SistemaDeReservas.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaDeReservas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Reserva
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReservas()
        {
            return await _context.Reservas.ToListAsync();
        }

        // GET: api/Reserva/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reserva>> GetReserva(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);

            if (reserva == null)
            {
                return NotFound();
            }

            return reserva;
        }

        // POST: api/Reserva
        [HttpPost]
        public async Task<ActionResult<Reserva>> PostReserva(Reserva reserva)
        {
            _context.Reservas.Add(reserva);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReserva", new { id = reserva.Id }, reserva);
        }

        // PUT: api/Reserva/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReserva(int id, Reserva reserva)
        {
            // Verificamos si los datos recibidos son correctos
            Console.WriteLine($"Recibiendo datos: ID de la reserva = {reserva.Id}, ID enviado por put: {id}");
            if (id != reserva.Id)
            {
                // Devolvemos un error si el id no coincide con el de la reserva
                return BadRequest("El ID de la URL no coincide con el ID de la reserva.");
            }

            // Verificar los valores recibidos en el objeto reserva
            Console.WriteLine($"Recibiendo datos: Nombre = {reserva.Nombre}, Fecha = {reserva.Fecha}, NumeroDePersonas = {reserva.NumeroDePersonas}");

            // Marcamos el estado de la reserva como modificado
            _context.Entry(reserva).State = EntityState.Modified;

            try
            {
                // Intentamos guardar los cambios
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservaExists(id))
                {
                    // Si no se encuentra la reserva en la base de datos
                    return NotFound();
                }
                else
                {
                    // Si ocurre otro error, lo lanzamos
                    throw;
                }
            }

            // Devolvemos un resultado exitoso sin contenido
            return NoContent();
        }

        // DELETE: api/Reserva/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReserva(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
            {
                return NotFound();
            }

            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservaExists(int id)
        {
            return _context.Reservas.Any(e => e.Id == id);
        }
    }
}