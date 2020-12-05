//Login//
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

//Command Reciever//
client.on('message', message => {

    //Global Variables//
    var author_id = message.author.id;
    var randomValue = [];
    var splitedMessage = message.content.split(" ");
    var specialMessage = "";
    var flag = [];
    var flag_adv = [];
    var additionalValue = [];
    const operations = /[*+-/]/g;

    //Facility Variables//
    command = splitedMessage[0];

    //Modules//

    //Dice Roller Module//
	if (command === '!roll') {

        message.delete({timeout: 100});

        //Message Content Handler//
        let Instruções = splitedMessage[1].split("d");
        Instruções[1] = Instruções[1].replace(/uk/, " ");
        Instruções[1] = Instruções[1].replace(/k/, " ");
        let Desvantagem = splitedMessage[1].split("uk");     
        let Vantagem = splitedMessage[1].split("k");

        //Advantage | Disadvantage Handler//
        if (Desvantagem[1] != undefined) {
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
            if (i != 1) {
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

        Junction = eval(Junction);

        //Verificação de Operações Adicionais//
        //Funções//

        //Media//
        function array_media (array, soma_array) {
            media = soma_array/array.length;
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
        for (i = 2; i < splitedMessage.length; ++i) {
            console.log("Passou por aqui.");
            if (splitedMessage[i] === 'media') {
                console.log("Media: " + splitedMessage.length);
                array_media(randomValue,Sum);
            }
            else {
                console.log("Comparação: " + splitedMessage.length);
                comparação(splitedMessage[i]);
            }
        }
        message.channel.send(`**A rolagem foi concluida, <@${author_id}>` + '.**\n```bash\nRolagem: ' + Instruções[0] + 'd' + Valor_Dado + ' = [' + Sum + ']\nValor com Operadores (' + splitedMessage[1] + ') = '+ Junction + '\nValores Individuais: [' + randomValue + ' ]\nOperações Especiais: ' + specialMessage + '```');
    }
    else {
        message.channel.send("*Na rolagem normal, só aceitamos rolar de 1 à 200 dados. Tente novamente.*")
    }
}

//Modulo - Conquista//
if (command === '!conquista') {
    const Conquista = {
        index: ["Comum;", "Raro;", "Epico;", "Lendario;", "Extraordinario;", "Lore;"],
        color_value: ["#fffffe", "#037ffc", "#6d38f6", "#ffc737", "#ff7300", "#bbbcc2"]
    }
    let color_index; 
    for (i = 0; i < 6; ++i) {
        if (splitedMessage[1] == Conquista.index[i]) {
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
