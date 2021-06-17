var Scraper = require('images-scraper');

let google = new Scraper({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
    },
});

module.exports = {
    name: 'search',
    description: 'Calls a scraper to Google Images and search memes',
    args: true,
    usage: '<Meme topic> <Amount of memes>',
    usageExample: 'Fornite 4',
    async execute(message, args){
        const results = await google.scrape('Memes de ' + args[0], args[1]);

        for (let i = 0; i < results.length; i++) 
          message.channel.send(results[i].url);
    }
}