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
            message.delete({timeout: 100})  
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

        //Central of Operations//
        //Funções Locais//
        function array_media (array, soma_array) {
            media = soma_array/array.length;
            mensagem_especial += "\nA media entre as rolagens é: " + media + ";"; 
        }

        function comparação (valor) {
        valor = valor.replace(/>=/g, " >= ");
        valor = valor.replace(/<=/g, " <= ");
        valor = valor.replace(/[>]/g, " > ");
        valor = valor.replace(/[<]/g, " < ");
        let ComparaçõesFinal = valor.split(" ");
        let ComparaçõesFinal2 = "";
        ComparaçõesFinal.shift();
        ComparaçõesFinal.unshift(União);
        for (j = 0; j < ComparaçõesFinal.length; ++j) {
            ComparaçõesFinal2 += ComparaçõesFinal[j];
        }
        ComparaçõesExpressão = ComparaçõesFinal2;
        console.log(ComparaçõesFinal2);
        ComparaçõesFinal2 = "if (" + ComparaçõesFinal2 + ') { ComparaçõesFinal2 = "Verdadeira" } else { ComparaçõesFinal2 = "Falsa" }';
        eval(ComparaçõesFinal2);
        console.log(ComparaçõesFinal2);
        mensagem_especial += "\nA expressão verificada (" + ComparaçõesExpressão + ") é " + ComparaçõesFinal2 + ";"; 
        }

        //Central//
        for (i = 2; i < mensagemDividida.length; ++i) {
            console.log("Passou por aqui.");
            if (mensagemDividida[i] === 'media') {
                console.log("Media: " + mensagemDividida.length);
                array_media(randomValue,Sum);
            }
            else {
                console.log("Comparação: " + mensagemDividida.length);
                comparação(mensagemDividida[i]);
            }
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
})
client.login();
