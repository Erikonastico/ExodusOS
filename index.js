//Loading//
const Discord = require('discord.js');
const client = new Discord.Client();
const Canvas = require('canvas');
const db = require('./db');

//Third Party Code//
//pSBC - Color Lightner|Darkner//
// Version 4.0, made by Pimp Trizkit//
const pSBC=(p,c0,c1,l)=>{
	let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
	if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
	if(!this.pSBCr)this.pSBCr=(d)=>{
		let n=d.length,x={};
		if(n>9){
			[r,g,b,a]=d=d.split(","),n=d.length;
			if(n<3||n>4)return null;
			x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
		}else{
			if(n==8||n==6||n<4)return null;
			if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
			d=i(d.slice(1),16);
			if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
			else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
		}return x};
	h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
	if(!f||!t)return null;
	if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
	else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
	a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
	if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
	else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

//Start of Program//

client.once('ready', () => {
    console.log("Started");
    });

//Command Reciever//
client.on('message', message => {

    if (message.content == "& userspecifus") {
        message.channel.send(message.author.id);
    }

    //Admin//
    const admin = ["619503488057212958", "412272950348218371", "357600192112885760"];
    var isAdmin = 0;
    for (i = 0; i < admin.length; ++i)  {
       if (message.author.id == admin[i]) {
            isAdmin = 1;
        }
    };

    if (message.content == "!end" && isAdmin == 1) {
        function end() {
            message.channel.send("*The end is coming! 10 seconds.*");
            setTimeout(() => true_end(), 10000)
        }
        async function true_end() {
            await message.channel.send("*End. Bot is in maintenance!*");
            client.destroy();
        }
        (async() => {
        message.channel.send("*The end is near! The bot will be inactive in 20 seconds.*");
        setTimeout(() => end(), 10000);
        })()
    }

    //Global Variables//
    
    var author_id = message.author.id;
    var randomValue = [];
    var splitedMessage = message.content.split(" ");
    var specialMessage = "";
    var additionalValue = [];
    const operations = /[*+-/]/g;

    //Flags//
    var flag = [];
    var flag_adv = [];
    var flag_advAnotation = 0;
    var flag_haveOperations = 0;
    var flag_securityChecked = 1;
    var flag_complexity = 1;

    //Facility Variables//
    command = splitedMessage[0];

    //Event Modules//
    async function testando() {
        if (setter == 0) {
        mensagem += "```\nExodus OS <FS>\nCreated by Carlos Airen\n-----------------\n";
        setter = 1;
        id_mensagem = await message.channel.send(mensagem + "```");
        }
        else {
        mensagem_parts = object_parts.parts[it];
        await id_mensagem.edit(mensagem + mensagem_parts);
        ++it;
        console.log(it);
        }
        if (it > 5) {
        console.log("Worked");
        }
        else {
        setTimeout(() => testando(), object_parts.interval[it]);
        }
    }
    const object_parts = {
        parts: [">```", "> Loading sectors...```", "Sectors loaded.\n> Loading Darkness...```", "Sectors loaded.\nDarkness loaded.\n> Loading structures...```", "Sectors loaded.\nDarkness loaded.\nStructures loaded.\n> Core system loading...```", "Sectors loaded.\nDarkness loaded.\nStructures loaded.\nCore system loaded.\nSystem started.```"],
        interval: [1200, 2000, 6000, 2000, 4000, 12000]
    }

    if (command == "|repeat") {
        (async() => {
        await message.delete({timeout: 100});
        setTimeout(() => testando(), 1200)
        console.log("Terminou!");
        })();
    }

    /*File Modules
    ---------------*/

    //Security Level: Admin//
    let setter = 0;
    let mensagem = "";
    let it = 0;
    let id_mensagem = "";

    if (isAdmin == 1) {
        
        //Register//  
        if (command == "|register") {
            (async() => {
            const id = await db.select_built('SELECT COUNT(archive_id) FROM Arquivos');
            let count;
            if (id.count == undefined) {
                count = 1;
            }
            else {
                count = Number(id.count) + 1;
            }
            console.log(count);
            const about = splitedMessage[1];
            const file_type = Number(splitedMessage[2]);
            const content = splitedMessage[3];
            const table = {
                text: 'INSERT INTO Arquivos VALUES ($1, $2, $3, $4)',
                values: [count, about, file_type, content]
            }
            await db.select_built(table);
        })()
        }

        //Verify//
        if (command == "|verify") {
            (async() => {
            const result = await db.select_built('SELECT * FROM Arquivos');
            if (result.length > 0) {
            message.channel.send("The files are:\n");
            for (i = 0; i < result.length; ++i) {
                await message.channel.send("Id: " + result[i].archive_id + "\nAbout: " + result[i].about + "\nFile_Type: " + result[i].file_type + "\nText: " + result[i].content);
            }
            }
            else {
            message.channel.send("No files here. Please insert some.")
            }
            })()
        }

        //Cleanse//
        if (command == "|cleanse") {
            (async() => {
                await db.select_built('DELETE FROM Arquivos');
                message.channel.send("Nuked! Todos os dados foram deletados!");
            })()
        }
    }
    
    //Security Level — Common//
    //Menu//
    if (command == "!menu") {
        (async() => {
        const filter = (reaction, user) => {
            return ((reaction.emoji.name === '⬇️' || reaction.emoji.name === '⬆️') && user.id === message.author.id)
        };
        const a = await message.channel.send("```\nExodusOS 1.3 (FS)\n\n> Play\n  Options```");
        await a.react('⬆️');
        await a.react('⬇️');
            a.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                if (collected.emoji.name === '⬇️') {
                a.edit("```\nExodusOS 1.3 (FS)\n\n  Play\n> Options```");
                }
                else if (collected.emoji.name === '⬆️') {
                a.edit("```\nExodusOS 1.3 (FS)\n\n> Play\n  Options```");
                }
            })
            .catch(collected => {
                message.channel.send('The menu has ended.');
            });
        })()
    }

    /*Macro Modules
    ---------------*/
    if (command == "!macro") {
        (async() => {
            const table = {
                text: 'SELECT config_object FROM Dados WHERE user_id = $1',
                values: [author_id]
            }
            let macro2 = await db.select_built (table);
            macro_prepared = macro2.config_object.replace(/macro=/g, "");
            console.log("Status: " + macro_prepared);
            if (macro_prepared == 'on') {
                message.channel.send("Sorry! No macro here. <pog>");
                await db.update('Dados', 'config_object = \'macro=off\'', `user_id = '${author_id}'`);
            }
            else {
                message.channel.send("Macro is on, buddy!");
                await db.update('Dados', 'config_object = \'macro=on\'', `user_id = '${author_id}'`);
            }
        })()
    }

       //Verifier//
    async function verify(author) {
            const table = {
                text: 'SELECT config_object FROM Dados WHERE user_id = $1',
                values: [author]
            }
            const macro_info = await db.select_built(table);
            if (macro_info == undefined) {
                console.log("Register");
                const table2 = {
                    text: 'INSERT INTO Dados VALUES ($1, $2)',
                    values: [author_id, 'macro=off']
                }
                await db.select_built(table2);
                message.channel.send("Seu nick não estava registrado. Agora esta!");
            }
            const config = macro_info[0].config_object;
            if (config == "macro=on") {
                console.log("Has macro!")
                return 1;
            }
            else if (config == "macro=off") {
                console.log("No macro!")
                return 0;
            }
    }
    //All macro commands are inicialized with $//
    var lmacro = 0;
    if (command.startsWith('$') == 1 || /[0-9]d[0-9]/g.test(command) == 1) {
        (async () => {
        lmacro = await verify(`${author_id}`);
        //Macro Commands//
        if (lmacro == 1) {
            if (/^\$/g.test(splitedMessage[0]) == 1) {
                command = command.replace(/^\$/g, '!titulo');
                message.delete({timeout: 100});
                splitedMessage2 = message.content.split('"');
                Zones(message, splitedMessage, splitedMessage2);
            }
            //Quick Dice Roller Module//
            if (/[0-9]d[0-9]/g.test(splitedMessage[0]) == 1 && (message.author.bot == 0)) {
                flag_activated = 1;
                splitedMessage.unshift("!roll");
                flag_complexity = 0;
                Roll(message, splitedMessage, flag_complexity);
            }
            }
        })()
    }   

    /*Sector Module
    ---------------*/
    async function Zones(message, splitedMessage, splitedMessage2) {

        let image;
        let color;
        let letterColor = "#ffffff"
        let header = "";
        //Types of Destination//
        const Zones = {
            type: ["ZS", "S", "ZR", "SP", "SEX", "SET", "ZM", "SR", "SC"],
            image: ['./Setores/Zona Segura.png', './Setores/Zona Selvagem.png', './Setores/Zona Restrita.png','./Setores/Setor Perdido.png',
            './Setores/Setor de Exploracao.png', './Setores/Setor de Extracao.png', './Setores/Zona Morta.png', './Setores/Setor Restrito.png', 
            './Setores/Setor Controlado.png'],
            color: ["#2a5fcf", "#387526", "#bd7a33", "#6d55bd", "#387526", "#387526", "#8a290e", "#bd7a33", "#2a5fcf"]
        }
        texto = splitedMessage2[1];
    
        for (i = 0; i < 10; ++i) {
            if (splitedMessage[1] == Zones.type[i]) {
                header = Zones.type[i];
                image = await Canvas.loadImage(Zones.image[i]);
                color = Zones.color[i];
                letterColor = Zones.color[i];
                if (i == 6) {
                    texto = "Zona Morta";
                }
                else {
                break;
                }
            }
        }
    
        //Canvas Variables//
        let canvas = Canvas.createCanvas(1024, 188);
        const image2 = await Canvas.loadImage('./Setores/FrameBehind.png')
        let ctx = canvas.getContext('2d');
        let informedwidth = 163;
        let informedheight = 183;
    
        if (header == 'SC') {
            informedwidth -= 20;
        }
    
        //Resize//
        let text, fontSize, disloc = 0, mult = 1, setter = 1, k = 0;
        text = texto;
        console.log(text);
        fontSize = 70;
        ctx.font = `${fontSize}px Georgia`;
        console.log(ctx.measureText(text).width);
        if (ctx.measureText(text).width + 320 > canvas.width) {
            text = text.split('');
            console.log(text);
            console.log(Math.floor(text.length/2));
            let char = text[(Math.floor(text.length/2))];
            while (char != ' ' && (text[(Math.floor(text.length/2)+k)] != text.length)) {
                ++k;
                char = text[(Math.floor(text.length/2)+k)];
                disloc = -35;
                mult = 2;
                setter = 0;
                ctx.font = `${fontSize-5}px Georgia`;
            }
            text[(Math.floor(text.length/2)+k)] = `${char}\n`;
            text = text.join("");
        }
    
        // draw color
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      
         // set composite mode
        ctx.globalCompositeOperation = "destination-in";
      
        // draw image
        ctx.drawImage(image, 80, 12, informedwidth, informedheight-18);
    
        //Gradient Build//
        let gradient = ctx.createLinearGradient(0, (canvas.height/2)*mult+20, 0, (canvas.height/2)*setter);
        gradient.addColorStop(0, pSBC(-0.25, letterColor));
        gradient.addColorStop(1, pSBC(+0.05, letterColor));
    
        //Montando Texto//
        ctx.globalCompositeOperation = "source-over";
    
        // Select the style that will be used to fill the text in
        ctx.fillStyle = gradient;
        // Actually fill the text with a solid color
    
        ctx.fillText(text, 325, canvas.height/2+20+disloc);
    
        //Line Draw//
        ctx.lineWidth = 12;
        // First path
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(291, 0);
        ctx.lineTo(291, 188);
        ctx.stroke();
    
        //drawing//
        ctx.drawImage(image2, 20, 0, canvas.width-20, canvas.height);
    
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Setor.png');
        message.channel.send(attachment);
    }

    if (command === '!titulo') {
        message.delete({timeout: 100});
        splitedMessage2 = message.content.split('"');
        Zones(message, splitedMessage, splitedMessage2);
    }

    if (/!r/g.test(command) == 1 && command !== '!roll') {
        console.log("Hello");
        message.content = message.content.replace('!r', '!roll 1d20');
        splitedMessage = message.content.split(" ");
        command = splitedMessage[0];
        console.log("Olá, senhores. " + splitedMessage);
        flag_complexity = 0;
    }
 
    //Dice Roller Module//
	if (command === '!roll') {
        message.delete({timeout: 100});
        Roll(message, splitedMessage, flag_complexity);
    }

    //Core//
    function Roll(message, splitedMessage, flag_complexity) {
        //Message Content Handler//
        let Instruções = splitedMessage[1].split("d");
        let Desvantagem = splitedMessage[1].split("uk");     
        let Vantagem = splitedMessage[1].split("k"); 

        //Restrictions//
        if (/d/g.test(splitedMessage[1]) == 0) {
            flag_securityChecked = 0;
            message.channel.send("**Erro:** Use a notação de rolagem (1d20).");
        }
        if (/k/g.test(splitedMessage[1]) == 1) {
            if (splitedMessage[1].search('k') < splitedMessage[1].search('d')) {
                flag_securityChecked = 0;
                message.channel.send("**Erro:** Coloque o atributo de vantagem/desvantagem depois do atributo de rolagem (1d20k2, não k21d20 ou 1k2d20).");
            }
        }
        if (/[abcefghijlmnopqrstuvwyxz]/g.test(splitedMessage[1]) == 1) {
            if (/uk/g.test(splitedMessage[1]) != 1) {
            flag_securityChecked = 0;
            message.channel.send("**Erro:** Existem outras letras alem de d, k e u.");
            }
        }
        if (Vantagem != splitedMessage[1]) {
            if (Vantagem.length > 2) {
                flag_securityChecked = 0;
                message.channel.send("**Erro:** Só use um modificador de Vantagem/Desvantagem (2d20k1, e não 2d20k1k1).")
            }
            if (operations.test(Vantagem[0]) == 1) {
                flag_securityChecked = 0;
                message.channel.send("**Erro:** Por favor, coloque o operador de Vantagem/Desvantagem junto do de rolagem.");
            }
        }

        if (flag_securityChecked == 1) {
        //Message Additional Handler//
        Instruções[1] = Instruções[1].replace(/uk/, " ");
        Instruções[1] = Instruções[1].replace(/k/, " ");

        //Advantage | Disadvantage Handler//
        if (Desvantagem[1] != undefined) {
            flag_advAnotation = 1;
            console.log("Desvantagem");
            Desvantagem[1] = Desvantagem[1].replace(operations," ");
            DesvantagemImportante = Desvantagem[1];
            DesvantagemImportante = DesvantagemImportante.split(' ')
            while (DesvantagemImportante.length > 1) {
                DesvantagemImportante.pop();
            }
            Desvantagem[1] = DesvantagemImportante;
        }
        else {
            if (Vantagem[1] != undefined) {
                flag_advAnotation = 1; 
              console.log("Vantagem");
                Vantagem[1] = Vantagem[1].replace(operations," ");
                VantagemImportante = Vantagem[1];
                VantagemImportante = VantagemImportante.split(' ')
                while (VantagemImportante.length > 1) {
                    VantagemImportante.pop();
                }
                Vantagem[1] = VantagemImportante;
            }
        }
        if (Desvantagem.length > 1) {
            flag_adv = ["Desvantagem", Desvantagem[1]];
            console.log(flag_adv);
        }
        else {
            if (Vantagem.length > 1) {
                flag_adv = ["Vantagem", Vantagem[1]];
                console.log(flag_adv);
            }
        }

        let contador = -1;
        while (Instruções[0][0] == '(') {
            InstruçõesChar = Instruções[0].split('');
            console.log(InstruçõesChar);
            InstruçõesChar.shift();
            Instruções[0] = InstruçõesChar.join('');
            console.log(Instruções[0]);
            ++contador;
            flag[contador] = 1;
        }

        if (Instruções[0] <= 200) {
            //If starts with 'D', the system deals with it as like as one dice being rolled//
            if (splitedMessage[1][0] === 'd') {
                Instruções.shift();
                Instruções.unshift("1");
            }

        //Operations Handler//
        console.log(Instruções[1]);
        Instruções[1] = Instruções[1].replace(/[+]/g, " + ");
        Instruções[1] = Instruções[1].replace(/[-]/g, " - ");
        Instruções[1] = Instruções[1].replace(/[*]/g, " * ");
        Instruções[1] = Instruções[1].replace(/[/]/g, " / ");
        Instruções[1] = Instruções[1].replace(/[)]/g, " ) ");
        let Dado = Instruções[1].split(" ");
        Dado.unshift(Instruções[0]);

        //Dice Rolling//
        if (Dado[1] <= 1000) { 
        randomValue = randomGenerating(Dado[1], Dado[0]);
        console.log(randomValue);

        //Advantage//
        if (flag_adv[0] != "") {
            console.log("Foi");
            randomValue = arrayOrganize(randomValue);
            console.log("Psi: " + randomValue);
            console.log("Valores: " + randomValue.length + ", " + flag_adv[1])
            let baseCont = randomValue.length - flag_adv[1];
            console.log("Ole: " + baseCont);
            for (i = baseCont; i > 0; --i) {
                if (flag_adv[0] == "Vantagem") {
                    additionalValue[i-1] = randomValue.pop();
                }
                else {
                    additionalValue[i-1] = randomValue.shift();
                }
            }
            console.log("Valores Adicionais: " + additionalValue);
        }
        console.log("Olá: " + randomValue);

        //Sum//
        Sum = arraySum(randomValue);

        //Dice Array Building//
        for (i = 0; i < randomValue.length; ++i) {
            randomValue[i] = ' "' + randomValue[i] + '"';
        }
        for (i = 0; i < additionalValue.length; ++i) {
            if (flag_adv[0] == "Vantagem") {
                randomValue.push(' ' + additionalValue[i]);
            }
            else if (flag_adv[0] == "Desvantagem") {
                randomValue.unshift(' ' + additionalValue[i]);
            }
        }        
        let Valor_Dado = Dado[1];
        Dado[1] = Sum;
        Dado.shift();

        //Array of previous calculated functions//
        let Junction = "";
        for (i = 0; i < Dado.length; ++i) {
            if (flag_advAnotation == 1 && i == 1) { 
            }
            else {
            Junction += Dado[i] + " "; 
            }
        }
        console.log("Hello: " + Junction);
        let contador = 0;
        while (flag[contador] == 1) {
            ++contador;
            Junction = Junction.split('');
            Junction.unshift('(');
            Junction = Junction.join('');
            }
        console.log("Teste: " + Junction);
        Junction = eval(Junction);

        //Verificação de Operações Adicionais//
        //Funções//

        //Media//
        function array_media (array, soma_array) {
            media = soma_array/array;
            specialMessage += "\nA media entre as rolagens é: " + media + ";"; 
        }

        //Comparação//
        function comparação (valor) {
        
        //Substituição dos Operadores//
        valor = valor.replace(/>=/g, " >= ");
        valor = valor.replace(/<=/g, " <= ");
        valor = valor.replace(/[>]/g, " > ");
        valor = valor.replace(/[<]/g, " < ");
        //Após identificar os operadores, split separa eles dos valores de rolagem.//
        let ComparaçõesFinal = valor.split(" ");
        let ComparaçõesFinal2 = "";
        ComparaçõesFinal.shift();
        //Monta o Array de Comparação//
        ComparaçõesFinal.unshift(Junction);
        for (j = 0; j < ComparaçõesFinal.length; ++j) {
            ComparaçõesFinal2 += ComparaçõesFinal[j];
        }
        ComparaçõesExpressão = ComparaçõesFinal2;
        ComparaçõesFinal2 = "if (" + ComparaçõesFinal2 + ') { ComparaçõesFinal2 = "Verdadeira" } else { ComparaçõesFinal2 = "Falsa" }';
        
        //Resolve a operação, e devolve "Verdadeira" caso seja verdadeiro e "Falsa" caso seja falso//
        
        eval(ComparaçõesFinal2);
        specialMessage += "\nA expressão verificada (" + ComparaçõesExpressão + ") é " + ComparaçõesFinal2 + ";"; 
        }

        //Central de Execução//
        let Hello = [];
        let Hello2 = [];
        let sumArray = 0;
        for (i = 2; i < splitedMessage.length; ++i) {
            Hello = splitedMessage[i].match(/>/g);
            Hello2 = splitedMessage[i].match(/</g);
            if (splitedMessage[i] === 'media') {
                flag_haveOperations = 1;
                console.log("Media: " + splitedMessage.length);
                array_media(randomValue.length-additionalValue.length,Sum);
            }
            else if (splitedMessage[i][0] == ">" || splitedMessage[i][0] == "<") {    
                sumArray = 0;
                if (Hello != null) {
                    console.log("Hi!")
                    sumArray += Hello.length;
                }
                if (Hello2 != null) {
                    console.log("Hi!")
                    sumArray += Hello2.length;
                }
                console.log("Preste atenção: " + sumArray);
                   if (sumArray < 2) {
                    flag_haveOperations = 1;
                    console.log("Comparação: " + splitedMessage.length);
                    comparação(splitedMessage[i]);
                    }
            }
        }

        //Additional Problem Handler//
            if (flag_complexity == 1) {
            var messageToSend = `**A rolagem foi concluida, <@${author_id}>` + '.**\n```bash\nRolagem: ' + Instruções[0] + 'd' + Valor_Dado + ' = [' + Sum + ']\nValor com Operadores (' + splitedMessage[1] + ') = '+ Junction + '\nValores Individuais: [' + randomValue + ' ]';
            }
            else {
            var messageToSend = `<@${author_id}> rolou ${splitedMessage[1]} [${Junction}]`
            }
            if (typeof(splitedMessage[2]) != "undefined") {
                if (flag_haveOperations == 0) {
                    message.channel.send("**Erro:** Você colocou uma operação não existente. Tente digitar operações validas como 'media'."); 
                }
                else if (flag_haveOperations == 1) {
                    if (flag_complexity == 1) {
                        messageToSend += '\nOperações Especiais:' + specialMessage + "```";
                    }
                    else if (flag_complexity == 0) {
                        messageToSend += specialMessage;
                    }
                    else {
                        console.log("Enviou");
                        message.channel.send("Estado de variavel estranho. Você deve ter feito algo errado.");
                    }
                    console.log("Enviou");
                    message.channel.send(messageToSend);
                }
                }
                else if (flag_complexity == 1) {
                    console.log("Enviou");
                    messageToSend += "```";
                    message.channel.send(messageToSend);
                }
                else {
                    console.log("Enviou");
                    message.channel.send(messageToSend);
                }
        }     
        else {
            message.channel.send("**Erro:** Na rolagem normal, dados acima de 1000 faces não são permitidos. Tente novamente.");
        }
}
else {
    message.channel.send("**Erro:** Na rolagem normal, só aceitamos rolar de 1 à 200 dados. Tente novamente.");
}
        }
    }

