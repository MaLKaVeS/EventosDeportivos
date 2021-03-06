﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ED.Datos
{
    public enum EncuentroEstado {
        Pendiente,
        EnCurso,
        Finalizado
    }

    public class Encuentro
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }
        public Evento Evento { get; set; }
        public int Ronda { get; set; }
        public int Duracion { get; set; }
        public int Partes { get; set; }
        [MaxLength(1000)]
        public string Lugar { get; set; }
        public int Hora { get; set; }
        public int Fecha { get; set; }
        public int HoraInicio { get; set; }
        public int FechaInicio { get; set; }
        public EncuentroEstado Estado { get; set; }
        public int TiempoTranscurrido { get; set; }
    }

    public class EncuentroParticipante
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }
        public PerfilParticipante Participante { get; set; }
        public List<string> Puntuacion { get; set; }
        public bool Ganador { get; set; }

    }
}