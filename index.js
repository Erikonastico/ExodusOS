//Login//
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

//Hello//
//Command Reciever//
client.on('message', message => {

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
    var flag_activated = 0;

    //Facility Variables//
    command = splitedMessage[0];

    //Modules//

    //Quick Dice Roller Module//
    if (/[0-9]d[0-9]/g.test(splitedMessage[0]) == 1 && (message.author.bot == 0)) {
        flag_activated = 1;
        message.delete({timeout: 100});
        console.log("Foi");
        splitedMessage.unshift("!roll");
        command = "!roll";
    }


    //Dice Roller Module//
	if (command === '!roll') {

        message.delete({timeout: 100});
        
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
        for (i = 2; i < splitedMessage.length; ++i) {
            if (splitedMessage[i] === 'media') {
                flag_haveOperations = 1;
                console.log("Media: " + splitedMessage.length);
                array_media(randomValue.length-additionalValue.length,Sum);
            }
            else if (splitedMessage[i][0] == ">" || splitedMessage[i][0] == "<") {
                flag_haveOperations = 1;
                console.log("Comparação: " + splitedMessage.length);
                comparação(splitedMessage[i]);
            }
        }

        //Additional Problem Handler//
            let messageToSend = `**A rolagem foi concluida, <@${author_id}>` + '.**\n```bash\nRolagem: ' + Instruções[0] + 'd' + Valor_Dado + ' = [' + Sum + ']\nValor com Operadores (' + splitedMessage[1] + ') = '+ Junction + '\nValores Individuais: [' + randomValue + ' ]';
            if (typeof(splitedMessage[2]) != "undefined") {
                if (flag_haveOperations == 0) {
                    message.channel.send("**Erro:** Você colocou uma operação não existente. Tente digitar operações validas como 'media'."); 
                }
                else if (flag_haveOperations == 1) {
                    messageToSend += '\nOperações Especiais:' + specialMessage + '```';
                    message.channel.send(messageToSend);
                }
                else {
                    message.channel.send("Estado de variavel estranho. Você deve ter feito algo errado.");
                }
            }
            else {
                messageToSend += "```";
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
if (command === '!conquista') {
    const Conquista = {
        index: ["Comum;", "Raro;", "Epico;", "Lendario;", "Extraordinario;", "Lore;"],
        color_value: ["#fffffe", "#037ffc", "#6d38f6", "#ffc737", "#ff7300", "#bbbcc2"]
    }
    let color_index; 
    let flag_index = 0;
    for (i = 0; i < 6; ++i) {
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
    console.log(Aspas);
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
                Embed.setFooter(Aspas[3] + `\nMestre: ${message.author.username}`);
        }
    }   
    if (Aspas.length > 4) {
        let AspasTamanho = Aspas.length;
        if (/image/g.test(Aspas[AspasTamanho]) == 0) {
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
