namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ClaseEvento_Encuentro : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Encuentroes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Ronda = c.Int(nullable: false),
                        Evento_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Eventoes", t => t.Evento_Id)
                .Index(t => t.Evento_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Encuentroes", "Evento_Id", "dbo.Eventoes");
            DropIndex("dbo.Encuentroes", new[] { "Evento_Id" });
            DropTable("dbo.Encuentroes");
        }
    }
}
