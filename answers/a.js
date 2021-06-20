module.exports = {
    name: 'a',
    description: 'Responses with Hey',
    expression: /\b[aA]\b/is,
    execute(message) {
        message.lineReply('Hey'); 
    }
}