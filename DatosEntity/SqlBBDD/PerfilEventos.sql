﻿create table `PerfilEventoes` (`Perfil_Id` int not null ,`Evento_Id` int not null ,`FechaInscripcion` int not null ,`HoraInscripcion` int not null ,`Evento_Id1` nvarchar(128) ,`Perfil_Id1` nvarchar(128) ,primary key ( `Perfil_Id`,`Evento_Id`) ) engine=InnoDb auto_increment=0
CREATE index  `IX_Evento_Id1` on `PerfilEventoes` (`Evento_Id1` DESC) using HASH
CREATE index  `IX_Perfil_Id1` on `PerfilEventoes` (`Perfil_Id1` DESC) using HASH
alter table `PerfilParticipantes` add column `FechaCreacion` int not null  
alter table `PerfilParticipantes` add column `HoraCreacion` int not null  
alter table `PerfilParticipantes` modify `Imagen` nvarchar(1000) 
alter table `PerfilParticipantes` modify `Bio` nvarchar(600) 
alter table `PerfilParticipantes` drop column `FechaInscripcion`
alter table `PerfilParticipantes` drop column `HoraInscripcion`
alter table `PerfilEventoes` add constraint `FK_PerfilEventoes_Eventoes_Evento_Id1`  foreign key (`Evento_Id1`) references `Eventoes` ( `Id`) 
alter table `PerfilEventoes` add constraint `FK_PerfilEventoes_PerfilParticipantes_Perfil_Id1`  foreign key (`Perfil_Id1`) references `PerfilParticipantes` ( `Id`) 
INSERT INTO `__MigrationHistory`(
`MigrationId`, 
`ContextKey`, 
`Model`, 
`ProductVersion`) VALUES (
'201509061814154_PerfilEvento', 
'ED.Datos.Migrations.Configuration', 
0x1F8B0800000000000400ED1DD96EE4B8F13D40FEA1D14F4930EBB63DD9C566D0DE85C7C7AE91B1A7617B167933E86EBAAD4447AF0EC74E902FCB433E29BF104AA228DE22294ADDE3187E71F328168BC562559155FAEFBFFF33FFF1390A274F30CD82243E9A1EECED4F27305E26AB205E1F4D8BFCE19BEFA73FFEF0DBDFCCCF56D1F3E497A6DDFBB21DEA196747D3C73CDF7C98CDB2E5238C40B61705CB34C992877C6F994433B04A6687FBFB7F9A1D1CCC20023145B02693F97511E74104AB1FE8E749122FE1262F407899AC6098E172547353419D5C8108661BB08447D3B3D3BD539027D974721C06008D7F03C387E904C47192831C61F7E14B066FF23489D7371B5400C2DB970D44ED1E4098418CF587B6B9E904F60FCB09CCDA8E0DA86591E5496409F0E03DA6C88CEFEE44D729A118A2D919A26DFE52CEBAA2DBD1F478B98459329DF0437D3809D3B2594BD4BDBAE9BB4953F08EAC39628DF2EFDDE4A408F3228547312CF21484EF268BE23E0C967F862FB7C9DF607C14176148E3833042754C012A5AA4C906A6F9CB357CC0585EACA69319DB6FC67724DDA83EF50CD08A23969D4E2EC1F32718AFF347C4CC87DF4F27E7C1335C35259805BEC401E270D4294F0BF4F30A210CEE4348EA290ADDE4490A7F82314C410E570B90E7308DCB7161456401630EBF9314A2964BC4841A3CD1BF4678EA873A87CB47D08C7211E7EF0F2533D383F839497B42B88619E20EC49C64BA6873EE91D28611B550E7B396813BD83A0F9E8215581972366EFDC6DC9E98FB2A89EE53A8C11109280F8C7D0AB3651A6C96956C54D363DFCB60171158C331C659267132D67416498A761FF03D9CF1463D094106CF9E1057991D4254FBB7CDFAB65995839D233659A4F02920ACFD3149420862EB73EB2C437BE4ECD722D8948A653F580B90E6C132D8803887D959BC2CD002A549BF7315D12E88121672856D3FB0B708828061756473352E70F17EE781E2624B88A7450A4AA6F244CF9292B05A731778E6828F52FF4CE41E69FE26F63C89BD05C8B2BF27E9EA67903D0EAE82DF80301F7C10C4A0E50ECAFA6D80CA5A40C2FA3E4C7E2D60CFDD54DA0DBE609D6582F95017D17BA90BE615780AD615FF70D0BF6405480304FE1A86557DF6186CF030ED0077A4D9799A44D749C86CE5A6F6EE2629D26579A426CA26B7205DC3DC517A102C0C44076EFB26373CC98DB30804C3DBEC9D4A999F618E37300C83552B338675421C235BBFBF40E90FA542E60AA90D5140AB2286C09432A4DCEC995482A09A66E767B4ECA0CB894868A40653D988142779812019C90AD4EE4D4E8C6556F9D957666695E3585DA7650F66E78F48E94E706276A2B8D3469111FB4B7BBE6D084F1BE2271023652DB536A2954CC8AEAF8411A5EB79C7766BD9B3BBB5C0B4065D7AB1F202A60F4168CDC762B73726F6C4C497498668949E55770BFDBC410D285A9F7485359673FA63A0734D7FE7C777572A67C86202F499E6AE2D3A42524A1DEA6E492272C4AD77477568858DAE9D2066B48D6502C6D5D0950C243178D5AD4C30F7620053CE399B73FD4D0C7A1283D749BCEA6983357E5B1FEEDA7E303E156B900E2F3BFBDFA17BBAC8BF4058073D9D71152A3E00C9BC7ACD766DEAACEF1860B4496E531067CB224D83953703BFB9A2D0E99A774D23896689EBD47A64D3A09F7034BF4F7DBB4A7DBB4AFD2AD4B1A1C48F5779781E7820506F20CA7B124748D7701D64FC2D705BE8745F7D554490B59A6DCF7047FD1CCB57A94ECED789629A6F60AB7B33CF5DD4D831CD04FCA85A158674935E47C9258C33F05733AF036EFB151E262A96F37C697492C43958E63A0BDAD44F6BB9E98EB322D68EFBADE15161AB89C1E73C213C34F6AC77E2DD6BB9E89091C8AE3E9E7A11AF61B6294A8083DF2C548B37DE70D56A09C3B92F9B2750D5CE1D8A0A968E600BC59EEEB015895C2370270A66696B7C56B988716AA05EEBDC62E0413115F4F33EDAA92B30173396E61B89252BA956F8FCD836B68A520DA31BC3A69D0243CC1B5A0C711B3B35A988E8DB753E88E1223B0FC1BA0D2C32B9796761F4DFB248ECAC601ABE203145330D4BFF4B18DDC3949C54690A2BF5E4171016A8605F582FA63D76E45EC44BBEE381BE23D24E9F20E90648B7437DB78FD523B2EA20C51DDE8BCB552F8C66B1B8E7AB0E4BC540D8C6425DC4ABD2FE28CAF76E664B75163FA4085DD03C77315B27B69764D44357FA63B9E24A7C4FA79A3DE53F2169654CF330888218E19706404571238A898F1C1DE8C603D906F590A48D823C58194B987AC727B7A53B37A5F8AE836F71B7723810C3EAD2DC4CC2A043E831B80F7A4A18C17DEDB25C2C8CEDAC16DAF00CF53A85CC499166C6D2E51C6D8E30F8072DCF5DE4491F226F8DB6A513D47C1BD463D21D3A0537E2E4750A332569F91EB7E5D68C3567ABC1EAFDD161F55A37A293CE5477DEC60A1EDF07485D355EC2E315226F89ACC52A9EC034B5DE1DC7599620F95E52AC7DFBD9BEC663873B8B5713DDD33CCADD5B3E20BD44A40C36887848253E9AFE41C05E018E3C6B6DC19147055A90F319351BFD24252FF455B8E99EEBB718D2C7ADF9BC35EFFCBB67BFBFB727A807C604D0BE3B51A16BF608A5455CF61CCD9C3846AF58A8D1281FFDB084EAE21893F72E031269644E327834A942DEE605A5E4BADF956616AF30ADD6A91F19F98B2625F6CA5B278A44D860B2A089EAAA6AF00D26B9C3EA40527AA1E561F2B25B305AC4D3B76C436CA0BBAEE92B9F85483687D386E0DD6F9D54F5205A59DFA15ECE291C89FC26B5E7009D0F72442260F7A41196BCAFD233113837E75082B0769856379D414CB91611D467E9D5C5970C62CD3EC33724FC744A80373027D7FBA57F349B4E5AD72C1167B5F755A0070F004B3D2807426462071C4A7CC80031D2A50B14511BA538D1BA6807A436EC46804274850E1038884DE85F99001D7DA527B10C98E2CCEF00DF0555C6C9A6186BB1EC06A3E4034316C097E43208E4FEBC8B3AD476575347810FB59D1956A002B9A826B2402FFE92AFC3B824D8138E13AE093BEC490A428B247F7BC8CECB60CEB2586F71E65DF6A6A9C549CD8115021A62688CCC6148A28F691089636E8BDA5BA3D40C3969A0A19891E54941668E8821C8A7E12C53FBD4D642F545B87158CE24724FA49DADE9EA6ABC5273569D781AA25A98ABA68BE64261E121A4849E5A1BD6CC8AA569D51C4D3AE2A8ECD6C1B6A7ECCDA592144AABD6D4AE752387CC92A58F0E4615F5B7F9EE34F4D01AB96666AE6C1B196E1DDEA6EB26ABB3E0E6DEC2A824B6C6EC35367CE9EDCE2A739D325A6EEA0E4F96E6014E07596486B0B129DC9F2C9CF1EB41AC364F8388A54BEAE6B33A33312E98CF14298CE79760B309E23595D218974C6EEA7CC627DFDCD8A7FC8D6A18B325A391F3763919294F52B0865C6D69B0AFE0799066F929C8C13D282FE44E5691A419B6EB159649330C6BBA8B8BD6582A4DFBF27F2C8BD8F4C37CDF9668E7681E115AEC6A4A90392DE41D27650A69108254F22CFC24098B28563D2DD7F5A66D751A8ADA86D741C32F986940B8C81C46FD84990651979843A052F7D260A86211D67CC6AD0BBFE83361D5B9ADC73391218BB5AA81239B29741D234E53F61D86D99A70331A4253660E858926A3413115E6F09A5C04CCBC709905943A0D2E03A42EB2C584E4B8151122553BC3C08C2AE7C4C11A15D58087B5BDFF9FB898CE20CBC85FAADC1C1A9B459686C7D6984354E592A561ABDA988FA2C92E4B0FA469663E16F7329786CF5559C2C49ABB0050EA09D5F298986A96E134B1DA6E3DF9BCB3FC5AF2F5BB23B568DFA59BD46AF52307A1A5E93C8CCC6293C7B2EB44D79843AC33C4D290EA128BD38EA47F65E6454A2DD54E3A6DABA080D29576AAA80A2C5F67235B45DDB429DB991DA2B92631D81D0A0FB0C1D650F61C665FE06456CC52D44563EB035466531A10556CB91FEAACA3C24EA88BEDF68008AA2DB5C48A4E622AE04657EECC4EA86FFB9CB64179056DBF05A4BD5EA32ABBA505555C8138ADB0FC5D80FD9A1BC219860B48A24B1A0429DC9975F3B05C920717F66B650264988562923932F60C5D610F4F3C04D99AB17D2955D6461AC447F11D90AE3F9702483867DA2ABB73500E92ADD999ED425D51F5136D7DC4D9583B03E7F763DCBD7591BDB52C3792ED6D63993D6C0305A7F9A381E0A2319DE9BE5CFA4DD22A1E97A6DC12231938A662287B4CEDB91193F8B11E1CB17E7764451F07AEB3EFF6CD6DBB6B47D5585B6E008150A5A11350AB4AEDF0120091C2B1450A9FCE4E84D6D6D9BAC8A509ED4417B9B4D9CE882DF208D9496E35EF94ED0597B2E7804EAA36199BE0AC6AAB2CDC4D38C31AE36BC26516871E932F8D39EE989AAFED05019D048D79154195DBD29ACAC925129DAAB4A4BE022C5F67B9020AA87C9DDD9A2880725596FB420194AFDB1999C5BE08EBE1C57056BBF4DD95364D9BB68C316BD469D3340BD7E62E63D64C95544D074B4C6026D14F9C5433219999A8A96CD5BDC9BEF5139CD654248CDC354D3590B8A0358FF805DB5B0C97118961742E96A0A419F866D4B09618E147948E1835E1037658F10F31ADD74F16D5A3BD856E9B995F364B28A78ED519957EA6B8F5E3366B9CD0F1BF0AAAD8D98BAC4C664892BF98CDB83757E8039B8CFCDD74077BC7B664557443F4E49D168E07EED1E2B98B7CA49BFD109CA49333BAE64371D1CEC91F0D8EBBC83F03CA21936837D3CB52AE9BD3C5A864B1CC83D61C178D01E581BBCCC3F9768ACB3AC8D09FD584B03FA5075A77B4A9C39CE4A6C94E1E61AA98C59D6288418F2D59ECA39A1F98667D394212D2E848771A923FAE90046FEE145FE867EDEF48BAD3F185D0C8F8E25A27B1EFBCB085478E5004B0EE143F0CC70A0B59186C871B4DC9103A679952479406B7F6650B21FBA6A3022B0DE53544CEC509E8CB05E891E5C444A65E796E81638CBB78AE69E793E7164CE4B0AB6EDBACA7679E5B3071D2FF173CA7266537CF0931DB7C13E261C625E43789D9C6F1D24C2077459E322CBB224B8663B7F900EABAC97482668FD4B93278FAE625CB61543232D8BBF9353C09CB97DA6D834B10070F30CBEB34C5D3C3FD83C3E9E4380C405607D8E3D0F00F7C4635A358F183F765AC385C4533BEBB7DC4790925CB568C3B54FC828D2C0C7B8C6F7BC54F205D3E96AFBCF84F45767ED2CBF64B4F5488373BF6EF22F0FC7B1A9EF1F7901A4841C9193DBE5DE5D29F8AEF360562FC3D23555AD457C510ECD740A5E356DF03B5E30BC9C73FE553DAB787CD7E46DE1FD83A707B10644908772FE8C68CAB4E6BFBC6BA5B655D3A2EBB067D1FD8CB3C361ADB1D8E2AF2DA5D1A6B42ACDD817271D53D0151A6A11B144900B53B3059C0B4F7734C7519FCBAA4011BD3EC41B7A9439B3D006AA39BDD19450868EEA772F981C47EC4D905027D5FC5338C9085F9225EC1E7A3E93FABBE1F26177FB96BBBBF9B7C4E913DF261B23FF997C86B5E4E55F917185ED51EC2A15F1E785E7E363B81A2A2A17D592C751473BF2DD4178610FCEC5DEE0B31C5AF8B593DB29846E7338067BC2006F7DAAF6B89483CB11F25D5F598E0608C705674BD87795DCBCC4422BB2F351B7FEC0E672007C1C740EF1EF8CEC11E64A3BDFA1D483EE0B017F90E5B8D06E0BECFBE6E4551719FFCBAF63C8EB4EE6F47F7379FFB40C0C1D59E45455FAFB617B77A1353D9138DFE60FA9B89B238EA1EF8B4777F0EA284F41E4392BCF97077CF87BB6B67B6A75DEA51645481D3FD30E909A2BFC8E163ADFB3AC5A541D5AF5051E39FFC39A0C6821841CC4A43BBC790B3D5CA0FE2C46BC3C33BDC1966DC8683C435A2F45B56929A1DEB4CBCB80F44B7FE1E810E1677B76085F8700F3E2E3E38DC972F5500E94A762F80F810F0E19C79EA077B669243F3964DD25AF372B64BDC500379D4997B682A826EE6AEAE7801453F11ED63101CF83C47E937842E2E4FD27D84F35315396EB61194F1DF62535D785BD7366886712066DDD59490BB79F1697191247E2FB833DA9FFD0C26F3E5DEEA37FBA9DE03E181F3E7F81486308793522D2D9F879E806C09562219CBB7B99A919978D61601C527E8C5EF1223568369A9778152832ADDD18198C261910671A9C387D48CB93686BA623921028DAF39851B18974AA0383D93D1D4691508608EB45D93B7F8C0746732066AD9646BA658B057C63836CB392EF3E823A84760A0AE6FD7BAF18FF88D700692F8385AF8B4F5D7CE07DA4F58EC201F8817A9AA2F7D52EBC8050E8B5F4DB7E20AC95DAEDD97E93D7189EEAB5FDEF9A4EB025B316A57E8F37638663C09B22BBC32A24471E494AD4B16DBEF30FB5CE50E2E92BF13A28750B41884971C17B8275B997E6441E258E94ED231067B693F4B3DD861C5BE6FA7BE0AFD1A0E2565F6C39D3C88BABEC64D2B9E7C6E8B46F3A4CB779A0FF41F74DC26277467DE18F3B0917E7BDB65DD4C8F10F9B13110178CC8009A0F555878CF47D549355F5F1F800398FB09513D19541A8CC707EA5B982E5690A639189B1716924FCE8FA8686E9347B6A3565AF3CB4299CB61107E3963933F905B65FE4BF7FC8AE23C2244FBA9F2184C5AFF3E512BEB8A3AD1C3D174755FAE7B7D4350D789B9FE25D0896E2A19A04DC7261D0357778FC2E83EC2386C9A2FC94854038329D12E3E712CAA523A14A9EF1E88B8158451DADC9A9221DAACCD1DF0ABDB160176552A838B2ABA612A8C4D6114453BD9B88ACFF17561221378021AB246321CC47616A4D04DBF63CA26C3A8D85EC7F1C6CC4E5EDC08E0498D0C3EF9F086D92A29E7C056AB57C6783EF43D8D8CF5B53BABAD17076273F568EE422754CB76DCAE04E9FCA5299917FE2D1C37F21B2BB61B29E6EFBFD8C9D84E14DFE1754D549E824AE66AA5B056A03CFA846589D5C5F976DD4C7999AE781EF169DDFB4F577BB52299B8F9558CCABF45CD842AD590412DEF5559A707218B861B4C6F1BBC70C536C86192BF59248BAD73DDEF344D9CE91440458BFEA41332144B08A575137BDB48EC614CE7C2F5364D4623574E54E32754F94369F947976F6BBA423E590DFB4B9D3D6EA8AADC7B3246F62606B944A92AF9A7F16C7998AC4C9F1473667A9E32F6CC744D59E6C0195098F92685906D92D4CD67B5B68C0BD04F21ABE47C765DA0DE51FD78707E0AB360DD82285365C670C93838489B8BF821697C2D1C464D133E8A069619D472708C28F5009639AA5EC22C0BE2F574F20B088B92BBA27BB8BA883F17F9A6C8D19461741FBED0C428FD35BAF1E73301E7F9E74DF92BF33105842612D439FC1C7F2C827045F03E973CCD5480281D413854A45CCBBC0C1959BF104857496C0808938FF8AF6E61B40911B0EC737C039EA00B6E5F32F809AEC1F265819383AA81742F044BF6F96900D62988320CA3ED8F7E221E5E45CF3FFC0F78B4A7D90EEC0000, 
'6.1.3-40302');
