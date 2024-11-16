const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Require two perameters: 1. user  2. message')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('mention the specfic user')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The input to specific user')
				.setRequired(true)),
	async execute(interaction) {
		console.log(interaction)
	},
};