﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace es.efor.OnBoarding.Data.Entities
{
    [Table("players")]
    public partial class Players
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }
        [Required]
        [StringLength(50)]
        public string Posicion { get; set; }
        public int Numero { get; set; }
        public int EquipoId { get; set; }

        [ForeignKey(nameof(EquipoId))]
        [InverseProperty("Players")]
        public virtual Equipo Equipo { get; set; }
    }
}