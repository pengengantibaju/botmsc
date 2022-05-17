const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverlist',
    aliases: ['sl'],
    category: '🦉 - Owner',
    usage: 'd!serverlist',
    description: 'Show the BOT server list',

    run: async(client, message, args) => {
        if(message.author.id != '570589477920309259') {
            message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('🚫 | You have no right to take this action!')
            ]})
        } else {
            const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(50)

            const description = guilds.map((guild, index) => {
                return `${index + 1}. ${guild.name} - ${guild.id} - ${guild.memberCount} member`
            }).join('\n')

            const embed = new MessageEmbed()
            .setColor('#ccff48')
            .setTitle(`BOT server list(${client.guilds.cache.size} server)`)
            .setDescription(description)

            message.channel.send({ embeds: [embed]})
        }
    }
}