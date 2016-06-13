var Discord = require('discord.js');
var xkcd = require('xkcd-imgs');
var cheerio = require('cheerio');
var request = require('request');

var authDetails = require('../res/auth.json');

var mayPasokBaUrl = "maypasokba.com";
    
var bot = new Discord.Client();

process.on('exit', (code) => {
    console.log("Closing bot");
    bot.logout();
});


process.on('uncaughtException', (err) => {
    console.log('Caugth exception: ' + err);
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
    } else if(msg.content === callPrefix + " who killed you?" || msg.content === callPrefix + " sinong pumatay sayo?"){
        bot.reply(msg,"Albei Keith Capito Tolete");
        console.log("Received: " + msg.content);
    } else if(msg.content === callPrefix){
        bot.reply(msg, "Nyaaa~");
        console.log("Received: " + msg.content);
    } else if(msg.content === "(╯°□°）╯︵ ┻━┻"){
        bot.reply(msg, " please respect tables ┬──┬ ノ( ゜-゜ノ)");
        console.log("Received: " + msg.content);
    } else if(msg.content === callPrefix + " who created you?"){
        bot.reply(msg, " the legendary Genesis-sama created me");
        console.log("Received: " + msg.content);
    } else if(msg.content === callPrefix + " xkcd" ){
        xkcd.img(function(err, img){
            var send_msg = "XKCD Image: " + img.title;
            send_msg += "\n" + img.url;
            bot.sendMessage(msg.channel, send_msg);
        });
        console.log("Received: " + msg.content);
    } else if(msg.content.toLowerCase() == "may pasok ba?"){
        request("http://www.maypasokba.com/", function(error, response, body){
            if(error)
                console.log(error);
            else{
                $ = cheerio.load(body);
                var maypasok = $('h1').html();
                bot.sendMessage(msg.channel, maypasok);
            }
        });
        console.log("Received: " + msg.content);
    }
});

bot.loginWithToken(authDetails.token);
