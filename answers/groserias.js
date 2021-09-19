module.exports = {
    name: 'groserias',
    description: 'Responses with Hey',
    expression: /(c+a+b+r+o+n|k+b+r+o+n|p+r+r+o|p+t+o|i+m+b+e+c+i+l|i+n+c+h+e|p+i+t+o|a+l+v|e+r+g+a|d+e+s+g+r+a+c+i+a+d+o|p+u+t+o)/gim,
    execute(message) {
        message.lineReply('Hey, no digas maldiciones >:c'); 
        message.lineReply('https://i.imgur.com/3ZzX2sy.png'); 
        //a
    }
}