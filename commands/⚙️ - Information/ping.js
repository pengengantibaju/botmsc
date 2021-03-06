const { MessageEmbed, Client, version } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [' '],
    category: 'βοΈ - ThΓ΄ng tin',
    description: 'Ping bot',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const statsembed = new MessageEmbed()
    .addFields(
        {
          name: ":robot: Client",
          value: `βπ’ Online! <t:${parseInt(client.readyTimestamp /1000)}:R>`,
          inline: true,
        },
        {
          name: "β Ping",
          value: `β${Math.round(message.client.ws.ping)}ms`,
          inline: true,
        },
       {
            name: ":file_cabinet: Memory",
            value: `β${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )}mb`,
            inline: true,
          },
          {
            name: ":robot: Version",
            value: `βv${require("../../package.json").version}`,
            inline: true,
          },
          {
            name: ":blue_book: Discord.js",
            value: `βv${version}`,
            inline: true,
          },
          {
            name: ":green_book: Node",
            value: `β${process.version}`,
            inline: true,
          },
      )
      .setColor('#ccff48')
  
      message.reply({ embeds: [statsembed]});
    },
};
