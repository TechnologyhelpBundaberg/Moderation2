module.exports.run = function(client, message, args, level) {
    const reason = args.splice(1, args.length).join(' ');


    
    let banUnbanlogs = message.guild.channels.find('name', 'ban-unban-logs')
    let mainchannel = message.guild.channels.find('name', 'general')
    if (!banUnbanlogs) return mainchannel.send('Cannot find **Banning & Unbanning Logs**');

    client.unbanReason = reason;
    client.unbanAuth = message.author;
    let user = args[0];
    if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
    if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
    message.guild.unban(user);
}

module.exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: "Administrator"
}

module.exports.help = {
name: "ban",
description: "Bans the user mentioned",
usage: "Vortex, ban <usernamehere>",
aliases: [],
permlevel: 3
}