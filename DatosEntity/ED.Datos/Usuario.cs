using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ED.Datos
{
    public enum ResultadoAcceso
    {
        Correcto,
        UsuarioIncorrecto,
        ClaveIncorrecta,
        Bloqueado,
    }

    public class Rol
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        public string Nombre { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }

    public class Usuario
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        public string Email { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public int FechaAlta { get; set; }
        public int FechaNacimiento { get; set; }
        public virtual ICollection<Rol> Roles { get; set; }
    }

    public class Credencial
    {
        public const int MaximoNumeroIntentos = 5;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        public Usuario Usuario { get; set; }
        public string PasswordHash { get; set; }
        public int Intentos { get; set; }
        public int FechaDesbloqueo { get; set; }
    }

    public class Acceso
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        public string Credencial { get; set; }
        public int Fecha { get; set; }
        public int Hora { get; set; }
    }
}