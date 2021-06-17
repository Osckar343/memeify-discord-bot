const embed = require('./embed_messages.js');

module.exports = {
    name: 'minecraft',
    description: 'Starts the meme poll at the beggining',
    async execute(message, args){
        //await message.channel.send(embed.announce);
      
        let sent  = await message.channel.send('https://i.imgur.com/3ZzX2sy.png');

        let idMessage = sent.id; // you can get its ID with <Message>.id, as usually
            //let channelId = sent.channel;
            
        /*message.channel.messages.fetch(idMessage)
          .then(message =>  
                      message.react('❤')
          ).catch(console.error);*/

        /*message.channel.messages.fetch(idMessage)
          .then(message =>  
                      message.pin({reason: 'important' })
          ).catch(console.error);*/

          message.delete();
        return idMessage;
      }
}