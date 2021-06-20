const fs = require('fs');

const Discord = require('discord.js');
require('discord-reply');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.answers = new Discord.Collection();
const answersFiles = fs.readdirSync('./answers').filter(file => file.endsWith('.js'));

for (const file of answersFiles) {
	const answer = require(`./answers/${file}`);
	client.answers.set(answer.name, answer);
}

client.on('ready', () => {
    client.user.setActivity("Minecraft", {
        type: "PLAYING",
      });

    console.log('Bot is ready as ' + client.user.tag);  
    console.log('ID Client: ' + client.user.id);
});

client.on('message', async (message) => {
	if (message.author.bot) return; //if bot sends a message, exit inmediately.

  for (var [clave, valor] of client.answers){
    if(message.content.match(valor.expression)){
      try {
        client.answers.get(clave).execute(message);
      } catch (error) {
        console.error(error);
        message.reply('there was an error trying to response :(');
      }
      break;
    }
  }
});

client.login(process.env.DJS_TOKEN);