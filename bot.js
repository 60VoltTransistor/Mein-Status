// Setup our environment variables via dotenv
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');
// Import relevant classes from discord.js
const { Client, GatewayIntentBits, IntentsBitField, Collection } = require('discord.js');

const myIntents = new IntentsBitField();
//add the different intents that you intend to use in this string
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent);
const client = new Client({intents: myIntents});

// Notify progress
client.on('ready', function(e){
    //prints to the terminal that the bot has been logged in
    console.log("\x1b[32m%s\x1b[0m", `Logged in as ${client.user.tag}!`);
    /* 
    Refer to the link below explaining the purpose of all the weird expressions and arguements in the first half og the console.log command
    https://simplernerd.com/js-console-colors/
    the entire purpose of this was just a styling thing, all it does it make the text notification of the bot being logged-in green
    in the terminal window
    The link below also includes supplemental information to the earlier link, it has the SGR parameters
    https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
    */
   console.log('Bot Ready! :)');
})

var i = 0;
client.on('messageCreate', (message) => {
  i++;
  if(message.content.toLowerCase().includes('!hey')){
    if (message.author.bot) return;
    message.channel.send('Whats up?');
  }
  //for debug purposes, do not include in the final product
  console.log(i,' : ', message.content);
});

// Authenticate
client.login(process.env.TOKEN);

/* 
//loads out config file
const fs = require('fs');
const config = require("./config.json");

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.commands = new Collection();

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}
 */
/* 
//start of command handler
client.on("messageCreate", message => {
    if (message.author.bot) return;
    // This is where we'll put our code.
    if (message.content.indexOf('!') !== 0) return;
  
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if (command === 'ping') {
      message.channel.send('Pong!');
    } else
  
    if (command === 'blah') {
      message.channel.send('blah');
    }
  });
 */

