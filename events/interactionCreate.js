const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const db = require('quick.db');
const { channels } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        console.log(interaction);
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        if (interaction.isSelectMenu()) {
            //Menus
            console.log("Menu selected!");

            try {
                const command = client.commands_slash.get(interaction.message.interaction.commandName);
                await command.button(interaction, client, interaction.button);
            } catch (error) {
                console.log(error);
            }
            
            return;
        }

        if (interaction.isButton()) {
            //Buttons
            console.log("Button Pressed!");

            try {
                const command = client.commands_slash.get(interaction.message.interaction.commandName);
                await command.button(interaction, client, interaction.button);
            } catch (error) {
                console.log(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }

            return;
        }

        if (interaction.isCommand()) {
            //Commands
            console.log("Command!")

            try {
                const command = client.commands_slash.get(interaction.commandName);
                if (!command) return;
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};