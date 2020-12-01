//Login//
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

//Mensage Listening//
client.on('message', message => {
    //Variable Declaration//
    var saved = '';
    var randomValue = [];
    /*Mensagem Dividida é a divisão das palavras contidas no conteudo da mensagem.
    Mensagem Dividida[0] = Primeira Palavra.
    Mensagem Dividida[1] = Segunda Palavra.*/
    var mensagemDividida = message.content.split(" ");

	if (mensagemDividida[0] === '!roll') {
        if (mensagemDividida[1][0] === 'd') {
            message.channel.send("Por favor, informe o numero de dados a serem jogados.");
        }
        else {
            let Instruções = mensagemDividida[1].split("d");
            randomValue = randomGenerating(Instruções[1], Instruções[0]);
            if (typeof randomValue != "undefined") {
                message.channel.send('**A rolagem foi concluida.** ```Rolagem: ' + mensagemDividida[1] + ' [' + arraySum(randomValue) + ']\nValores Individuais: ' + randomValue + '```');
            }
            }
            
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
});

client.login();
