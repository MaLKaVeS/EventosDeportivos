﻿CREATE TABLE [dbo].[Accesoes] (
    [Id] [nvarchar](128) NOT NULL,
    [Credencial] [nvarchar](max),
    [Fecha] [int] NOT NULL,
    [Hora] [int] NOT NULL,
    CONSTRAINT [PK_dbo.Accesoes] PRIMARY KEY ([Id])
)
CREATE TABLE [dbo].[Credencials] (
    [Id] [nvarchar](128) NOT NULL,
    [PasswordHash] [nvarchar](max),
    [Intentos] [int] NOT NULL,
    [FechaDesbloqueo] [int] NOT NULL,
    [Usuario_Id] [nvarchar](128),
    CONSTRAINT [PK_dbo.Credencials] PRIMARY KEY ([Id])
)
CREATE INDEX [IX_Usuario_Id] ON [dbo].[Credencials]([Usuario_Id])
CREATE TABLE [dbo].[Usuarios] (
    [Id] [nvarchar](128) NOT NULL,
    [Email] [nvarchar](max),
    [Nombre] [nvarchar](max),
    [Apellidos] [nvarchar](max),
    [FechaAlta] [int] NOT NULL,
    [FechaNacimiento] [int] NOT NULL,
    CONSTRAINT [PK_dbo.Usuarios] PRIMARY KEY ([Id])
)
CREATE TABLE [dbo].[Rols] (
    [Id] [nvarchar](128) NOT NULL,
    [Nombre] [nvarchar](max),
    CONSTRAINT [PK_dbo.Rols] PRIMARY KEY ([Id])
)
CREATE TABLE [dbo].[RolUsuarios] (
    [Rol_Id] [nvarchar](128) NOT NULL,
    [Usuario_Id] [nvarchar](128) NOT NULL,
    CONSTRAINT [PK_dbo.RolUsuarios] PRIMARY KEY ([Rol_Id], [Usuario_Id])
)
CREATE INDEX [IX_Rol_Id] ON [dbo].[RolUsuarios]([Rol_Id])
CREATE INDEX [IX_Usuario_Id] ON [dbo].[RolUsuarios]([Usuario_Id])
ALTER TABLE [dbo].[Credencials] ADD CONSTRAINT [FK_dbo.Credencials_dbo.Usuarios_Usuario_Id] FOREIGN KEY ([Usuario_Id]) REFERENCES [dbo].[Usuarios] ([Id])
ALTER TABLE [dbo].[RolUsuarios] ADD CONSTRAINT [FK_dbo.RolUsuarios_dbo.Rols_Rol_Id] FOREIGN KEY ([Rol_Id]) REFERENCES [dbo].[Rols] ([Id]) ON DELETE CASCADE
ALTER TABLE [dbo].[RolUsuarios] ADD CONSTRAINT [FK_dbo.RolUsuarios_dbo.Usuarios_Usuario_Id] FOREIGN KEY ([Usuario_Id]) REFERENCES [dbo].[Usuarios] ([Id]) ON DELETE CASCADE
CREATE TABLE [dbo].[__MigrationHistory] (
    [MigrationId] [nvarchar](150) NOT NULL,
    [ContextKey] [nvarchar](300) NOT NULL,
    [Model] [varbinary](max) NOT NULL,
    [ProductVersion] [nvarchar](32) NOT NULL,
    CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY ([MigrationId], [ContextKey])
)
INSERT [dbo].[__MigrationHistory]([MigrationId], [ContextKey], [Model], [ProductVersion])
VALUES (N'201508142047118_Inicial', N'ED.Datos.Migrations.Configuration',  0x1F8B0800000000000400ED5BDB6EDC36107D2FD07F10F4D416CECA765E52633781BBB61BA3F1055E3BE85BC09566D742A94B44CA5DA3E897F5A19FD45FE850578AD47DBD8E110479C98AE4E1CCF0CC901C8EFFFBE7DFE9BB8D478D0788981BF833F360B26F1AE0DB81E3FAEB9919F3D5AB37E6BBB7DF7F373D75BC8DF131EFF75AF4C3913E9B99F79C874796C5EC7BF0089B78AE1D052C58F1891D78167102EB707FFF67EBE0C002843011CB30A637B1CF5D0F921FF8731EF836843C26F4227080B2EC3BB62C1254E39278C04262C3CC3C3D999C101E30D338A62EC1F9174057A6417C3FE084A37447770C163C0AFCF522C40F84DE3E8680FD568432C8A43E2ABBF75560FF502860950373283B663CF006021EBCCE2C62A9C347D9D52C2C86363B45DBF247A17562B799796CDBC002D350A73A9AD348742B8D3A49BBEE19F987BD62CD911AE2DF9E318F298F2398F910F388D03DE33A5E52D7FE0D1E6F833FC09FF931A5B23C2811B6553EE0A7EB280821E28F37B0CAA43C774CC3AA8EB3D481C530694CAA01AE3852D6342EC8E603F86B7E8F643E7C631A67EE069CFC4B46813BDF4586E3201EC5F8F31205264B0A45BB64A1050F22F8157C880807E79A700E912FE685C4C89AC48A7CF308B0A78D246C9113FFDB4BCEF6A9CEC0BE27F92CE73E7F7D58A3593BC4FB201A8430B54AAAB5125036430F1296DDBF11F18988784D18FB33889CF784DDEF9C8AC81D944A84E86DD89810FA04D892069F630806825D9207779D984E81BD6331895C84BB019AB4B37B374C771189789F8A6E6751E0DD04B4C2E2BCF5D32288231B27BF0D1ABBDC92680D7CA4E31452F4F09AACEF379779229739F588BBFBB07D1978CB08763ECD710894BA4EE993BBDD878E29DF722F4A602E89ED7AAE88254FE5FDC24D59ADEF634BEEB34CF67AF97BE1CCB9BF571AF36030CAD311A9979763BF6F1EFE441EBE2BDFEBDA7BB620A0BAE1D4B2B30F018F190B709F1232940C2CE7AF2A74EA3B469B30A9FD3225D082C8413744D6E1BC33F327CD3E0D7085739570C5FED70A39B5246DDA95ACD9E19B646BDBEE4B09E5A36D7FBD5BCE09DDDAEF4F26073D0D90AE3D5EAF3971D14B7223E06FD8F0BA6305DE9DB398C33272AB2A08C005F0CAD512F95AB22C133EBF746A36A8029496803A14D9BC1D48A5EF682885213B20B2DD411B9FB05A192B59BC0220F9B0D4A5CEC7D5A0DBE16585B0859C564F849C5A124229A41AD4AB7AF5D0B9EED0AC6BDEE5787D5D4FD2A14A9D1663B478DB7626C9836BE16065E2CA4A33577986CB6A48714D2F4818E2B623A5BCB22FC622CD77CD5F2D86A784BC14C3B2594D66A890B69809B751B206A555C40907CEDC88713C6C9025111BDFDCF16ABA65E1A4C1B9F269AA11435FAEDCE9F2FEE2FFD951BC9A9E52C796463B433D3CDCFC1395405ADCA681498A915012D51C5DE6018D3DBFE9F8D3365A8E5A324A73346B43CB323B3250F6A93F469ADA9121D22F3AC2D4526CA92E94A5AD94E22EEAC2F7A245C59947714332EE707EB40DDE0D47AA191919A7DAD21FB14CBB54A42ABE0E649C9C7AD1B82737BE180EB5ECAC3DF8D3B02DF5204FE3C8DD30274B4CC800D9A7FE18F9D54706C9BFF54791B20A3290F47920E7D2BC81C6B6F4F3402C3979A021CA8D2F86BFE9B16E1479C5097538716B47ED86B4C308B7EB05A89EE8B45590CEF0F5B6963AD4D8B4E580ABA7A3B483BE6E8C5ECB21A0EA964498A29876A044D92979A444F9597B9854EA717BF0FAD5DD475A8F0B65B7FEA7821ACB35DF329ED57E7D65DB8E6D8365C24B82E32689987326527A452AAD9FC6DDACD0EE626A9722A6147732E5EE35CDEE41DD3508DAC528ED621AA8FD83EB884BD1E29171F004D7C864F199CEA9D86CCA0E17C47757C0789A94350FF70F0E95828697535C6031E6D05E1506CF9E57F61F4884BB79A467963B53C303DF23F497FC7CEE1F3CB2F951C61BFC5AEF0A666CF156DF3D7ECC4BFD57BC9875AFE15B2DA7FAE23D66451BDEBBC740C97154B5AD96F23DF71DD8CCCCBF92B147C6F9EF9FCAE17BC65584D1EAC8D837FED697A5CD46839FB8BF62BA555E92B7E259F5C56A2B28ED4578FB7826BFFA8EF600FDCDF709C39B76E1F9BA88369A1E430CB885C336DE51F4AE6D47C12ED3E7D38C087DE9D0BE61EF6506E3010ED2FE0A5C7B47A83E32753DFE1E6817A72BFF042870308EEDF4403B27CC268E6E46719B6899B972B72B05E8F7628C60483588849F118A5706C623BC34686986EBC8C5C35048A8A4B17E63EA13308442059ADA720221F8C2E975F5FACCD67CF52F8015D376293FE045BD3361202D5BDD9A352CD857469C21CBF9BCE469CF323C03810694640CE08F5E2461D43F098FAEE678E93C687D0FFBE23C68AA4C515F9C1B12E7CA5F3634569FA4899999E92C056BD2FD316DD36B065A6A533A2A53EA6629DBBB272A38DC5CB952374563C5424D5D4B53554B1D2E36F4C26C165B6E6C98A151F8CEC29AA216A4BDBEA621C3A99E5F94E7908EA21A456535E3BF7D354D6DE14E87A2F569E6BAB859F368F9A515DE41F9D05875757F575F0176521AA4A79D31AE4A7F2087919DB9EB1242E4D27DB02B11B5E873EEAF823CB82B12E55D94FBC90570E260B83D8EB8BB2236C7668C8F2CA985FD48689C243096E09CFB57310F638E2A83B7A495EA5AB141B4CD9FD43F55659E5E854901EC53A88062BAA8025CF9BFC42E750AB9CF6A6E420D1062E7C96EE2622DB9B891AF1F0BA4CBC0EF099499AFD8306FC10B2982B12B7F411E608C6C770C3EC09AD88FF9EB413348F74254CD3E3D71C93A221ECB30CAF1F81339EC789BB7FF033F1BD73E273A0000 , N'6.1.3-40302')

