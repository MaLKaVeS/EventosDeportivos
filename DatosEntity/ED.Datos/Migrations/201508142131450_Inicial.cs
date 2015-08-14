namespace ED.Datos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Inicial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Accesoes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Credencial = c.String(),
                        Fecha = c.Int(nullable: false),
                        Hora = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Credencials",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        PasswordHash = c.String(),
                        Intentos = c.Int(nullable: false),
                        FechaDesbloqueo = c.Int(nullable: false),
                        Usuario_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Usuarios", t => t.Usuario_Id)
                .Index(t => t.Usuario_Id);
            
            CreateTable(
                "dbo.Usuarios",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(),
                        Nombre = c.String(),
                        Apellidos = c.String(),
                        FechaAlta = c.Int(nullable: false),
                        FechaNacimiento = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Rols",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Nombre = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RolUsuarios",
                c => new
                    {
                        Rol_Id = c.String(nullable: false, maxLength: 128),
                        Usuario_Id = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Rol_Id, t.Usuario_Id })
                .ForeignKey("dbo.Rols", t => t.Rol_Id, cascadeDelete: true)
                .ForeignKey("dbo.Usuarios", t => t.Usuario_Id, cascadeDelete: true)
                .Index(t => t.Rol_Id)
                .Index(t => t.Usuario_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Credencials", "Usuario_Id", "dbo.Usuarios");
            DropForeignKey("dbo.RolUsuarios", "Usuario_Id", "dbo.Usuarios");
            DropForeignKey("dbo.RolUsuarios", "Rol_Id", "dbo.Rols");
            DropIndex("dbo.RolUsuarios", new[] { "Usuario_Id" });
            DropIndex("dbo.RolUsuarios", new[] { "Rol_Id" });
            DropIndex("dbo.Credencials", new[] { "Usuario_Id" });
            DropTable("dbo.RolUsuarios");
            DropTable("dbo.Rols");
            DropTable("dbo.Usuarios");
            DropTable("dbo.Credencials");
            DropTable("dbo.Accesoes");
        }
    }
}
