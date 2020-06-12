const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

const prefix = '!nick '

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(!msg.content.startsWith(prefix) || msg.author.bot){
        return;
    }
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if(command === 'change'){
        if(!args.length){
            return msg.channel.send('not enough args');
        }
        const user = msg.mentions.users.first();
        if(user) {
            const member = msg.guild.member(user);
            if(member){
                if(args[1]){
                    args.shift();
                    const newNickname = args.join(' ');
                    console.log(newNickname);
                    member.setNickname(newNickname);
                    return msg.channel.send(`${member}'s nickname has been changed to ${newNickname}`);
                } else {
                    return msg.channel.send('no new nickname specified');
                }
            }
        }
    }
    console.log(msg.content)
});

client.login(process.env.BOT_KEY)