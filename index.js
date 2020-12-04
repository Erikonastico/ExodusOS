//Login//
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

//Mensage Listening//
client.on('message', message => {
    
    //Global Variables//
    var author_id = message.author.id;
    var randomValue = [];
    var mensagemDividida = message.content.split(" ");
    var mensagem_especial = "";
    let flag = [];

    //Modulos//
    /*Cada modulo corresponde a um conjunto de funções atribuidas a um comando,
    ou conjunto de comandos.*/

    //Modulo - Rolagem de Dados//
	if (mensagemDividida[0] === '!roll') {

        //Deleção da Mensagem que foi enviada//
        message.delete({timeout: 100});

        let Instruções = mensagemDividida[1].split("d");

        //Tratamento de Paranteses//
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
            //Se começar com d, ele contabiliza um dado//
            if (mensagemDividida[1][0] === 'd') {
                Instruções.shift();
                Instruções.unshift("1");
            }

        //Tratamento de Operações//
        console.log(Instruções[1]);
        Instruções[1] = Instruções[1].replace(/[+]/g, " + ");
        Instruções[1] = Instruções[1].replace(/[-]/g, " - ");
        Instruções[1] = Instruções[1].replace(/[*]/g, " * ");
        Instruções[1] = Instruções[1].replace(/[/]/g, " / ");
        Instruções[1] = Instruções[1].replace(/[)]/g, " ) ");

        //Após identificar os operadores, split separa eles dos valores de rolagem.//
        let Dado = Instruções[1].split(" ");
        Dado.unshift(Instruções[0]);

        //Execução da Rolagem//
        randomValue = randomGenerating(Dado[1], Dado[0]);

        //Soma//
        Sum = arraySum(randomValue);

        //Rearranjo//
        //Adiciona espaços//
        for (i = 1; i < randomValue.length; ++i) {
            randomValue[i] = " " + randomValue[i];
        }        
        let Valor_Dado = Dado[1];
        Dado[1] = Sum;
        Dado.shift();

        //Montagem de Arrays//
        let União = "";
        for (i = 0; i < Dado.length; ++i) {
            União += Dado[i] + " ";
        }
        console.log("Hello: " + União);
        let contador = 0;
        while (flag[contador] == 1) {
            ++contador;
            União = União.split('');
            União.unshift('(');
            União = União.join('');
            }
        //Resolução das Operações//
        União = eval(União);

        //Verificação de Operações Adicionais//
        //Funções//

        //Media//
        function array_media (array, soma_array) {
            media = soma_array/array.length;
            mensagem_especial += "\nA media entre as rolagens é: " + media + ";"; 
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
        ComparaçõesFinal.unshift(União);
        for (j = 0; j < ComparaçõesFinal.length; ++j) {
            ComparaçõesFinal2 += ComparaçõesFinal[j];
        }
        ComparaçõesExpressão = ComparaçõesFinal2;
        ComparaçõesFinal2 = "if (" + ComparaçõesFinal2 + ') { ComparaçõesFinal2 = "Verdadeira" } else { ComparaçõesFinal2 = "Falsa" }';
        
        //Resolve a operação, e devolve "Verdadeira" caso seja verdadeiro e "Falsa" caso seja falso//
        
        eval(ComparaçõesFinal2);
        mensagem_especial += "\nA expressão verificada (" + ComparaçõesExpressão + ") é " + ComparaçõesFinal2 + ";"; 
        }

        //Central de Execução//
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
    else {
        message.channel.send("*Na rolagem normal, só aceitamos rolar de 1 à 200 dados. Tente novamente.*")
    }
}

//Modulo - Conquista//
if (mensagemDividida[0] === '!conquista') {
    const Conquista = {
        index: ["Comum;", "Raro;", "Epico;", "Lendario;", "Extraordinario;", "Lore;"],
        color_value: ["#fffffe", "#037ffc", "#6d38f6", "#ffc737", "#ff7300", "#bbbcc2"]
    }
    let color_index; 
    for (i = 0; i < 6; ++i) {
        if (mensagemDividida[1] == Conquista.index[i]) {
            color_index = Conquista.color_value[i];
        }   
    }

    let Aspas = message.content.split('; ');
    console.log(Aspas);
    const Embed = new Discord.MessageEmbed()
        .setColor(color_index)
        .setTitle(Aspas[1])
        .setDescription(Aspas[2])
        .setFooter(Aspas[3] + `\nMestre: ${message.author.username}`);

    message.channel.send(Embed);
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
})
client.login();
