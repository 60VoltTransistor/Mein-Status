const config = require('../config.json');
module.exports.run = (client, message, args) => {
	if(config.debug_mode == 'false') return;
	console.log("Message >",message.content);
	message.channel.send("pong");
};