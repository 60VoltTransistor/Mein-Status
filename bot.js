// Setup our environment variables via dotenv
require('dotenv').config()
// Import relevant classes from discord.js
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents: [
        /* for those that weren't aware, this is the way you are supposed to use these, I've seen online people have just pu9t these in quotes without values
           and claim that it has worked for them. However when I tested that, I kept getting errors regarding bits and what not, the correct way is to set this to a value,
           in this case it is a value bit shifted to the left or right x amount of times, you don't have to do it this way, you can just set it equal to a standard integar value
           as well. */
        GatewayIntentBits.GUILDS =(1 << 0),
        GatewayIntentBits.GUILD_MESSAGES=(1 << 9)
    ]
});
// Notify progress
client.on('ready', function(e){
    console.log(`Logged in as ${client.user.tag}!`)
})
// Authenticate
client.login(process.env.TOKEN)