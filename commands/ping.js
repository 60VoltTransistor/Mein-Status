const config = require("../config.json");


exports.run = (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
}

exports.name = "ping";