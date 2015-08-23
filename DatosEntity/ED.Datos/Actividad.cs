namespace ED.Datos
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Actividad
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }
        [MaxLength(200)]
        public string Nombre { get; set; }
        [MaxLength(1000)]
        public string Descripcion { get; set; }
    }
}