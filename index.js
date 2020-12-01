//Login//
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

//Mensage Listening//
client.on('message', message => {
    var saved = '';
    var randomValue;
    var mensagem = message.content;
    var mensagemDividida = mensagem.split(" ")
    console.log(Instruções);
	if (mensagemDividida[0] === '!roll') {
        var Instruções = mensagemDividida[1].split("");
        for (n = 0; n < Instruções.length; ++n) {
        saved += Instruções[n];
        }
        randomValue = Math.floor(Math.random() * saved) + 1;
        console.log(saved);
        message.channel.send('d' + mensagemDividida[1] + ' = **[' + randomValue + ']**');
    }
});

client.login();
