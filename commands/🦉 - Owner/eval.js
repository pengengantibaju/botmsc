const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    name: "eval",
    aliases: ["ev", "e"],
    category: "🦉 - Owner",
    description: "Do a piece of your code",
    usage: "eval <code>",
    run: async (client, message, args) => {
        if(message.author.id != '570589477920309259') {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('🚫 | Only Nanda#1234 has the right to run this command!')
            ]})
        };

        const code = args.join(" ");
        const start = process.hrtime();
        const difference = process.hrtime(start);
        if(!code) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription('🚫 | You have not entered the code yet!')
        ]});

        if (message.author.id == '570589477920309259') {
            try {
                const result = await eval(code);
                let output = result;
//                 if(typeof result !== "string") {
//                     output = inspect(result);
//                 }

                const embed = new MessageEmbed()
                .setColor('#ccff48')
                .setAuthor({name: '🦉 - Eval', iconURL: message.author.avatarURL()})
                .addField('**Input**', `\`\`\`js\n${code}\`\`\``, false)
                .addField('**Output**', `\`\`\`js\n${output}\`\`\``, false)
                .addField('**Datatypes**', `\`\`\`js\n${typeof result}\`\`\``, false)
                .addField('**The command is executed in**', `\`\`\`diff\n${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms\`\`\``, false)

                message.reply({embeds: [embed]})
            } catch (e) {
                console.log(e);
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription('Error: ' + e)
                ]})
            }
        }
    }
}
