const Discord = require("discord.js")

module.exports.run = (client, message, args) => {

    message.content.startsWith(prefix + "8ball"); {
        var ball = [`Yes`, `No doubt about it`, `Try again`, `signs point to yes`, `I say no`, `No chance`, `Dont think so`];
        message.channel.send(ball[Math.floor(Math.random () * ball.length)]);
       }
}

module.exports.help = {
        name: "8ball"
}