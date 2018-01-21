const express = require("express");

const http = require("http");

const app = express();

port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  
  
      response.render('list');
  
  });
  
  
app.listen(port, () => {

      console.log('Vortex is running on http://localhost/:' + port + "!!");;
  
  });

  setInterval(() => {
    
     http.get('https://git.heroku.com/vortexv2.git');
    
    }, 900000);

const Discord = require(`discord.js`);
const client = new Discord.Client();
const ytdl = require(`ytdl-core`);
const request = require(`request`);
const fs = require(`fs`);
const getYouTubeID = require(`get-youtube-id`);
const fetchVideoInfo = require(`youtube-info`);
const moment = require(`moment`);

var config = JSON.parse(fs.readFileSync(`./settings.json`, `utf-8`));

const yt_api_key = config.yt_api_key
const bot_controller = config.bot_controller;
const prefix = config.prefix;
const discord_token = config.discord_token;

var port = process.env.PORT || 5000;

client.login(discord_token)

client.on(`ready`, function () {
    console.log(client.commands);
    setTimeout(function(){
       console.log(`Booting Into Version 0.0.1`)
   },500);

client.on(`guildMemberAdd`, member => {
    let guild = member.guild;
    guild.defaultChannel.send(`Welcome ${member.user} as they has just joined the server, Please go to .#rules !`)
  });
  
client.on(`guildMemberRemove`, member => {
    let guild = member.guild;
    guild.defaultChannel.send(`GG ${member.user} You Left And I think No One Cared!`)
})

client.on(`message`, function (message) {
    const member = message.member;
    const mess = message.content.toLowerCase();
    const args = message.content.split(` `).slice(1).join(` `);
    const msg = message.content.toLowerCase();

    if(message.content.startsWith(prefix + `ping`)) {
        message.channel.send("Pong!")
    }

    if(message.content.startsWith(prefix + `rblxlt2`)) {
        message.channel.send(`ROBLOX LT2 => https://www.roblox.com/games/13822889/Lumber-Tycoon-2`)
        setTimeout(function(){
          message.channel.send(`Your link has been provided!`)
        },2000);
      }
  
      if(message.content.startsWith(prefix + `rblxmm`)) {
        message.channel.send(`ROBLOX M.M => https://www.roblox.com/games/463625050/HALLOWEEN-Mining-Madness`)
        setTimeout(function(){
          message.channel.send(`Your link has been provided!`)
        },2000);
      }

      if(message.content.startsWith(prefix + `purge`)) {
        var adm = message.guild.roles.find(`name`, `Special Bot`);
        if(message.member.roles.has(adm.id)) {
           var messagecount = args;
            message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
            message.channel.send(`I Have ${messagecount} messages with purge.`);
        }
    }

    if (message.content.startsWith(prefix + "membercount")) {
            message.channel.send("There are currently " + message.guild.memberCount + " members here.");
      }

    if (mess.startsWith(prefix + "uptime")) {
        require("moment-duration-format");
        var duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        message.channel.send(`I have been up for  ${duration} !`);
      }

    if (message.content.startsWith(prefix + "hidden")) {
        message.channel.send("What Do You Want?")
      const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time : 30000}); // Create the message collector locked to the author in the message channel.
      collector.on('collect', collected => { // When a message is collected, this event triggers.
              if(collected.content.toLowerCase() === 'nothing') { // If response is 'no'
              collector.stop(); // Stop the collector.
                message.channel.send('Okay then....'); // Send a message.
              }else if(collected.content.toLowerCase() === 'something') { // If response is 'yes'
              collector.stop(); // Stop the collector.
              message.channel.send('Fine You Found The Hidden Command! *Nice Job*');
              }
            })
            collector.on('end', collected => { // When the 30 seconds runs out.
              if(collected.size < 1) return message.channel.send(`WHY SAY SOMETHING THEN IGNORE ME ***ANGERY!!!!!!***`); // If no response, send a message.
            });
    }    

    if (message.content.startsWith(prefix + "mute")) {
        message.channel.send("Do you want to mute" + message.mentions.users.first() + "?  *Reply with* ***Yes*** *or* ***No***")
      const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time : 30000}); // Create the message collector locked to the author in the message channel.
      collector.on('collect', collected => { // When a message is collected, this event triggers.
              if(collected.content.toLowerCase() === 'No') { // If response is 'no'
              collector.stop(); // Stop the collector.
                message.channel.send('Okay then....'); // Send a message.
              }else if(collected.content.toLowerCase() === 'Yes') { // If response is 'yes'
              collector.stop(); // Stop the collector.
                var adminmute = message.guild.roles.find('name', '257673064446164992');
                  if(message.member.roles.has(adminmute.id)) {
                    const toMute = message.guild.member(message.mentions.users.first());
                      toMute.addRole('404561198416396309');
                  } else(message.channel.send("You Cannot use that command"));     
              }
            })
            collector.on('end', collected => { // When the 30 seconds runs out.
              if(collected.size < 1) return message.channel.send(`WHY SAY SOMETHING THEN IGNORE ME ***ANGERY!!!!!!***`); // If no response, send a message.
            });
    } 

    if (message.content.startsWith(prefix + "oof?")) {
        message.channel.send("Do you want to know what oof means? say **Yes** or **No**")
        const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time : 30000}); // Create the message collector locked to the author in the message channel.
        collector.on('collect', collected => { // When a message is collected, this event triggers.
                if(collected.content.toLowerCase() === 'No') { // If response is 'no'
                collector.stop(); // Stop the collector.
                  message.channel.send('Then why oof-ing ask?'); // Send a message.
                }else if(collected.content.toLowerCase() === `Yes`) { // If response is 'yes'
                collector.stop(); // Stop the collector.
                message.channel.send('V V V I will list all links below! V V V');
                setTimeout(function(){
                    message.channel.send(`Heres a Urban Dictionary: https://www.urbandictionary.com/define.php?term=oof`)
                  },2000);
                  setTimeout(function(){
                    message.channel.send(`Heres a Youtube link to **OOF**: https://www.youtube.com/watch?v=joYBr5jaKbE`)
                  },4000);
                  setTimeout(function(){
                    message.channel.send(`Checking All Links Allow 4 Seconds to Check!`)
                  },6000);
                  setTimeout(function(){
                    message.channel.send(`Links Checked! All done!`)
                  },10000);
                }
              })
              collector.on('end', collected => { // When the 30 seconds runs out.
                if(collected.size < 1) return message.channel.send(`Message collection error ***UNDEFINED*** Id = "Too Long To Reply" Please send command again`); // If no response, send a message.
              });
    }

    })

    module.exports = {
        setApiKey: function (str) {
            yt_api_key = str;
        },
        search_video: function (query, cb) {
            request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURICompondent(query) + "&key=" + yt_api_key, function(error, response, body) {
                var json = JSON.parse(body);
                cb(json.items[0].id.videoId);
            });
        },
        isYoutubes: function (str) {
            return str.toLowerCase().indexOf("youtube.com") > -1;
        },
    
        getIDs: function (str, cb) {
            if (this.isYoutube(str)) {
                cb(getYouTubeID(str));
            } else {
                this.search_video(str, function(id) {
                    cb(id);
                });
            }
        },
        getPlayListSongs: function (id, max, cb) {
            request("https://www.googleapis.com/youtube/v3/playlistItems?part=id,snippet&playlistId=" + id + "&maxResults=" + max + "&key=" + yt_api_key, function(error, response, body) {
                var json = JSON.parse(body);
                var arr = [];
                json.items.forEach(function (e) {
                    arr.push(e);
                });
                cb(arr.filter(function (a) {
                    return a.snippet.title.toLowerCase() !== "private video" && a.snippet.title.toLowerCase() !== "deleted video";
                }));
            });
        },
        getPlayListMetaData: function (id, max, cb) {
            request("https://www.googleapis.com/youtube/v3/playlists?part=snippet%2C+contentDetails&id=" + id + "&maxResults=" + max + "&key=" + yt_api_key, function(error, response, body) {
                cb(JSON.parse(body).items[0]);
            });
        }
    };

    

});