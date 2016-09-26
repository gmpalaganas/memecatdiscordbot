var Discord = require('discord.js');
var xkcd = require('xkcd-imgs');
var cheerio = require('cheerio');
var request = require('request');
var hepburn = require('hepburn');

var authDetails = require('../res/auth.json');

var mayPasokBaUrl = "maypasokba.com";
    
const bot = new Discord.Client();

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

        logMessage(msg);
        console.log("Received: " + msg.content);
        console.log("Channel ID: " + msg.channel.id);

        if(msg.conent === callPrefix){

            msg.channel.sendMessage("Nyaa~");

        } else if( args[1] === "killer"){

            msg.reply("Albei Keith Capito Tolete");

        } else if( args[1] ==="creator"){

            msg.reply("The legendary Genesis-sama created me");

        } else if( args[1] ===  "xkcd" ){

            xkcd.img(function(err, img){
                var send_msg = "XKCD Image: " + img.title;
                send_msg += "\n" + img.url;
                msg.channel.sendMessage(send_msg);
            });

        } else if( args[1] === "welcome" ){
            
            var welcomeMsg = "Welcome **" + args[2] + "** to the Dose Discord chat server!\n\n";
            welcomeMsg += "I am Me-me bot! I am the official helper bot of this chat server, I am still under develepment though, so for now you could ask my big sis __**Bot-chan**__ for help! Pro-tip, you could check her command list by sending `]help` in any text chat channel within the Dose server";
            welcomeMsg += "\n\n If you want more priviliges, please send a message within the **#general** channel and mentioning the **supreme_leader** i.e *\"@supreme_leader more privileges please!\"*";
            welcomeMsg += "\n\n If you want to help develop me, you could fork my official repo and then send pull requests when you want to add your changes. Here is my GitHub link https://github.com/gmpalaganas/memecatdiscordbot";
            welcomeMsg += "\n\n I hope you enjoy your stay!";
            var server = bot.servers.get("name", "DOSE");
            var user = server.members.get("name", args[2]);

            if(user == null)
                msg.channel.sendMessage("User *" + args[2] + "* not found");
            else
                user.sendMessage(welcomeMsg);

        } else if( args[1] === "help"){
            var helpMsg = "** Me-me cat bot commands list **\n";
            helpMsg += "**!cat help** see commands list\n";
            helpMsg += "**!cat xkcd** show random xkcd comic\n";
            helpMsg += "**!cat welcome *user*** send a welcome message to *user*\n";
            helpMsg += "**!cat creator** show cat bot creator\n";
            helpMsg += "**!cat killer** show cat killer";
            helpMsg += "**!cat romanize <hiragana/katakana string>** converts from hiragana/katakana to romaji"
            helpMsg += "**!cat toHiragana <romaji>** converts from romaji to hiragana"
            helpMsg += "**!cat toKatakana <romaji>** converts from romaji to katakana"
            msg.author.sendMessage(helpMsg);
        } else if( args[1] == "romanize" ){
            var reply = convertArgsString(args.slice(2),hepburn.fromKana);
            msg.reply(reply);
        } else if ( args[1] == "toHiragana"){
            var reply = convertArgsString(args.slice(2),hepburn.toHiragana);
            msg.reply(reply);
        } else if ( args[1] == "toKatakana"){
            var reply = convertArgsString(args.slice(2),hepburn.toKatakana);
            msg.reply(reply);
        }
    } else{
        if(ouchStrings.indexOf(msg.content) > -1){

            logMessage(msg);
            msg.reply(" on a scale from 1-10, how would you rate your pain?");

        } else if(msg.content === "(╯°□°）╯︵ ┻━┻"){

            logMessage(msg);
            msg.reply(" please respect tables ┬──┬ ノ( ゜-゜ノ)");

        } else if(msg.content.toLowerCase() == "may pasok ba?"){

            logMessage(msg);
            request("http://www.maypasokba.com/", function(error, response, body){
                if(error)
                    console.log(error);
                else{
                    $ = cheerio.load(body);
                    var maypasok = $('h1').html();
                    msg.channel.sendMessage(maypasok);
                }
            });
        }

    }
});

bot.login(authDetails.token);

function logMessage(msg){
    console.log("Received: " + msg.content);
    console.log("Channel ID: " + msg.channel.id);
    console.log("Author id " + msg.author.id);
    //msg.channel.sendMessage("Recieved command: " + msg.content);
}


function convertArgsString(args, func){
    var retStr = '';
    for(var i = 0; i < args.length; i++)
        retStr += func(args[i]) + ' ';
    return retStr;
}
