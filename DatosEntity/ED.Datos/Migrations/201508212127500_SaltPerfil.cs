namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SaltPerfil : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Credencials", "Salt", c => c.String());
            AddColumn("dbo.Credencials", "HoraDesbloqueo", c => c.Int(nullable: false));
            AddColumn("dbo.Credencials", "Estado", c => c.Int(nullable: false));
            AddColumn("dbo.Usuarios", "HoraAlta", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Usuarios", "HoraAlta");
            DropColumn("dbo.Credencials", "Estado");
            DropColumn("dbo.Credencials", "HoraDesbloqueo");
            DropColumn("dbo.Credencials", "Salt");
        }
    }
}
