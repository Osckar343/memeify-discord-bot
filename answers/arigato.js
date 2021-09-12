const gretings = ["Holi", "Holaa", "Qué tal", "Muy buenas", "Un gustazo", "Buenas", "Mucho gusto", "Konichiwa", "OHAYÔ", "Que onda", "Como estás", "Qué tal tu día"];

module.exports = {
    name: 'arigato',
    description: 'Bot responses with a nya',
    expression: /arigato/gim,

    execute(message) {
        const url = "https://cdn.discordapp.com/attachments/612084758620405763/886440915789545482/ezgif-7-2e7112020c83.gif";
        const emojis= message.guild.emojis.cache.map(emoji => emoji.toString()).join(" ").split(" "); //generate a list of all custom emojis (it doesn't work if the server doesn't have any emojis)

        let greeting = `Ñya ichi ni San ñya arigatooooo ♫ ♫ ♥ ♪ ♪ ♫!! ${url}`;  
        message.channel.send(greeting);
    }
}