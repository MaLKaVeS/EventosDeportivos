using System.Data.Entity;

namespace ED.Datos
{
    public class Contexto : DbContext
    {
        static Contexto()
        {
            Database.SetInitializer(new MySqlInitializer());
        }

        public Contexto() :base()
        {
        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Credencial> Credenciales { get; set; }
        public DbSet<Acceso> Accesos { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<Actividad> Actividades { get; set; }
        public DbSet<Evento> Eventos { get; set; }
    }
}