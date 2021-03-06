const Discord = require('discord.js');
const client = new Discord.Client;

//create your own auth.json in the repository
// { "token" : "YOUR TOKEN HERE"}
const auth = require('./auth.json');

const prefix = '!';

//song queue
const queue = new Map();

//
const fs = require('fs');

//collection of commands
client.commands = new Discord.Collection;

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
//loop through to get the files
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command); //commad? 
}

client.once('ready', () => {
    console.log('Setu bot online!');
});

client.on('message', async (message) => {
    //safety check if the command is sent by the bot itself
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //get a server queue
    const serverQueue = queue.get(message.guild.id);

    //get command
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == 'hi') {
        client.commands.get('hello').execute(message, args);
        return;
    }
    if (command == 'play') {
        client.commands.get('play').execute(message, serverQueue, queue, args);
        return;
    }
    if (command == 'skip') {
        client.commands.get('skip').execute(message, serverQueue, queue);
        return;
    }
    if (command == 'stop') {
        client.commands.get('stop').execute(message, serverQueue, queue);
        return;
    }
    if (command == 'setu') {
        client.commands.get('setu').execute(message,args);
        return;
    }
    if(command == 'gel'){
        client.commands.get('gel').execute(message,args);      
    }
    if(command == 'tag'){
        client.commands.get('tag').likeTags(message,args);
    }
    if(command =='yand'){
        client.commands.get('yandere').execute(message,args);
    }
    if(command =='wpp'){
        client.commands.get('konachannet').execute(message,args);
    }
    if(command =='kona'){
        client.commands.get('konachancom').execute(message,args);
    }
})

client.login(auth.token);