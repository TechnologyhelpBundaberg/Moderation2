module.exports.run = function(client, message, args, level) {
        let banUnbanlogs = message.guild.channels.find('name', 'ban-unban-logs')
        let mainchannel = message.guild.channels.find('name', 'general')
        if (!banUnbanlogs) return mainchannel.send('Cannot find **Banning & Unbanning Logs**');
        
        const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time : 30000}); // Create the message collector locked to the author in the message channel.
        collector.on('collect', collected => { // When a message is collected, this event triggers.
                if(collected.content.toLowerCase() === 'no') { // If response is 'no'
                collector.stop(); // Stop the collector.
                  message.channel.send('Sad :('); // Send a message.
                }else if(collected.content.toLowerCase() === 'yes') { // If response is 'yes'
                collector.stop(); // Stop the collector.
                message.channel.send('yay!');
                }
              })
              collector.on('end', collected => { // When the 30 seconds runs out.
                if(collected.size < 1) return message.channel.send(':ok_hand: Aborting the action.'); // If no response, send a message.
              });

        var banned = message.mentions.users.first() 
        if(!banned) return message.channel.send('Something')
        
        if(!message.guild.member(banned).bannable) return message.channel.send('I cannot ban that user');
        if(message.guild.member(banned).bannable) {
            message.guild.member(banned).ban();
        }
        banUnbanlogs.send('**Banned**' + message.mentions.user.first())
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