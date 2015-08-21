using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ED.Datos
{
    /// <summary>
    /// Resultado de un acceso de usuario
    /// </summary>
    public enum ResultadoAcceso
    {
        Correcto,
        UsuarioIncorrecto,
        ClaveIncorrecta,
        Bloqueado,
    }

    /// <summary>
    /// Estado de las credenciales de un usuario
    /// </summary>
    public enum EstadoCredencial
    {
        Permitido,
        BloqueoTemporal,
        BloqueoPermanente,
        Prohibido
    }

    /// <summary>
    /// Roles de los usuario
    /// </summary>
    public class Rol
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }

    /// <summary>
    /// Datos de la cuenta de usuario
    /// </summary>
    public class Usuario
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }
        public string Email { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public int FechaAlta { get; set; }
        public int HoraAlta { get; set; }
        public int FechaNacimiento { get; set; }
        public virtual ICollection<Rol> Roles { get; set; }
    }

    /// <summary>
    /// Credenciales de acceso de un usuario
    /// </summary>
    public class Credencial
    {
        /// <summary>
        /// Máximo número de intentos erroneos antes del bloque de cuenta
        /// </summary>
        public const int MaximoNumeroIntentos = 5;

        /// <summary>
        /// Tiempo de espera para desbloqueo/reseteo del bloqueo
        /// </summary>
        public const int TiempoEspera = 30;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }
        public Usuario Usuario { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }
        public int Intentos { get; set; }
        public int FechaDesbloqueo { get; set; }
        public int HoraDesbloqueo { get; set; }
        public EstadoCredencial Estado { get; set; }
    }

    /// <summary>
    /// Datos de un intento de acceso
    /// </summary>
    public class Acceso
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }
        public string Credencial { get; set; }
        public int Fecha { get; set; }
        public int Hora { get; set; }
    }

    /// <summary>
    /// Datos de un perfil de usuario
    /// </summary>
    public class PerfilParticipante
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }
        //[InverseProperty("Id")]
        //[ForeignKey("UsuarioId")]
        //[Key]
        public Usuario Usuario { get; set; }
        //[InverseProperty("Id")]
        //[ForeignKey("ActividadId")]
        //[Key]
        public Actividad Actividad { get; set; }
        public bool MostrarEdad  { get; set; }
        public bool MostrarEmail { get; set; }
        public string Imagen { get; set; }
        public string Bio { get; set; }
        public int FechaInscripcion { get; set; }
        public int HoraInscripcion { get; set; }
    }
}