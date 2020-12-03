//Login//
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

//Mensage Listening//
client.on('message', message => {
    //Variable Declaration//
    var author_id = message.author.id;
    var randomValue = [];
    var mensagemDividida = message.content.split(" ");
    var mensagem_especial = "";
    const operações =/[*+-/]/g;

    //Module - Dice Rolling//
	if (mensagemDividida[0] === '!roll') {
        let Instruções = mensagemDividida[1].split("d");
         //Se começar com d//
         if (mensagemDividida[1][0] === 'd') {
            Instruções.shift();
            Instruções.unshift("1");
            console.log(Instruções);
        }
        //Tratamento de Operações//
        console.log(Instruções[1]);
        Instruções[1] = Instruções[1].replace(/[+]/g, " + ");
        Instruções[1] = Instruções[1].replace(/[-]/g, " - ");
        Instruções[1] = Instruções[1].replace(/[*]/g, " * ");
        Instruções[1] = Instruções[1].replace(/[/]/g, " / ");
        let Dado = Instruções[1].split(" ");
        Dado.unshift(Instruções[0]);
        console.log("Antes da rolagem: " + Dado);

        //Execução da Rolagem//
        randomValue = randomGenerating(Dado[1], Dado[0]);
        if (typeof randomValue != "undefined") {
            message.delete({timeout: 1000})  
        }

        //Soma//
        Sum = arraySum(randomValue);

        //Rearranjo//
        for (i = 1; i < randomValue.length; ++i) {
            randomValue[i] = " " + randomValue[i];
        }
        console.log(randomValue);        
        //Rearrumação de mensagemDividida//
        let Valor_Dado = Dado[1];
        Dado[1] = Sum;
        Dado.shift();
        console.log("Depois da rolagem: " + Dado);

        //União das Arrays//
        let União = "";
        for (i = 0; i < Dado.length; ++i) {
            União += Dado[i] + " ";
        }
        console.log(União);
        União = eval(União);
        console.log(União);

        //Comparações//
        let Comparações = mensagemDividida[2];
        if (Comparações != undefined) {
        Comparações = Comparações.replace(/>=/g, " >= ");
        Comparações = Comparações.replace(/<=/g, " <= ");
        Comparações = Comparações.replace(/[>]/g, " > ");
        Comparações = Comparações.replace(/[<]/g, " < ");
        ComparaçõesFinal = Comparações.split(" ");
        ComparaçõesFinal.shift();
        ComparaçõesFinal.unshift(União);
        let ComparaçõesFinal2 = "";
        for (i = 0; i < ComparaçõesFinal.length; ++i) {
            ComparaçõesFinal2 += ComparaçõesFinal[i];
        }
        ComparaçõesExpressão = ComparaçõesFinal2;
        console.log(ComparaçõesFinal2);
        ComparaçõesFinal2 = "if (" + ComparaçõesFinal2 + ') { ComparaçõesFinal2 = "Verdadeira" } else { ComparaçõesFinal2 = "Falsa" }';
        eval(ComparaçõesFinal2);
        console.log(ComparaçõesFinal2);
        mensagem_especial += "A expressão verificada (" + ComparaçõesExpressão + ") é " + ComparaçõesFinal2 + ".";
        }
        message.channel.send(`**A rolagem foi concluida, <@${author_id}>` + '.**\n```\nRolagem: ' + Instruções[0] + 'd' + Valor_Dado + ' = [' + Sum + ']\nValor com Operadores (' + mensagemDividida[1] + ') = '+ União + '\nValores Individuais: [' + randomValue + ']\nOperações Especiais: ' + mensagem_especial + '```');
    }

    //Funções//
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
        let organize;
        for (i = value.length; i > 0; --i) {
            if (value[i-1] > value[i]) {
                organize = value[i];
                value[i-1] = value[i];
                value[i-1] = organize;
            }
        }
        return value;
    }
    function arrayNoSpaces(value) {
        for (i = value.length; i > 0; --i) {
            for (j = value[i].length; j > 0; --j) {
                if (value[i].length = " ") {
                    
                }
            }
        }
    }
})
client.login();
