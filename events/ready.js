//I'll include this just because, perhaps I'll change it in the future
const logger = require("../modules/logger.js");
//for fancy console.log text :)
const { cyan, red, magenta, gray, yellow, white, green } = require("colorette");

module.exports = async client => {
    //prints to the terminal that the bot has been logged in and ready
    logger.log(`${green(`Logged in as ${client.user.tag}!`)}`, "log");
    logger.log(`${green(`Bot Ready! :)`)}`,"ready");
};