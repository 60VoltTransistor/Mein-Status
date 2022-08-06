// Setup our environment variables via dotenv
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config.json');
// Import relevant classes from discord.js
const { Client, GatewayIntentBits, IntentsBitField, Collection } = require('discord.js');
const myIntents = new IntentsBitField();
//add the different intents that you intend to use in this string
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent);
const client = new Client({intents: myIntents});

const Discord = require("discord.js");
client.commands  = new Discord.Collection();
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for(file of commands){
  const commandName = file.split(".")[0];
  const command = require(`./commands/${commandName}`);
  client.commands.set(commandName, command);
}

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

client.on('messageCreate', (message) => {
  if(message.content.startsWith(config.prefix)){
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    if(!command) return message.channel.send({content:  "That command doesn't exist!"});
    command.run(client, message, args);
  }
});

// Authenticate
client.login(process.env.TOKEN);

/* 
var i = 0, j=0;
client.on('messageCreate', (message) => {
  i++;
  if((!message.content.toLowerCase().includes(config.prefix,'ping')) || message.author.bot) return;
  j++;
  message.channel.send('pong');
  //for debug purposes, do not include in the final product
  if(config.debug_mode == 'false') return;
  console.log(i,',', j ,' : ', message.content);
});
 */

