module.exports.run = function(client, message, args, level) {
    message.channel.send("There are currently " + message.guild.memberCount + " members here.");
}

module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
}

module.exports.help = {
    name: "membercount",
    description: "Shows how many members in the guild",
    usage: "Vortex, membercount",
    aliases: [],
    permlevel: 0
}