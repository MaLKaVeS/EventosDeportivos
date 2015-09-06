namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PerfilEvento_Keys : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("PerfilEventoes");
            AlterColumn("PerfilEventoes", "Perfil_Id", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("PerfilEventoes", "Evento_Id", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("PerfilEventoes", new[] { "Perfil_Id", "Evento_Id" });
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.PerfilEventoes");
            AlterColumn("dbo.PerfilEventoes", "Evento_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.PerfilEventoes", "Perfil_Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.PerfilEventoes", new[] { "Perfil_Id", "Evento_Id" });
        }
    }
}
