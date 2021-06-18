module.exports = {
    name: 'a',
    description: 'Responses with Hey',
    execute(message) {
        message.lineReply('Hey'); 
        message.lineReplyNoMention(`My name is`);
    }
}