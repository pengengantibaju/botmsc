const { MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Display the playlist',
    category: '🎵 - Music',
    aliases: ['q'],
    usage: 'queue',
    cooldown: 5,
    run: async (client, message, args, _fromButton = false) => {
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

        const q = queue.songs
        .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')

        const tracks = queue.songs
        .map((song, i) => `**${i + 1}** - [${song.name}](${song.url}) | ${song.formattedDuration}
        Yêu cầu bởi : ${song.user}`)

        const songs = queue.songs.length;
        const nextSongs = songs > 10 ? `And **${songs - 10}** Other songs ...` : `In the playlist**${songs}** the song...`;

        message.reply({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'List of players', iconURL: 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif'})
            .setDescription(`${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`)
            .addField(`Issuing:`, `[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Request by: ${queue.songs[0].user}`, false)
            .addField(`Total time broadcast:`, `${queue.formattedDuration}`, true)
            .addField(`Total number of songs:`, `${songs}`, true)
        ]})
    }
}
