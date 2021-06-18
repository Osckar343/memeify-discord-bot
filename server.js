const fs = require('fs');

const Discord = require('discord.js');
require('discord-reply');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.answers = new Discord.Collection();
const answersFiles = fs.readdirSync('./answers').filter(file => file.endsWith('.js'));
const customGreetings = require('./answers/hello.js');
const customImages = require('./answers/mine.js');

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
    idClient = client.user.id;
});

client.on('message', async (message) => {
	if (message.author.bot) return;

  if (message.content.match(customGreetings.expression))
    customGreetings.execute(message);
  if ( message.content.match(customImages.expression) )
    customImages.execute(message);

  if (!client.answers.has(message.content)) return; 

	try {
		client.answers.get(message.content).execute(message);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to response :(');
	}
});

client.login(process.env.DJS_TOKEN);