namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PerfilEvento : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PerfilEventoes",
                c => new
                    {
                        Perfil_Id = c.Int(nullable: false),
                        Evento_Id = c.Int(nullable: false),
                        FechaInscripcion = c.Int(nullable: false),
                        HoraInscripcion = c.Int(nullable: false),
                        Evento_Id1 = c.String(maxLength: 128),
                        Perfil_Id1 = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Perfil_Id, t.Evento_Id })
                .ForeignKey("dbo.Eventoes", t => t.Evento_Id1)
                .ForeignKey("dbo.PerfilParticipantes", t => t.Perfil_Id1)
                .Index(t => t.Evento_Id1)
                .Index(t => t.Perfil_Id1);
            
            AddColumn("dbo.PerfilParticipantes", "FechaCreacion", c => c.Int(nullable: false));
            AddColumn("dbo.PerfilParticipantes", "HoraCreacion", c => c.Int(nullable: false));
            AlterColumn("dbo.PerfilParticipantes", "Imagen", c => c.String(maxLength: 1000));
            AlterColumn("dbo.PerfilParticipantes", "Bio", c => c.String(maxLength: 600));
            DropColumn("dbo.PerfilParticipantes", "FechaInscripcion");
            DropColumn("dbo.PerfilParticipantes", "HoraInscripcion");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PerfilParticipantes", "HoraInscripcion", c => c.Int(nullable: false));
            AddColumn("dbo.PerfilParticipantes", "FechaInscripcion", c => c.Int(nullable: false));
            DropForeignKey("dbo.PerfilEventoes", "Perfil_Id1", "dbo.PerfilParticipantes");
            DropForeignKey("dbo.PerfilEventoes", "Evento_Id1", "dbo.Eventoes");
            DropIndex("dbo.PerfilEventoes", new[] { "Perfil_Id1" });
            DropIndex("dbo.PerfilEventoes", new[] { "Evento_Id1" });
            AlterColumn("dbo.PerfilParticipantes", "Bio", c => c.String());
            AlterColumn("dbo.PerfilParticipantes", "Imagen", c => c.String());
            DropColumn("dbo.PerfilParticipantes", "HoraCreacion");
            DropColumn("dbo.PerfilParticipantes", "FechaCreacion");
            DropTable("dbo.PerfilEventoes");
        }
    }
}
