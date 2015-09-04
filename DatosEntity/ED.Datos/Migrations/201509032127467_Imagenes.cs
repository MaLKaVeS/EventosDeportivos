namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Imagenes : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Actividads", "Imagen", c => c.String(maxLength: 1000));
            AddColumn("dbo.Actividads", "Icono", c => c.String(maxLength: 1000));
            AddColumn("dbo.Actividads", "ImagenPortada", c => c.String(maxLength: 1000));
            AddColumn("dbo.Encuentroes", "Lugar", c => c.String(maxLength: 1000));
            AddColumn("dbo.Encuentroes", "Hora", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Encuentroes", "Hora");
            DropColumn("dbo.Encuentroes", "Lugar");
            DropColumn("dbo.Actividads", "ImagenPortada");
            DropColumn("dbo.Actividads", "Icono");
            DropColumn("dbo.Actividads", "Imagen");
        }
    }
}
