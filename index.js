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

require('./util/eventLoader')(client);

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
     console.log(`Booting Into Version 0.1.6`)
  },500);
  setTimeout(function(){
    console.log(`Now With Muting! Do Vortex, mute @{usernameHere}`)
  },1000);

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
      message.channel.send(`Pong! ***(took: ${message.createdTimestamp - message.createdTimestamp}ms)***`);
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
        var adm = message.guild.roles.find(`name`, `Owner`);
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
      const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time : 15000}); // Create the message collector locked to the author in the message channel.
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
        message.channel.send("Do you want to mute " + message.mentions.users.first() + "?  *Reply with* ***Yes*** *or* ***No***")
      collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time : 15000}); // Create the message collector locked to the author in the message channel.
      collector.on('collect', collected => { // When a message is collected, this event triggers.
              if(collected.content.toLowerCase() === 'no') { // If response is 'no'
              collector.stop(); // Stop the collector.
                message.channel.send('Okay then.... ***Aborted***'); // Send a message.
              }else if(collected.content.toLowerCase() === 'yes') { // If response is 'yes'
              collector.stop(); // Stop the collector.                  
                      setTimeout(function(){
                        message.channel.send("User is Being Muted")
                      },500);
                      setTimeout(function(){
                        var adminmute = message.guild.roles.find('name', 'Owner');
                          if(message.member.roles.has(adminmute.id)) {
                            const toMute = message.guild.member(message.mentions.users.first());
                          toMute.addRole('404561198416396309');
                        }
                      },5000);
                      setTimeout(function(){
                        message.channel.send(message.mentions.users.first() + " Has been muted for 4 hours")
                      },6800);
                      setTimeout(function(){
                        message.channel.send(message.mentions.users.first() + " **Has Been Logged**")
                      },8000);
                      setTimeout(function(){
                        toMute.removeRole('404561198416396309')
                      },14400000);
                  } else(message.channel.send("You Cannot use that command! Error id = **No Owner Id Found. . .**"));
            })
            collector.on('end', collected => { // When the 30 seconds runs out.
              if(collected.size < 1) return message.channel.send(`Mute Command Aborted! Error id = **Took Too Long To Respond. . . Try Again. . .**`); // If no response, send a message.
            });
    } 

    
    if (message.content.startsWith(prefix + "oof?")) {
        message.channel.send("Do you want to know what oof means? say **Yes** or **No**")
        const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id && m.channel.id === message.channel.id, {time : 15000}); // Create the message collector locked to the author in the message channel.
        collector.on('collect', collected => { // When a message is collected, this event triggers.
                if(collected.content.toLowerCase() === 'no') { // If response is 'no'
                collector.stop(); // Stop the collector.
                  message.channel.send('Then why oof-ing ask?'); // Send a message.
                }else if(collected.content.toLowerCase() === `yes`) { // If response is 'yes'
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


    if (message.content.startsWith(prefix + "roast")) {
      let user = message.mentions.users.first();
       if (message.mentions.users.size < 1) return message.reply('You must mention someone to roast them.').catch(console.error);
       var roast = [
                 "Were you born on the highway? That is where most accidents happen.",
                 "I was going to give you a nasty look... but I see you already have one.",
                 "Remember when I asked for your opinion? Me neither.",
                 "Everyone’s entitled to act stupid once in awhile, but you really abuse the privilege.",
                 "I'm trying to see things from your point of view, but I can't get my head that far up my ass.",
                 "I haven't seen a fatty like you run that fast since twinkies went on sale for the first time.",
                 "Two wrongs don't make a right, take your parents as an example.",
                 "Just looking at you, I now understand why some animals eat their young offspring.",
                 "Does time actually fly when you're having sex, or was it just one minute after all?",
                 "You should go do that tomorrow. Oh wait, nevermind, you've made enough mistakes already for today.",
                 "This is why you dont have nice things",
                 "My teacher told me to erase mistakes, i'm going to need a bigger eraser.",
                 "You're IQ's lower than your dick size.",
                 "Are you always such an idiot, or do you just show off when I’m around?",
                 "There are some remarkably dumb people in this world. Thanks for helping me understand that.",
                 "I could eat a bowl of alphabet soup and shit out a smarter statement than whatever you just said.",
                 "You’re about as useful as a screen door on a submarine.",
                 "You always bring me so much joy—as soon as you leave the room.",
                 "Stupidity’s not a crime, so feel free to go.",
                 "If laughter is the best medicine, your face must be curing the world.",
                 "The only way you'll ever get laid is if you crawl up a chicken's ass and wait.",
                 "It looks like your face caught fire and someone tried to put it out with a hammer.",
                 "Scientists say the universe is made up of neutrons, protons and electrons. They forgot to mention morons like you.",
                 "Why is it acceptable for you to be an idiot but not for me to point it out?",
                 "You're so fat you could sell shade.",
                 "Your family tree must be a cactus because everyone on it is a prick.",
                 "You'll never be the man your mother is.",
                 "Just because you have an ass doesn't mean you need to act like one.",
                 "Which sexual position produces the ugliest children? Ask your mother she knows.",
                 "If I had a face like yours I'd sue my parents.",
                 "The zoo called. They're wondering how you got out of your cage?",
                 "Hey, you have something on your chin... no, the 3rd one down.",
                 "Aww, it's so cute when you try to talk about things you don't understand.",
                 "You are proof that evolution can go in reverse.",
                 "Brains aren't everything. In your case they're nothing.",
                 "You're so ugly when you look in the mirror, your reflection looks away.",
                 "I'm sorry I didn't get that - I don't speak idiot.",
                 "It's better to let someone think you're stupid than open your mouth and prove it.",
                 "Were you born this stupid or did you take lessons?",
                 "You're such a beautiful, intelligent, wonderful person. Oh I'm sorry, I thought we were having a lying competition.",
                 "Don't you get tired of putting make up on two faces every morning?",
                 "Hey, I'm straighter than the pole your mom dances on.",
                 "If ugliness were measured in bricks, you would be the Great Wall of China.",
                 "I thought I said goodbye to you this morning when I flushed the toilet",
                 "If you're trying to improve the world, you should start with yourself. Nothing needs more help than you do",
                 "Zombies are looking for brains. Don't worry. You're safe.",
                 "spreading rumors? At least you found a hobby spreading something other than your legs.",
                 "i would tell you to eat trash but that’s cannibalism",
                 "If you spoke your mind, you would be speechless",
                 "I can fix my ugliness with plastic surgery but you on the other hand will stay stupid forever",
                 "Acting like a dick won't make yours any bigger",
                 "If I wanted to hear from an asshole, I would have farted",
                 "Roses are red. Violets are blue. God made us beautiful. What the hell happened to you?",
                 "You remind me of a penny, two faced and worthless!",
                 "I've met some pricks in my time but you my friend, are the f*cking cactus",
                 "I'd slap you, but that would be animal abuse",
                 "If you're gonna be a smartass, first you have to be smart. Otherwise you're just an ass. ",
                 "I know I’m talking like an idiot. I have to, other wise you wouldn't understand me.",
                 "You're so dumb, your brain cell died of loneliness",
                 "You shouldn't let your mind wander..its way to small to be out on its own",
                 "I don't know what makes you so dumb, but its working",
                 "You should put the diaper on your mouth, that's where the craps comin' out.",
                 "You would be much more likable if it wasn’t for that hole in your mouth that stupid stuff comes out of. ",
                 "Could you go away please, I'm allergic to douchebags",
                 "If you had any intelligence to question I would have questioned it already.",
                 "I wish I had a lower I.Q,  maybe then I could enjoy your company.",
                 "I would answer you back but life is too short, just like your d*ck",
                 "Mirrors don't lie. Lucky for you, they can't laugh either.",
                 "I was right there are no humans in this channel",
                 "You have a face not even a mother could love....",
                 "You know what I would find if I looked up idiot in the dictionary a picture of you?",
                 "You make the guys on Jackass look like Einstein.....",
                 "I would slap you but I don't want to make your face look any better",
                 "Sorry, I can't put small objects in my mouth or Ill choke",
                 "You should wear a condom on your head, if you're going to be a dick you might as well dress like one",
                 "Have you been shopping lately? They're selling lives at the mall, you should get one"
  
 ];
 var roasts = roast[Math.floor(Math.random() * roast.length)];
     message.channel.send(user.username + " " + roasts);
   }

   if (message.content.startsWith(prefix + "botinfo")) {
 
    const embed = new Discord.RichEmbed()
    .setTitle("Vortex V2 Running **V0.1.6**")
    .addField("Created by:", "-=l=- UnknowN -=l=-#1026 ")
    .addField("Run by:", "Discord.js")
    .addField("Uptime:", client.uptime + "ms")
    .addField(`User Ping:`, `(took: ${message.createdTimestamp - message.createdTimestamp}ms)`)
    message.channel.send({embed})
  }

  if (message.content.startsWith(prefix + "countdown")) {
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
  




    

    })

});