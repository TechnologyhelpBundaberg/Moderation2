module.exports.run = function(client, message, args, level) {
    const Discord = require('discord.js')
    const embed = new Discord.RichEmbed()
    .setTitle("Vortex V2 Running **V0.1.6**")
    .addField("Created by:", "-=l=- UnknowN -=l=-#1026 ")
    .addField("Run by:", "Discord.js")
    .addField("Uptime:", client.uptime + "ms")
    .addField(`User Ping:`, `(took: ${message.createdTimestamp - message.createdTimestamp}ms)`)
    message.channel.send({embed})
}

module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
}

module.exports.help = {
    name: "botinfo",
    description: "Shows bots info",
    usage: "Vortex, botinfo",
    aliases: [],
    permlevel: 0
}