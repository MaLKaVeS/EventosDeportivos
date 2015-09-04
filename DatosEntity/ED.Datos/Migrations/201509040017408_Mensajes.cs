namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Mensajes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Mensajes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EmailContacto = c.String(nullable: false),
                        Asunto = c.String(nullable: false, maxLength: 500),
                        TextoMensaje = c.String(nullable: false),
                        Fecha = c.Int(nullable: false),
                        Hora = c.Int(nullable: false),
                        Contestado = c.Boolean(nullable: false),
                        AsuntoRespuesta = c.String(),
                        TextoRespuesta = c.String(),
                        FechaRespuesta = c.Int(nullable: false),
                        HoraRespuesta = c.Int(nullable: false),
                        EmailRespuesta = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Encuentroes", "Fecha", c => c.Int(nullable: false));
            AddColumn("dbo.Encuentroes", "HoraInicio", c => c.Int(nullable: false));
            AddColumn("dbo.Encuentroes", "FechaInicio", c => c.Int(nullable: false));
            AddColumn("dbo.Encuentroes", "Estado", c => c.Int(nullable: false));
            AddColumn("dbo.Encuentroes", "TiempoTranscurrido", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Encuentroes", "TiempoTranscurrido");
            DropColumn("dbo.Encuentroes", "Estado");
            DropColumn("dbo.Encuentroes", "FechaInicio");
            DropColumn("dbo.Encuentroes", "HoraInicio");
            DropColumn("dbo.Encuentroes", "Fecha");
            DropTable("dbo.Mensajes");
        }
    }
}
