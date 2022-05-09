const discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "vremove",
    async execute(message, client) {
        var canale = client.guilds.cache.get(message.guildId).channels.cache.find(c => c.topic == message.author.id)
        var utente = message.mentions.members?.first()

        canale.edit({
            permissionOverwrites: [
                {
                    id: message.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                    id: config.utente,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
                {
                    id: utente,
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                }
            ],
        })
        message.reply({ content: `E' stato correttamente rimosso l'utente ${utente}!`, ephemeral: true })
    }
}