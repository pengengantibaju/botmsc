const client = require("../index");

client.on("ready", () => {
    console.log("\x1b[34m%s\x1b[0m", `${client.user.tag} ready to work!`)
    const statuses = [ // status bot
        "Creator Nanda#1234",
        `🏓Ping: ${client.ws.ping}ms!`,
        `With ${client.guilds.cache.size} Server`,
        `With ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} User`,
        "Youtube",
        "c. command / Slash command",
        "Anichi.live",
        "discord.gg/chillvibes"
    ]
    let index = 0
    setInterval(() => {
        if (index === statuses.length) index = 0
        const status = statuses[index]
        client.user.setActivity(`${status}`, {
            type: "LISTENING",
            browser: "DISCORD IOS"
        })
        index++
    }, 10000)
})
