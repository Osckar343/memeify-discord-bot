const gretings = ["Holi", "Holaa", "Qué tal", "Muy buenas", "Un gustazo", "Buenas", "Mucho gusto", "Konichiwa", "OHAYÔ", "Que onda", "Como estás", "Qué tal tu día"];

module.exports = {
    name: 'hello',
    description: 'Bot responses with a greeting if a message contains a hello word or similar',
    expression: /h?(o+la+|o+l+i+(s?)|a+l+o+|e+ll+o+|k+o+n+i+c+h+i+w+a+|^h+i+\s|0+l+a+|^h+e+y+)i?a*?/gim,

    execute(message) {
        const emojis= message.guild.emojis.cache.map(emoji => emoji.toString()).join(" ").split(" "); //generate a list of all custom emojis (it doesn't work if the server doesn't have any emojis)

        let chooseRandomGreeting = Math.floor(Math.random() * (gretings.length - 0)) + 0;
        let chooseRandomEmoji = Math.floor(Math.random() * (emojis.length - 0)) + 0;

        //Example: Muy buenas Osckar!! <emoji> <emoji> <emoji>
        let greeting = `${gretings[chooseRandomGreeting]} ${message.author.username}!! ${emojis[chooseRandomEmoji]} ${emojis[chooseRandomEmoji]} ${emojis[chooseRandomEmoji]}`;  
        message.channel.send(greeting);
    }
}