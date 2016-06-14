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

    var args = msg.content.split(" ");

    if(args[0] === callPrefix){
        if(msg.conent === callPrefix){

            bot.sendMessage(msg.channel, "Nyaaa~");

        } else if( args[1] === "killer"){

            bot.reply(msg," Albei Keith Capito Tolete");

        } else if( args[1] ==="creator"){

            bot.reply(msg, " the legendary Genesis-sama created me");

        } else if( args[1] ===  "xkcd" ){

            xkcd.img(function(err, img){
                var send_msg = "XKCD Image: " + img.title;
                send_msg += "\n" + img.url;
                bot.sendMessage(msg.channel, send_msg);
            });

        } else if( args[1] == "welcome" ){
            
            var welcomeMsg = "Welcome **" + args[2] + "** to the Dose Discord chat server!\n\n";
            welcomeMsg += "I am Me-me bot! I am the official helper bot of this chat server, I am still under develepment though, so for now you could ask my big sis __**Bot-chan**__ for help! Pro-tip, you could check her command list by sending `]help` in any text chat channel within the Dose server";
            welcomeMsg += "\n\n If you want more priviliges, please send a message within the **#general** channel and mentioning the **supreme_leader** i.e \"@supreme_leader more priviledes please!\"";
            welcomeMsg += "\n\n If you want to help develop me, you could fork my official repo and then send pull requests when you want to add your changes. Here is my GitHub link https://github.com/gmpalaganas/memecatdiscordbot";
            welcomeMsg += "\n\n I hope you enjoy your stay!";
            var server = bot.servers.get("name", "DOSE");
            var user = server.members.get("name", args[2]);

            if(user == null)
                bot.sendMessage(msg.channel, "User *" + args[2] + "* not found");
            else
                bot.sendMessage(user, welcomeMsg);

        }
        console.log("Received: " + msg.content);
    } else{
        if(ouchStrings.indexOf(msg.content) > -1){

            bot.reply(msg, " on a scale from 1-10, how would you rate your pain?");
            console.log("Received: " + msg.content);

        } else if(msg.content === "(╯°□°）╯︵ ┻━┻"){

            bot.reply(msg, " please respect tables ┬──┬ ノ( ゜-゜ノ)");
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

    }
});

bot.loginWithToken(authDetails.token);
