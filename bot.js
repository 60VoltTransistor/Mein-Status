// Setup our environment variables via dotenv
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config.json');
const Discord = require('discord.js');
const logger = require("./modules/logger.js");
// Import relevant classes from discord.js
const { Client, GatewayIntentBits, IntentsBitField, Collection } = require('discord.js');
const myIntents = new IntentsBitField();
//add the different intents that you intend to use in this string
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent);
const client = new Client({intents: myIntents});

const commands  = new Collection();

client.container = {
  commands
};

const init = async () => {
  //load the commands
  const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
  for(file of commands){
    const commandName = file.split(".")[0];
    const command = require(`./commands/${commandName}`);
    logger.log(`Loading Command: ${commandName}`, "log");
    client.container.commands.set(commandName, command);
  }

  const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
  for(file of events){
    const eventName = file.split(".")[0];
    logger.log(`Loading Event: ${eventName}`, "log");
    const event = require(`./events/${eventName}`);
    client.on(eventName, event.bind(null, client));
  }

  // Authenticate
  client.login(process.env.TOKEN);

};

init();



/* client.on('messageCreate', (message) => {
  if(message.content.startsWith(config.prefix)){
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    if(!command) return message.channel.send({content:  "That command doesn't exist!"});
    try{
      await command.run(client, message, args);
      if(config.debug_mode == 'true'){
        console.log("Message >",message.content);
      }
    }
    catch (e) {
      message.channel.send({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\`` })
      .catch(e => console.error("An error occurred replying on an error", e));
    }

  }
}); */


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

