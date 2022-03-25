const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require("discord.js");

module.exports = {
	data: {
        slash: new SlashCommandBuilder()
		    .setName("help")
            .setDescription("Replies with help"),
        type: [],
		name: "help"
    },
	async execute(interaction, client) {
		const embed = new MessageEmbed()
			.setTitle("Help")
			.setDescription("This is a list of commands you can use in this server.")
			.fields(
				{ name: "/help", value: "Replies with this message." }
			)
	},
};