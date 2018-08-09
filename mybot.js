var fs = require("fs");
const Discord = require("discord.js");
var request = require('request');

const client = new Discord.Client();

client.on("ready", () => {
    console.log("I am ready!");
});

//Shuffle the array of cards to not always get the same 15 cards
function shuffleArray(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

//Get a booster with a certain number of cards from a certain set
function getCardsFromFile(file, amount) {
    var selected = [];
    selected = fs.readFileSync(file, 'utf8').toString().split('\n');
    var shuffled = shuffleArray(selected);
    console.log(shuffled);
    var cards = shuffled.slice(0,amount);
    return cards;
}

//Create the scryfall link so you can view the cards easily
function createScryfallLink(cardlist, order = rarity, set = m19) {
    var scryfalllink = "https://scryfall.com/search?unique=cards&as=grid&order=" + order + "&set=" + set + "&q=";
    scryfalllink += cardlist.join('+or+!');
    scryfalllink = scryfalllink.replace(/ /g, '-');
    scryfalllink = scryfalllink.replace(/\s/g, ''); 
    return scryfalllink;
}

client.on("message", (message) => {
    if (message.content.startsWith("!p1p1 pauper")) {
        fs.readFile('./cardsets/paupercube.txt', 'utf8', function(err, text){
            var textByLine = text.split('\n');
            
            //Shuffle the cards so they aren't sorted and select 15 of them.
            const shuffled = textByLine.sort(() => .5 - Math.random());
            let selected = shuffled.slice(0,15);

            //Create scryfall link for images
            var scryfalllink = "https://scryfall.com/search?unique=cards&as=grid&order=name&q=";
            scryfalllink += selected.join('+or+!');
            scryfalllink = scryfalllink.replace(/ /g, '-');
            scryfalllink = scryfalllink.replace(/\s/g, '');  
           
            //Select a random card from the booster to set as the "playing" for the bot.
            var randcard = Math.floor(Math.random() * selected.length);
            client.user.setActivity(selected[randcard].toString(), { type: 'PLAYING'});

            message.channel.send(new Discord.RichEmbed().setDescription(selected).setURL(scryfalllink).setTitle("15 cards from Thepaupercube.com"));
        });
    }
    else if (message.content.startsWith("!p1p1 brewchallenge")) {
        request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
            message.channel.send(new Discord.RichEmbed().setTitle(body.name).setDescription("This is your card now and your challenge is to brew a deck around it. \n Any format where it is legal is allowed.").setImage(body.image_uris.normal).setURL(body.scryfall_uri));
        });
    }
    else if (message.content.startsWith("!p1p1 chaos")) {
        message.channel.send(new Discord.RichEmbed().setDescription("This feature is not implemented yet! \n Check back later!"));
    }
    else if (message.content.startsWith("!p1p1 m19")) {
        //Create the booster for this set
        //Boosters might be different for any particular set so create them separately
        let booster = getCardsFromFile('./cardsets/m19/common.txt', 10);
        booster = booster.concat(getCardsFromFile('./cardsets/m19/uncommon.txt', 3));
        if (Math.random() * (8 - 1) + 8 == 8) {
            booster = booster.concat(getCardsFromFile('./cardsets/m19/mythic.txt', 1));
        } else {
            booster = booster.concat(getCardsFromFile('./cardsets/m19/rare.txt', 1));
        }
        message.channel.send(new Discord.RichEmbed().setDescription(booster).setTitle("15 cards from Core Set 2019").setURL(createScryfallLink(booster, "rarity", "m19")));
    }
    else if (message.content.startsWith("!p1p1 about")) {
        message.channel.send(new Discord.RichEmbed().setTitle("About Pack1Pick1 bot").setDescription("\
            This bot was made to generate booster packs and discuss what to pick first in certain packs. \n \
            Author: Martin Ekström \n \
            Discord username: Yunra \n \
            Support development by donating: https://www.paypal.me/yunra"));
    }
    else if (message.content.startsWith("!p1p1 help")) {
        message.channel.send(new Discord.RichEmbed().setTitle("Supported commands").setDescription("\
            !p1p1 m19 - Generate a 15 card booster pack for Core Set 2019 \n  \
            !p1p1 pauper - Generate a 15 card booster pack for thepaupercube.com \n  \
            !p1p1 chaos - Generate a 15 card booster pack from random cards through Magic's history! \n \
            !p1p1 brewchallenge - You get 1 randomly picked card and have to build a deck around it. \n \
            - \n \
            !p1p1 about - Learn more about the bot \n \
            !p1p1 help - Displays this info, its literally the command you just used."
        ));
    }
    else if (message.content.startsWith("!p1p1")) {
        message.channel.send("Use !p1p1 help");
    }
});

client.login("NDc1Njc1MzM3MjM4NTExNjE5.DkyvmA.bCCfx61Ps-xpqhjCUYDCWRTmMPo");