namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Perfil : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PerfilParticipantes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        MostrarEdad = c.Boolean(nullable: false),
                        MostrarEmail = c.Boolean(nullable: false),
                        Imagen = c.String(),
                        Bio = c.String(),
                        FechaInscripcion = c.Int(nullable: false),
                        HoraInscripcion = c.Int(nullable: false),
                        Actividad_Id = c.String(maxLength: 128),
                        Usuario_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Actividads", t => t.Actividad_Id)
                .ForeignKey("dbo.Usuarios", t => t.Usuario_Id)
                .Index(t => t.Actividad_Id)
                .Index(t => t.Usuario_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PerfilParticipantes", "Usuario_Id", "dbo.Usuarios");
            DropForeignKey("dbo.PerfilParticipantes", "Actividad_Id", "dbo.Actividads");
            DropIndex("dbo.PerfilParticipantes", new[] { "Usuario_Id" });
            DropIndex("dbo.PerfilParticipantes", new[] { "Actividad_Id" });
            DropTable("dbo.PerfilParticipantes");
        }
    }
}
