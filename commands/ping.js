const config = require('../config.json');
module.exports.run = (client, message, args) => {
	message.channel.send("pong");
}

exports.name = "ping";