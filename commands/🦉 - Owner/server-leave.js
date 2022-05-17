const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'server-leave',
  aliases: ['svlv'],
  category: '🦉 - Owner',
  description: 'Leave the server',
  usage: 'server-leave',
  run: async (client, message, args) => {
    if (message.author.id != '570589477920309259')
      return message.reply('You dont have the right to use this command!');
    const guild = client.guilds.cache.get(args.join(' '));
    try {
      if (!guild)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor('RED')
              .setDescription(`🚫 | No server found!`),
          ],
        });
      await guild.leave();
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#ccff48')
            .setDescription(
              `✅ | BOT has escaped from the server ${guild.name} - ${guild.id} - ${guild.memberCount} member!`
            ),
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
