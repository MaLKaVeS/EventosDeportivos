namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ActividadesEventos : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Actividads",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Nombre = c.String(),
                        Descripcion = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Eventoes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Nombre = c.String(),
                        Descripcion = c.String(),
                        FechaCreacion = c.Int(nullable: false),
                        HoraCreacion = c.Int(nullable: false),
                        FechaInicio = c.Int(nullable: false),
                        HoraInicio = c.Int(nullable: false),
                        FechaFin = c.Int(nullable: false),
                        HoraFin = c.Int(nullable: false),
                        Estado = c.Int(nullable: false),
                        EstadoRegistro = c.Int(nullable: false),
                        Actividad_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Actividads", t => t.Actividad_Id)
                .Index(t => t.Actividad_Id);
            
            AddColumn("dbo.Rols", "Descripcion", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Eventoes", "Actividad_Id", "dbo.Actividads");
            DropIndex("dbo.Eventoes", new[] { "Actividad_Id" });
            DropColumn("dbo.Rols", "Descripcion");
            DropTable("dbo.Eventoes");
            DropTable("dbo.Actividads");
        }
    }
}
