const express = require("express");

const https = require("https");

const app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  
  
      response.render('list');
  
  });
  
  
app.listen(port, () => {

      console.log('Vortex is running on http://localhost/:' + port + "!!");;
  
  });

  setInterval(() => {
    
     https.get('https://git.heroku.com/vortexv2.git');
    
    }, 900000);

const Discord = require(`discord.js`);
const client = new Discord.Client();
const ytdl = require(`ytdl-core`);
const request = require(`request`);
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);
const fss = require(`fs`);
const getYouTubeID = require(`get-youtube-id`);
const fetchVideoInfo = require(`youtube-info`);
const moment = require(`moment`);
const Enmap = require('enmap')
const EnmapLevel = require('enmap-level')

var config = JSON.parse(fss.readFileSync(`./settings.json`, `utf-8`));

var cmdprefix = "!!"

const yt_api_key = config.yt_api_key
const client_controller = config.client_controller;
const prefix = config.prefix;
const discord_token = config.discord_token;

client.config = require("./config.js")

require('./modules/functions.js')(client)
require('./util/eventLoader')(client);

client.commands = new Enmap()
client.aliases = new Enmap()

client.settings = new Enmap({provider: new EnmapLevel({name: 'settings', persistent: true})});

const init = async () => {
  const cmdFiles = await readdir("./commands/");
  client.log("log", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`);
      if (f.split(".").slice(-1)[0] !== "js") return;
      client.log("log", `Loading Command: ${props.help.name}. 👌`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    } catch (e) {
      client.log(`Unable to load command ${f}: ${e}`);
    }
  });

  const evtFiles = await readdir("./events/");
  client.log("log", `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

};

init();

// client.commands = new Discord.Collection();
// client.aliases = new Discord.Collection();
// fs.readdir('./commands/', (err, files) => {
//   if (err) console.error(err);
//   console.log(`Loading a total of ${files.length} commands.`);
//   files.forEach(f => {
//     let props = require(`./commands/${f}`);
//     console.log(`Loading Command: ${props.help.name}.`);
//     client.commands.set(props.help.name, props);
//     props.conf.aliases.forEach(alias => {
//       client.aliases.set(alias, props.help.name);
//     });
//   });
// });

// client.elevation = function(message) {
// let permlvl = 0;
// let mod_role = message.guild.roles.find('name', 'Moderator');
// if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
// let admin_role = message.guild.roles.find('name', 'Co-Owner')
// if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
// if (message.author.id === require('./settings.json').ownerid) permlvl = 4;
// return permlvl;
// }


client.login(discord_token)

client.on(`ready`, function () {

client.user.setActivity("Vortex, cmds || Online!")

client.user.setStatus("dnd")
});

process.on('unhandledRejection', error => console.log(`unhandledRejection:\n${error.stack}`))
.on('uncaughtException', error => {
    console.log(`uncaughtException:\n${error.stack}`)
         process.exit() //better to exit here.
})
.on('error', error => console.log(`Error:\n${error.stack}`))
.on('warn', error => console.log(`Warning:\n${error.stack}`));


// client.on(`guildMemberAdd`, member => {
//     let guild = member.guild;
    
//     guild.defaultChannel.send(`Welcome ${member.user} as they has just joined the server, Please go to .#rules !`)
//   });
  
//   client.on(`guildMemberAdd`, member => {
//     let guild = member.guild;
//     guild.defaultChannel.send(`${member.user} Your Role Has Been Updated!`)
//   });

// client.on(`guildMemberRemove`, member => {
//     let guild = member.guild;
//     guild.defaultChannel.send(`GG ${member.user} You Left And I think No One Cared!`)
// })

client.on(`message`, function (message) {
    const member = message.member;
    const mess = message.content.toLowerCase();
    const args = message.content.split(` `).slice(1).join(` `);
    const msg = message.content.toLowerCase();   

});