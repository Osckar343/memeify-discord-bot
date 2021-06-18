const images = ["https://i.imgur.com/3ZzX2sy.png",
                "https://i.pinimg.com/236x/0f/a9/cb/0fa9cb4bbd1fd904f090292c93deb468.jpg",
                "https://i.pinimg.com/236x/d0/bc/31/d0bc31eeb055d3fc23d07640b9671a9e.jpg",
                "https://i.pinimg.com/236x/16/2c/95/162c95cdf30291ca6423251fffa0a2ba.jpg",
                "https://i1.sndcdn.com/avatars-CPi6UUCeycm8oxG4-v8m6bg-t500x500.jpg",
                "https://i.imgur.com/Ya9sdDC.png",
                "https://i.imgur.com/WwK42HJ.png"];

module.exports = {
    name: 'mine',
    description: 'Sends a random image',
    expression: /[Mm]ine/gm,
    execute(message) {
        let randomImage = Math.floor(Math.random() * (images.length - 0)) + 0;

        let greeting =  images[randomImage];
        message.lineReplyNoMention(greeting);
    }
}
