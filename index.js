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
    var randomValue;
    /*Mensagem Dividida é a divisão das palavras contidas no conteudo da mensagem.
    Mensagem Dividida[0] = Primeira Palavra.
    Mensagem Dividida[1] = Segunda Palavra.*/
    var mensagemDividida = message.content.split(" ");
    console.log(mensagemDividida);

	if (mensagemDividida[0] === '!roll') {
        var Instruções = mensagemDividida[1].split('d');
        //Validação//
        if (typeof Instruções[0] == 'number' || typeof Instruções[1] == 'number') {
            randomValue = Instruções[0] * Math.floor(Math.random() * Instruções[1]) + 1;
        }
        else {
            message.channel.send("Valores errados. Lembre-se, você precisa colocar dados em notação 1d20.");
        }
        console.log(randomValue);
        message.channel.send('d' + mensagemDividida[1] + ' = **[' + randomValue + ']**');
    }
});

client.login();
