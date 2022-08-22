//this code doesn't do anything at the moment, if nothing changes then remove this folder and code files

/* const config = require("../config.json");

module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
  
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
    console.log("Hello World");
    // Run the command
    cmd.run(client, message, args);
  }; */

const logger = require("../modules/logger.js");
const config = require('../config.json');

 module.exports = async(client, message) => {

  const { container } = client;

  if(message.author.bot ){
    if(config.debug_mode == 'true'){
      logger.log(`Latest message was sent by a bot`, "warn");
      return;
    }
    else{
      return;
    }
  }

  if(message.content.startsWith(config.prefix)){
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = container.commands.get(commandName);
    if(!command) return message.channel.send({content:  "That command doesn't exist!"});
    try{
      await command.run(client, message, args);
      if(config.debug_mode == 'true'){
        logger.log(`Message > ${message.content}`, "debug");
      }
    }
    catch (e) {
      message.channel.send({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\`` })
      .catch(e => console.error("An error occurred replying on an error", e));
    }
  }
 }