//Modulo - Conquista//
if (command === '!conquista' && isAdmin == 1) {
    const Conquista = {
        index: ["Comum;", "Raro;", "Epico;", "Lendario;", "Extraordinario;", "Lore;", "Newsletter;"],
        color_value: ["#fffffe", "#037ffc", "#6d38f6", "#ffc737", "#ff7300", "#bbbcc2", "#bbbcc2"]
    }
    let color_index; 
    let flag_index = 0;

    //Lore//
    if (splitedMessage[1] == Conquista.index[5]) {
        let Aspas = message.content.split('; ');
        const Embed = new Discord.MessageEmbed()
        .setColor(Conquista.color_value[5])
        .setAuthor(Aspas[1])
        .setTitle(Aspas[2])
        .setDescription(Aspas[3])
        .setFooter(`\nMestre: ${message.author.username}`);
        if (Aspas.length > 4 && (Aspas.length % 2) == 0) {
            for (i = 4; i < Aspas.length; i = i + 2) {
                Embed.addField(Aspas[i], Aspas[i+1]);
            }
        }
        message.channel.send(Embed);
    }
    else
    {
    for (i = 0; i < 7; ++i) {
        if (splitedMessage[1] == Conquista.index[i]) {
            color_index = Conquista.color_value[i];
            flag_index = 1;
        }   
    }
    if (flag_index == 0) {
        message.channel.send("**Erro:** Você digitou um tipo de conquista que não existe.");
    }
    else if (flag_index == 1) {
    let Aspas = message.content.split('; ');
    const Embed = new Discord.MessageEmbed()
    .setColor(color_index);
    for (i = 1; i < Aspas.length; ++i) {
        switch(i) {
            case 1:
                Embed.setTitle(Aspas[i]);
            break;
            case 2:
                Embed.setDescription(Aspas[i]);
            break;
            case 3:
                if (splitedMessage[1] != "Newsletter;") {
                    Embed.setFooter(Aspas[3] + `\nMestre: ${message.author.username}`);
                }
                else {
                    Embed.setFooter(Aspas[3]);
                }
            }  
    }   
    if (Aspas.length > 4) {
        let AspasTamanho = Aspas.length;
        if (/image/g.test(Aspas[AspasTamanho]) == 1) {
            --AspasTamanho;
        }
        for (i = 4; i < AspasTamanho; ++i) {
            Aspas2 = Aspas[i].split('(');
            Aspas2.shift();
            console.log(Aspas2);
            for (j = 0; j < 3; ++j) {
                if (Aspas2[j] != undefined) {
                    Aspas2[j] = Aspas2[j].replace(/[)]/g, "");
                    console.log(Aspas2);
                    }
                }
            if (Aspas2[2] != undefined) {
                if (Aspas2[2] == "inline") {
                    Embed.addField(Aspas2[0], Aspas2[1], true);
                }
            }
            else {
                Embed.addField(Aspas2[0], Aspas2[1]);
                }
        }
    }
    Aspas3 = message.content.split(/image=/);
    if (Aspas3.length > 1) {
        Embed.setImage(Aspas3[1]);
    }
    message.channel.send(Embed);
}
}
}

    //Webhook Module//
    async function WebhookOperator(message, webhookMessage, webhookName) {

        //Object//
        const webhooks = {
            type: ["Exodus", "Solaris", "Mercurio", "Terra", "Eldunari", "Kindergarten"],
            image_link: ["https://cdn.discordapp.com/attachments/752322158386085978/785909310030741533/Exodus2.png", "https://cdn.discordapp.com/attachments/752322158386085978/785910105257410640/Solaris.png",
            "https://cdn.discordapp.com/attachments/752322158386085978/785911058023317524/Mercurio.png", "https://cdn.discordapp.com/attachments/702624141173588069/780556161874133002/Sem_Titulo-2.png",
            "https://cdn.discordapp.com/attachments/752322158386085978/785910168135139328/Eldunari.png", "https://cdn.discordapp.com/attachments/752322158386085978/785910136308629524/Kindergarden.png"]
        }

        const channel_to_go = message.channel;
        const webhook = await client.fetchWebhook("770268256371736598", "sNEevSMxq3FsmRnbI958aRZWqA3fJqoysMnM2evarPVb8Gp1ctm3ulsfwgG4cRsUYwpw");
        let index = webhooks.type.indexOf(webhookName);
        if (index == -1) {
            var webhookImage = webhooks.image_link[0];
        }
        else if (index != -1) {
            var webhookImage = webhooks.image_link[index];
        }
        await webhook.edit({
            name: webhookName,
            avatar: webhookImage,
            channel: channel_to_go
        });
        await webhook.send(webhookMessage);
    }

    //Command - Webhook//
    splitedByArrow = message.content.split(/ -> /g);
    if (splitedByArrow.length > 1 && isAdmin == 1) {
        message.delete();
        let command_array = [];
        command_array = message.content.split(/ -> /g);
        console.log(command_array);
        WebhookOperator(message, command_array[1], command_array[0]);
    }

    //Funções Auxiliares//
    function randomGenerating(dice, number) {
        let array = [];
            for (number; number > 0; --number) {
                array[number-1] = Number(Math.floor((Math.random() * dice) + 1));
            }
        return array;
    }
    function arraySum(value) {
        let sum = 0;
        for (i = value.length; i > 0; --i) {
            sum += value[i-1];    
        }
        return sum;
    }
    function arrayOrganize(value) {
        let medium = 0;
        for (i = 0; i < value.length; ++i) {
            for (j = 0; j < value.length; ++j) {
                if (value[i] > value[j]) {
                    medium = Number(value[i]);
                    value[i] = Number(value[j]);
                    value[j] = Number(medium);
                }
            }
        }
        console.log(Number(value));
        return value;
    }
})
client.login();
