require("dotenv").config()
const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


//welcome
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


/// load command files
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


//listning on discord input
client.on(Events.InteractionCreate, async interaction => {

	try{

		if (!interaction.isChatInputCommand()) return;
		if (interaction.commandName === 'ping') {

			// 获取用户选项
			const targetUser = interaction.options.getUser('user'); // 参数名为 'user'
			const message = interaction.options.getString('message'); // 参数名为 'message'

			if (!targetUser) {
				return interaction.reply({ content: '未指定用户！', ephemeral: true });
			}

			// 发送私信
			try {
				await interaction.deferReply({ ephemeral: true });
				await targetUser.send(`你收到了来自 ${interaction.user.globalName} 的悄悄话：${message || '没有附加消息'}`);
				await interaction.editReply({ content: `悄悄话已发送给 ${targetUser.globalName}！`, ephemeral: true });
			} catch (err) {
				await interaction.reply({ content: `无法发送消息给 ${targetUser.tag}，可能对方关闭了私信功能。`, ephemeral: true });
			}
		}
	}
	catch(err){
		console.log(err)
	}

});


// Log in to Discord with your client's token
client.login(process.env.TOKEN);