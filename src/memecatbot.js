var Discord = require('discord.js');

var authDetails = require('../res/auth.json');
    
var bot = new Discord.Client();

process.on('exit', (code) => {
    console.log("Closing bot");
    bot.logout();
});


process.on('uncaughtException', (err) => {
    console.log('Caugth exception: ${err}');
});

var callPrefix = '!cat';
var ouchStrings = [
    'ouch',
    'ow',
    'aw',
    'it hurts',
    'masakit',
    'itai'
];


bot.on("message", (msg) => {
    if (ouchStrings.indexOf(msg.content) > -1){
       bot.reply(msg, " on a scale from 1-10, how would you rate your pain?");
    }
});

bot.loginWithToken(authDetails.token);
