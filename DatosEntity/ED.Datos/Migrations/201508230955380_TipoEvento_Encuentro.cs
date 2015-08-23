namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TipoEvento_Encuentro : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ClaseEventoes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Nombre = c.String(maxLength: 200),
                        Descripcion = c.String(maxLength: 1000),
                        FasePrevia = c.Boolean(nullable: false),
                        EsPorEquipos = c.Boolean(nullable: false),
                        ParticipantesEncuentro = c.Int(nullable: false),
                        MaximoParticipantesEquipo = c.Int(nullable: false),
                        TipoEncuentro = c.Int(nullable: false),
                        TipoEvento = c.Int(nullable: false),
                        DuracionEncuentro = c.Int(nullable: false),
                        PartesPorEncuentro = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Eventoes", "MaximoNumeroParticipantes", c => c.Int(nullable: false));
            AddColumn("dbo.Eventoes", "ClaseEvento_Id", c => c.String(maxLength: 128));
            AlterColumn("dbo.Actividads", "Nombre", c => c.String(maxLength: 200));
            AlterColumn("dbo.Actividads", "Descripcion", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Eventoes", "Nombre", c => c.String(maxLength: 200));
            AlterColumn("dbo.Eventoes", "Descripcion", c => c.String(maxLength: 1000));
            CreateIndex("dbo.Eventoes", "ClaseEvento_Id");
            AddForeignKey("dbo.Eventoes", "ClaseEvento_Id", "dbo.ClaseEventoes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Eventoes", "ClaseEvento_Id", "dbo.ClaseEventoes");
            DropIndex("dbo.Eventoes", new[] { "ClaseEvento_Id" });
            AlterColumn("dbo.Eventoes", "Descripcion", c => c.String());
            AlterColumn("dbo.Eventoes", "Nombre", c => c.String());
            AlterColumn("dbo.Actividads", "Descripcion", c => c.String());
            AlterColumn("dbo.Actividads", "Nombre", c => c.String());
            DropColumn("dbo.Eventoes", "ClaseEvento_Id");
            DropColumn("dbo.Eventoes", "MaximoNumeroParticipantes");
            DropTable("dbo.ClaseEventoes");
        }
    }
}
