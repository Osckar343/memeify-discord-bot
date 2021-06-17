const embed = require('./embed_messages.js');

module.exports = {
    name: 'test',
    description: 'Starts the meme poll at the beggining',
    async execute(message, args){
        let sent = await message.channel.send(embed.generating);

        let idMessage = sent.id; // you can get its ID with <Message>.id, as usually
            //let channelId = sent.channel;
            
        message.channel.messages.fetch(idMessage)
          .then(message =>  
                      message.react('1️⃣')
          .then(() => message.react('2️⃣'))
          .then(() => message.react('3️⃣'))
          .then(() => message.edit(embed.generated))
          .catch(error => console.error('One of the emojis failed to react:', error))
          ).catch(console.error);

          
        
        console.log('ID Del mensaje: ' + idMessage);
        return idMessage;
      }
}