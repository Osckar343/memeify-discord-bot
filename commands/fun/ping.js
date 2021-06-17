module.exports = {
    name: 'ping',
    description: 'Abrazo!!',
    cooldown: 5,
    execute(message,args) {
        message.channel.send('Abrazo!!');
    }
}