namespace ED.Datos
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    /// <summary>
    /// Estado de un evento
    /// </summary>
    public enum Estado
    {
        Creado, // Creado en el administrador pero no accesible por el público
        Publicado, // Accesible para el público
        EnProgreso, // El evento se está llevando a cabo
        Terminado, // El evento ha finalizado
        Finalizado, // El evento ha finalziado y se ha cerrado su edición
    }

    /// <summary>
    /// Modo de registro para el evento
    /// </summary>
    public enum Registro
    {
        Abierto, // Cualquiera a través del formulario de la página 
        Administrado, // Requiere aprobación por parte de los gestores
        Cerrado, // El registro está cerrado y no se permiten más participantes
    }

    public class Evento
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }
        [InverseProperty("Id")]
        [ForeignKey("ActividadId")]
        [Key]
        public virtual Actividad Actividad { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int FechaCreacion { get; set; }
        public int HoraCreacion { get; set; }
        public int FechaInicio { get; set; }
        public int HoraInicio { get; set; }
        public int FechaFin { get; set; }
        public int HoraFin { get; set; }
        public Estado Estado { get; set; }
        public Registro EstadoRegistro { get; set; }
    }
}