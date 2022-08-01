// Setup our environment variables via dotenv
require('dotenv').config();
// Import relevant classes from discord.js
const { Client, GatewayIntentBits, IntentsBitField } = require('discord.js');

const myIntents = new IntentsBitField();
//add the different intents that you intend to use in this string
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages);

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

})
// Authenticate
client.login(process.env.TOKEN);

//start of command handler
client.on("messageCreate", message => {
    if (message.author.bot) return;
    // This is where we'll put our code.
    if (message.content.indexOf(config.prefix) !== 0) return;
  
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if (command === 'ping') {
      message.channel.send('Pong!');
    } else
  
    if (command === 'blah') {
      message.channel.send('Meh.');
    }
  });
