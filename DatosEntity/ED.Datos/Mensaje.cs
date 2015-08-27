using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ED.Datos
{
    public class Mensaje
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string EmailContacto { get; set; }
        [Required]
        [MaxLength(500)]
        public string Asunto { get; set; }
        [Required]
        public string TextoMensaje { get; set; }
        public int Fecha { get; set; }
        public int Hora { get; set; }
        public bool Contestado { get; set; }
        public string AsuntoRespuesta { get; set; }
        public string TextoRespuesta { get; set; }
        public int FechaRespuesta { get; set; }
        public int HoraRespuesta { get; set; }
        public string EmailRespuesta { get; set; }

    }
}