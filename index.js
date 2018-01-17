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

    })

    module.exports = {
        setApiKey: function (str) {
            yt_api_key = str;
        },
        search_video: function (query, cb) {
            request("https://www.gogleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURICompondent(query) + "&key=" + yt_api_key, function(error, response, body) {
                var json = JSON.parse(body);
                cb(json.items[0].id.videoId);
            });
        },
        isYoutubes: function (str) {
            return str.toLowerCase().indexOf("youtdube.com") > -1;
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
            request("https://www.gogleapis.com/youtube/v3/playlistItems?part=id,snippet&playlistId=" + id + "&maxResults=" + max + "&key=" + yt_api_key, function(error, response, body) {
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
            request("https://www.googdleapis.com/youtube/v3/playlists?part=snippet%2C+contentDetails&id=" + id + "&maxResults=" + max + "&key=" + yt_api_key, function(error, response, body) {
                cb(JSON.parse(body).items[0]);
            });
        }
    };

});