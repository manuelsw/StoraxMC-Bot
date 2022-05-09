const discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "vip",
    Admin: true,
    async execute(interaction, client) {

        // Embed
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Private Rooms")
            .setFooter("StoraxMC | Vip")
            .setDescription(
                "**TIPOLOGIE CANALI**\n\n**__CANALI VOCALI__**\nCreare un canale vocale dove puoi parlare con gli amici privatamente\n\n**__CANALE TESTUALE__**\nCreare un canale testuale dove puoi scrivere con gli amici privatamente,\nIn questi canali è \"permesso\" inviare messaggi con parolacce!\n\n**__COMANDI CANALI__**\n**!vadd** - Aggiungere un utente\n**!vremove (!vrem)** - Rimuovere un utente\n**!vdelete** (!vdel) - Cancellare un canale\n**!vrename (!vren)** - Rinomina il canale"
            )
            
        
        // Bottoni
        const bottone = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("vocale")
                    .setStyle("PRIMARY")
                    .setLabel("Canale Vocale"),
                new MessageButton()
                    .setCustomId("testuale")
                    .setLabel("Canale Testuale")
                    .setStyle("PRIMARY")
            )
        interaction.channel.send({
            embeds: [embed],
            components: [bottone]
        })

        const collector = interaction.channel.createMessageComponentCollector({ time: 300000000  })

        collector.on("collect", i => {
            if (i.customId == "vocale") {
                if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.name == `🔐〢Privata ${i.user.username}`)) {
                    return i.reply({
                        content: "Hai già un canale creato!",
                        ephemeral: true 
                    })
                }
                i.guild.channels.create(`🔐〢Privata ${i.user.username}`, {
                    type: "GUILD_VOICE",
                    parent: config.vipVocale,
                    permissionOverwrites: [
                        {
                            id: i.user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: i.guild.id,
                            deny: ['VIEW_CHANNEL']
                        }
                    ]
                })
                i.reply({
                    content: "Il canale è stato creato con successo!",
                    ephemeral: true
                })
            }
        })

        collector.on("collect", i => {
            if (i.customId == "testuale") {
                if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.name == `🔐〢privata-${i.user.username}`)) {
                    return i.reply({
                        content: "Hai già un canale creato!",
                        ephemeral: true 
                    })
                }
                i.guild.channels.create(`🔐〢privata-${i.user.username}`, {
                    type: "GUILD_TEXT",
                    topic: i.user.id,
                    parent: config.vipVocale,
                    permissionOverwrites: [
                        {
                            id: i.user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: i.guild.id,
                            deny: ['VIEW_CHANNEL']
                        }
                    ]
                })
                i.reply({
                    content: "Il canale è stato creato con successo!",
                    ephemeral: true
                })
            }
        })
    }
}