const fs = require('fs');
const { prefix, token, tenorApiKey } = require('./config.json');
const aws = require('aws-sdk');

const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const mysql = require('mysql');

//hola esto es un cambio 0w0

//esto es otro cambio

const Tenor = require("tenorjs").client({
  "Key": tenorApiKey, // https://tenor.com/developer/keyregistration
  "Filter": "off", // "off", "low", "medium", "high", not case sensitive
  "Locale": "en_US", // Your locale here, case-sensitivity depends on input
  "MediaFilter": "minimal", // either minimal or basic, not case sensitive
  "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});


client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for(const folder of commandFolders){
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

  /*var job = new CronJob(
      '* * * * * *',
      function() {
        console.log('every second');
      },
      null,
      false,
      'America/Los_Angeles'
    );  
    job.start();*/

    //Receiving the message

//var CronJob = require('cron').CronJob;

var idMessage = "";
var idClient = "";
var objMessage = new Discord.Message();

//Initialized in 1 because bot always reactions first.
var option1 = 1;
var option2 = 1;
var option3 = 1;

var objMessage = new Discord.Message();
var bandera = 0;

let s3 = new aws.S3({
  accessToken: process.env.token,
});

client.login(s3.accessToken);

client.on('ready', () => {
    client.user.setActivity("Minecraft", {
        type: "PLAYING",
      });

    console.log('Bot is ready as ' + client.user.tag);  
    console.log('ID Client: ' + client.user.id);
    idClient = client.user.id;
});

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

client.on('message', async (message) => {
  if(!message.content.startsWith(prefix) || message.author.bot) return; //If the message either doesn't start with the prefix or the author is a bot, exit early

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  if (!client.commands.has(commandName)) return; //if command doesn't exists

  const command = client.commands.get(commandName);

  if (command.args && !args.length) { //If command has args but user doesn't provide them 
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      reply += `\n\nFor example: \`${prefix}${command.name} ${command.usageExample}\``;
    }

    return message.channel.send(reply);
  }

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

  /*if (command === 'ping') {
		message.channel.send('Pong.');
	} else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}

		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}*/


  /*objMessage = message; //global

  if(message.content === 'a'){
    message.lineReply('Hey'); //Line (Inline) Reply with mention
  }
  
  if(message.content == 'xdxd'){
    message.lineReplyNoMention('My name is ' + (await (await client.user.fetch('330183814863257602')).username));
  }
  //message.lineReplyNoMention(`My name is ${client.user.username}`); //Line (Inline) Reply without mention
  //message.channel.send('XDXDXD @330183814863257602');
  
  const generating = new Discord.MessageEmbed()
  .setDescription('*GENERANDO ENCUESTA*')
  .setColor('BLUE');

  const generated = new Discord.MessageEmbed()
  .setDescription('**Reacciona para empezar la encuesta.**')
  .setColor('BLUE');

  if(message.content == 'write'){
    let sent = await message.channel.send(generating);

    idMessage = sent.id; // you can get its ID with <Message>.id, as usually
    channelId = sent.channel;
    
    message.channel.messages.fetch(idMessage)
      .then(message =>  
                  message.react('1️⃣')
      .then(() => message.react('2️⃣'))
      .then(() => message.react('3️⃣'))
      .then(() => message.edit(generated))
      .catch(error => console.error('One of the emojis failed to react:', error))
    ).catch(console.error);

    console.log('ID Del mensaje: ' + idMessage);
  }

  if(message.content == 'count'){
    message.channel.messages.fetch(idMessage).then(
      function (message){
        const reactions = message.reactions.cache;
        console.log('Reacciones: '  + reactions.get('1️⃣').count);
        console.log('Reacciones: '  + reactions.get('2️⃣').count);
        console.log('Reacciones: '  + reactions.get('3️⃣').count);
      });
  }
  
  

    if(message.content === 'search'){
      (async () => {
        const results = await google.scrape('Memes de Genshin Impact', 30);
        //message.channel.send('')
        for (let i = 0; i < results.length; i++) {
          message.channel.send(results[i].url);
        }

        //console.log('results', results);
      })();
    }

    console.log(message.content); 
    if(message.content === 'test'){

      let porcentaje = 100;

        const title = new Discord.MessageEmbed()
        .setTitle('**ATENCIÓN!!!** Se abre votación para escoger nuevo *TOPIC*!!')
        .setColor('BLUE');

        const poll = new Discord.MessageEmbed()
          .addField('1️⃣ League of Legends','⬜⬜⬜⬛⬛⬛⬛⬛⬛⬛' + ' - ' + porcentaje + '%')
          .addField('2️⃣ Programación','⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛' + ' - ' + porcentaje + '%')
          .addField('3️⃣ Minecraft','⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜' + ' - ' + porcentaje + '%')
          .setDescription('¿De qué tema te gustaría ver memes?')
          .setThumbnail('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dbe21d7e-5f33-4784-9f21-218c9a3b9b8a/d74335n-ed3a5286-29c7-4ac4-901c-4c226eca5d43.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RiZTIxZDdlLTVmMzMtNDc4NC05ZjIxLTIxOGM5YTNiOWI4YVwvZDc0MzM1bi1lZDNhNTI4Ni0yOWM3LTRhYzQtOTAxYy00YzIyNmVjYTVkNDMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.mu7oizEDI7YswedsL33n68JO2XxhT9XwNNCTzS_iPq4')
          .addFields(
            { name: '\u200B', value: '\u200B'},
            { name: '\u200B', value: '**Más votado** : *League of Legends*', inline: true },
          )
          .setImage('https://media1.tenor.com/images/7ae3f6f1c48b01549b855cb0f6b1c4d7/tenor.gif?itemid=5658972')
          .setTimestamp()
          .setFooter('Reacciona para votar', 'https://i.pinimg.com/736x/3f/a3/a1/3fa3a17031811cf7d77813bcc373bee1.jpg');

        message.channel.send(title);
        message.channel.send(poll)
          .then( function (message) {      
             message.react('1️⃣')
             .then(() => message.react('2️⃣'))
             .then(() => message.react('3️⃣'))
             .catch(error => console.error('One of the emojis failed to react:', error));
          });
    }
    const allowedGreeting = /h?(o+la+|o+l+i+(s?)|a+l+o+|e+ll+o+|k+o+n+i+c+h+i+w+a+|^h+i+\s|0+l+a+|^h+e+y+)i?a*?/gim;
    
    if( message.content.match(allowedGreeting)  && message.author.username !== 'Mine'){
        let greeting = between(1,7);
        const ayy = client.emojis.cache.get("771522257532223528");
        switch(greeting)
        {
            case 1: message.channel.send(`Holi ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 2: message.channel.send(`Holaa ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 3: message.channel.send(`Que tal ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 4: message.channel.send(`Muy buenas ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 5: message.channel.send(`Un gustazo ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 6: message.channel.send(`Buenas ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 7: message.channel.send(`Mucho gusto ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
        }
        
    }

    if (message.content === '**help') {
        const embed = new MessageEmbed()
            .setTitle('Lista de comandos. Tsssss')
            .addField('**pepe','Revela algunas de las frases más icónicas de SanfinG')
            .addField('**emojis','Despliega todos los emojis personalizados del servidor')
            .addField('**random','Muestra un emoji animado al azar')
            .setColor('GREEN')

        message.channel.send(embed);
      }

      if (message.content === "**emojis") {
        const emojiList = message.guild.emojis.cache.map(emoji => emoji.toString()).join(" ");
        message.channel.send(emojiList);
        console.log(emojiList);
      }

      if (message.content === "**pepe") {
        message.channel.send('chingatumadrepepe');
      }

      if(message.content === "**random"){
        let greeting = between(1,6);
        const left = client.emojis.cache.get('846629136008478731');
        const right = client.emojis.cache.get("846629293319913485");
        const angry = client.emojis.cache.get("846633284708073472");
        const bunhu = client.emojis.cache.get("846633285089755147");
        const pixelssway = client.emojis.cache.get("846633285601329213");
        const dance = client.emojis.cache.get("846633562513997854");
        const no = client.emojis.cache.get("846100084864843817");

        switch(greeting)
        {
            case 1: message.channel.send(`${left} ${right}`); break;
            case 2: message.channel.send(`${angry}`); break;
            case 3: message.channel.send(`${bunhu}`); break;
            case 4: message.channel.send(`${pixelssway}`); break;
            case 5: message.channel.send(`${dance}`); break;
            case 6: message.channel.send(`${no}`); break;
            default: break;
        }
        message.delete();
    } */
});

client.on('messageReactionAdd', async (reaction, user) => {
  if(reaction.message.id === idMessage && user.id != client.user.id){
   if(reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣')
    updatePoll(reaction);
  }
});


client.on('messageReactionRemove', (reaction, user) => {
  if(reaction.message.id === idMessage && user.id != client.user.id){
    if(reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣')
     updatePoll(reaction);
   }
});

function countReactions(messageObj){
  //let arrayReactions = Array.from({ length: 3 }, (_, idx) => 0);
  let array = [0,0,0];
  messageObj.channel.messages.fetch(idMessage).then(
     array = getArrayReactions(messageObj)
    );
    
    return array;
}

function getArrayReactions(messageObj){
  let arrayReactions = [0,0,0];
  const reactions = messageObj.reactions.cache;

  arrayReactions[0] = reactions.get('1️⃣').count;
  arrayReactions[1] = reactions.get('2️⃣').count;
  arrayReactions[2] = reactions.get('3️⃣').count;

  return arrayReactions;
}

async function updatePoll(reaction){
  getFetched(reaction);

  let dataReactions = countReactions(objMessage);
  console.log('datavotes: ' + dataReactions);
  //data base.

  let porcentages = calculatePorcentage(dataReactions);
  let pollUpdated = await generatePoll(porcentages);
  reaction.message.edit(pollUpdated);
}

async function getFetched(reaction){
  try {
    await reaction.fetch();
  } catch (error) {
    console.log('Something went wrong when fetching the message: ', error);
    return;
  }
}

function generateProgressBar(arrayPorcentages){
  let barSize = 10;
  let arrayProgressBar = Array.from({ length: arrayPorcentages.length }, (_, idx) => "");

  for (let i = 0; i < arrayPorcentages.length; i++) {
    for (let j = 0; j < barSize; j++) {
      if(j < (arrayPorcentages[i] / barSize))
        arrayProgressBar[i] += '⬜';
      else 
       arrayProgressBar[i] += '⬛';
    }
  }
  return arrayProgressBar;
}

function calculatePorcentage(arrayVotes){
  let total = arrayVotes.reduce((a, b) => ( a + b ) , 0) - arrayVotes.length; //get the sume of all votes.
  let arrayPorcentages = new Array(arrayVotes.length);
  for (let i = 0; i < arrayVotes.length; i++) 
    if(total === 0)
     arrayPorcentages[i] = 0;
    else
      arrayPorcentages[i] = ( (arrayVotes[i]  - 1) / total ) * 100;
  
  return arrayPorcentages;
}

async function generatePoll(porcentages){
  let topicTitle = getWinnerTopic();
  let urlGif = await getUrlGif(topicTitle);
  let progressBar = generateProgressBar(porcentages);

  const poll = await createPoll(progressBar,porcentages,urlGif);
  return poll;
}

async function  getWinnerTopic(){
  titles = getTitles();

}

async function getTitles(){

}

async function getUrlGif(searchElement){
  let result = await Tenor.Search.Random('Halo','1');

  for (let i = 0; i < result.length; i++) {
    return result[0].media[0].gif.url;
  }
}

async function createPoll(progressBar, porcentages,urlGif){
  const poll = new Discord.MessageEmbed()
  .addField('1️⃣ League of Legends',progressBar[0] + ' - ' + porcentages[0] + '%')
  .addField('2️⃣ Programación',progressBar[1] + ' - ' + porcentages[1] + '%')
  .addField('3️⃣ Minecraft',progressBar[2] + ' - ' + porcentages[2] + '%')
  .setDescription('¿De qué tema te gustaría ver memes?')
  .addFields(
    { name: '\u200B', value: '\u200B'},
    { name: '\u200B', value: '**Más votado** : *League of Legends*', inline: true },
  )
  .setImage(urlGif)
  .setTimestamp()
  .setColor('BLUE')
  .setFooter('Reacciona para votar', 'https://i.pinimg.com/736x/3f/a3/a1/3fa3a17031811cf7d77813bcc373bee1.jpg');
  
  return poll;
}