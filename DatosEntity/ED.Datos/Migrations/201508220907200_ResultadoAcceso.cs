namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ResultadoAcceso : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Accesoes", "Resultado", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Accesoes", "Resultado");
        }
    }
}
