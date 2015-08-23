namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EncuentroParticipantes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EncuentroParticipantes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Ganador = c.Boolean(nullable: false),
                        Participante_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PerfilParticipantes", t => t.Participante_Id)
                .Index(t => t.Participante_Id);
            
            AddColumn("dbo.Encuentroes", "Duracion", c => c.Int(nullable: false));
            AddColumn("dbo.Encuentroes", "Partes", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EncuentroParticipantes", "Participante_Id", "dbo.PerfilParticipantes");
            DropIndex("dbo.EncuentroParticipantes", new[] { "Participante_Id" });
            DropColumn("dbo.Encuentroes", "Partes");
            DropColumn("dbo.Encuentroes", "Duracion");
            DropTable("dbo.EncuentroParticipantes");
        }
    }
}
