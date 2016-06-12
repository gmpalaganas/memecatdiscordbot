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
        console.log("Received: " + msg.content);
    }
    else if(msg.content === callPrefix + " who killed you?" || msg.content === callPrefix + " sinong pumatay sayo?"){
        bot.reply(msg,"Albei Keith Capito Tolete");
        console.log("Received: " + msg.content);
    }
    else if(msg.content === callPrefix){
        bot.reply(msg, "Nyaaa~");
        console.log("Received: " + msg.content);
    }
    else if(msg.content === "(╯°□°）╯︵ ┻━┻"){
        bot.reply(msg, " please respect tables ┬──┬ ノ( ゜-゜ノ)");
        console.log("Received: " + msg.content);
    }
});

bot.loginWithToken(authDetails.token);
