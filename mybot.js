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
    var cards = shuffled.slice(0,amount);
    return cards;
}

//Create the scryfall link so you can view the cards easily
function createScryfallLink(cardlist, order = "rarity", set = "m19") {
    var scryfalllink = "https://scryfall.com/search?unique=cards&as=grid&order=" + order + "&set=" + set + "&q=!";
    scryfalllink += cardlist.join('+or+!');
    scryfalllink = scryfalllink.replace(/ /g, '-');
    scryfalllink = scryfalllink.replace(/\s/g, ''); 
    return scryfalllink;
}

//Select a random card from the booster to set as the "playing" for the bot.
function setActivity(booster) {
    var randcard = Math.floor(Math.random() * booster.length);
    client.user.setActivity(booster[randcard].toString(), { type: 'PLAYING'});
}
            
client.on("message", (message) => {
    if (message.content.startsWith("!p1p1 paupercube")) {
        let booster = getCardsFromFile('./cardsets/paupercube.txt', 15);
            //Create scryfall link for images
        var scryfalllink = createScryfallLink(booster, "name");           
        setActivity(booster);
        message.channel.send(new Discord.RichEmbed().setDescription(booster).setURL(scryfalllink).setTitle("15 cards from Thepaupercube.com"));
    }
    else if (message.content.startsWith("!p1p1 brewchallenge")) {
        request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
            message.channel.send(new Discord.RichEmbed().setTitle(body.name).setDescription("This is your card now and your challenge is to brew a deck around it. \n Any format where it is legal is allowed.").setImage(body.image_uris.normal).setURL(body.scryfall_uri));
        });
    }
    else if (message.content.startsWith("!p1p1 chaos")) {
        message.channel.send("Starting to generate random cards, hang on while i work!");
        var booster = [];
        request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
            booster.push(body.name);
            request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                booster.push(body.name);
                request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                    booster.push(body.name);
                    request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                        booster.push(body.name);
                        request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                            booster.push(body.name);
                            request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                booster.push(body.name);
                                request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                    booster.push(body.name);
                                    request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                        booster.push(body.name);
                                        request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                            booster.push(body.name);
                                            request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                booster.push(body.name);
                                                request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                    booster.push(body.name);
                                                    request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                        booster.push(body.name);
                                                        request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                            booster.push(body.name);
                                                            request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                                booster.push(body.name);
                                                                request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                                    booster.push(body.name);
                                                                    message.channel.send(new Discord.RichEmbed().setDescription(booster).setTitle("15 random cards from the history of Magic!").setURL(createScryfallLink(booster, "name")));
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        var booster = [];
        request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
            booster.push(body.name);
            request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                booster.push(body.name);
                request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                    booster.push(body.name);
                    request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                        booster.push(body.name);
                        request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                            booster.push(body.name);
                            request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                booster.push(body.name);
                                request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                    booster.push(body.name);
                                    request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                        booster.push(body.name);
                                        request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                            booster.push(body.name);
                                            request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                booster.push(body.name);
                                                request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                    booster.push(body.name);
                                                    request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                        booster.push(body.name);
                                                        request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                            booster.push(body.name);
                                                            request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                                booster.push(body.name);
                                                                request('https://api.scryfall.com/cards/random', {json: true}, function (error, response, body) {
                                                                    booster.push(body.name);
                                                                    message.channel.send(new Discord.RichEmbed().setDescription(booster).setTitle("15 random cards from the history of Magic!").setURL(createScryfallLink(booster, "name")));
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
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
        setActivity(booster);
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
            !p1p1 m19 - Generate a 15 card booster pack for Core Set 2019. \n  \
            !p1p1 paupercube - Generate a 15 card booster pack for thepaupercube.com \n  \
            !p1p1 brewchallenge - You get 1 randomly picked card and have to build a deck around it. \n \
            - \n \
            !p1p1 about - Learn more about the bot. \n \
            !p1p1 help - Displays this info, its literally the command you just used."
        ));
    }
    else if (message.content.startsWith("!p1p1")) {
        message.channel.send("Use !p1p1 help");
    }
});

client.login("NDc1Njc1MzM3MjM4NTExNjE5.Dk4YgA.x9T2o9dqcCcPcP5x-jW2hiirjA4");