// Setup our environment variables via dotenv
require('dotenv').config()
// Import relevant classes from discord.js
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents: [
        /* GatewayIntentBits.GUILDS =(1 << 0),
        GatewayIntentBits.GUILD_MESSAGES=(1 << 9) */

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});
// Notify progress
client.on('ready', function(e){
    console.log(`Logged in as ${client.user.tag}!`)
})
// Authenticate
client.login(process.env.TOKEN)