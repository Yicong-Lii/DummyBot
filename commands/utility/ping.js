const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Require two perameters: 1. user  2. message  3. sendNum (optional) ')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Mention the specfic user')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The input to specific user')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('sendnum')
				.setDescription('Send amount')
		),
	async execute(interaction) {
		console.log(interaction)
	},
};