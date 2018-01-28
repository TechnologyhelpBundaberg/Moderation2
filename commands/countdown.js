module.exports.run = function(client, message, args, level) {
    let i = 30;
    message.channel.sendMessage("Countdown: " + i + "s").then(message => {
        var countInterval = setInterval(() => {
          if(i === 10) {
            message.edit(i = "Countdown complete.");
            return clearInterval(countInterval);
          }
          message.edit("Countdown: " + (i = i - 10) + "s")
        }, 10000);
      })
}

module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
}

module.exports.help = {
    name: "countdown",
    description: "Counts down from 30",
    usage: "Vortex, countdown <countdownFrom30>",
    aliases: [],
    permlevel: 0
}