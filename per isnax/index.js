const fs = require('fs');
const {
  Client,
  Collection,
  Intents
} = require('discord.js');
const config = require('./config.json');

const Discord = require('discord.js');

const client = new Discord.Client(
  { intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING"] }
)
client.discord = Discord;
client.config = config;

client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
  const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
  for (const file of commandsFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
    console.log("✅ " + command.name)
  }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
};

client.on("ready", ready => {
  var canale = client.channels.cache.get("972920156210745425")
  canale.setName(`👪 Utenti: ${canale.guild.memberCount}`);
})

client.on("guildMemberAdd", member => {
  var canale = client.channels.cache.get("972920156210745425")
  canale.setName(`👪 Utenti: ${canale.guild.memberCount}`);
})

client.on("guildMemberRemove", member => {
  var canale = client.channels.cache.get("972920156210745425")
  canale.setName(`👪 Utenti: ${canale.guild.memberCount}`);
})

client.on("message", message => {
  const prefix = `${config.prefix}`;

  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

  var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

  if (comando.Admin) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.channel.send("Non hai il permesso di eseguire questo comando")
      return
    }
  }

  if (comando.nonrompere) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.channel.send("Comando non disponibile")
      return
    }
  }

  if (comando.Staff) {
    if (!message.member.roles.cache.get("962349068674273291")) {
      message.channel.send("Non hai il permesso di eseguire questo comando")
      return
    }
  }

  comando.execute(message, client, args);
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client, config);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    });
  };
});

client.on("messageCreate", message => {
  if (message.channel.id == "972565589459607604") {
    message.delete()
  }

})

client.login(config.token);