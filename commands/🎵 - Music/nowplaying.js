const { MessageEmbed } = require('discord.js');
const Format = Intl.NumberFormat();
const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Turn off'}\` | Repeat: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'List of players' : 'The song') : 'Turn off'
  }\` | Autoplay: \`${queue.autoplay ? 'Turn On' : 'Turn off'}\``

module.exports = {
    name: "nowplaying",
    aliases: ["np", "now"],
    category: "🎵 - Music",
    description: "Shows the current song playing",
    usage: "nowplaying",
    run: async (client, message, args) => {
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription(`🚫 | You need to join a voice channel to use this feature.`)
        ]});
        if(!queue) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: 'Error', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription('No song is playing!')
        ]})
        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`🚫 | You need to go to the same voice channel with BOT!`)
                ]});
            }
        }
        
        const song = queue.songs[0];
        const embed = new MessageEmbed()
        .setColor('#ccff48')
        .setAuthor({name: 'Is playing ...', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .addField("🔷 | Status", `${status(queue).toString()}`, false)
        .addField('👀 | Audio', `${Format.format(song.views)}`, true)
        .addField('👍 | Prefer', `${Format.format(song.likes)}`, true)
        .addField('👎 | Do not like', `${Format.format(song.dislikes)}`, true)
        .addField('⌛ | Delivered', `${queue.formattedCurrentTime} / ${song.formattedDuration}`, true)
        .addField('📩 | Link download', `[Click here](${song.streamURL})`, true)
        .addField("👌 | Request by",` ${song.user}`, true)

        message.reply({embeds: [embed]});
    }
}
