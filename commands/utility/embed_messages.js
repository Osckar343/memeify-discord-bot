const { MessageEmbed } = require('discord.js');

module.exports = {
  generating: new MessageEmbed()
    .setDescription('*GENERANDO ENCUESTA*')
    .setColor('YELLOW'),
  
  generated: new MessageEmbed()
    .setDescription('**Reacciona para empezar la encuesta.**')
    .setColor('BLUE'),

  announce: new MessageEmbed()
    .setTitle('Discord con Minecraft')
    .setDescription('¡Chat de Minecraft **enlazado** con el chat de Discord!\n\n Desde ahora te notificaré cuando el servidor esté en línea. \n También escribiré todos tus mensajes del chat de Minecraft en este mismo canal, incluyendo las veces que morirás por un *creeper*. ;)')
    .setThumbnail('https://i.imgur.com/MhyxXBd.png')
    .setColor('GREEN')
}