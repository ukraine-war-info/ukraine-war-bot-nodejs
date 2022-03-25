const fs = require("fs")

module.exports = {
    name: 'messageCreate',
    async execute(message, client, Discord) {
        const { token, debugMode } = require("../config.json");
        var { prefix } = require("../config.json")
        
        //check if the client ID is the same as the message author ID
        if (message.author.id == client.user.id) return;

        const member = message.author;
        const guild = message.guild;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (debugMode == 1) {
            console.log(args);
            console.log(command);
            console.log(member);
            console.log(guild);
        }

        if (message.content == "<@!" + client.user.id + ">") {
            client.commands_chat.get("help").execute(client, Discord, message, guild);
        }

        //Checks if message has the prefix
        if (!message.content.startsWith(prefix)) return;
        //Checks if there is a command with that name
        if (!client.commands_chat.has(command)) {
            console.log(command)
            message.channel.send("I don't know that command!");
            return;
        }

        try {
            client.commands_chat.get(command).execute(client, Discord, message, guild);
        } catch (error) {
            console.error(error);
            message.reply(`there was an error trying to execute that command!`);
        }
    },
};