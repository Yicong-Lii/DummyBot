const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('stfu')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Mention the specfic user')
				.setRequired(true)),
	async execute(interaction) {
		console.log(interaction)
	},
};