const discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "vdelete",
    async execute(interaction, client) {
        var canale = client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.author.id)

        const bot = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("cancella")
                    .setLabel("Cancella canale")
                    .setStyle("DANGER"),
                new MessageButton()
                    .setCustomId("nocancella")
                    .setLabel("Annulla chiusura")
                    .setStyle("SUCCESS"),
            )

        interaction.channel.send({
            content: "Sei sicuro di cancellare il canale?\nRicorda, dopo che avrai cliccato cancella non potrai ritornate in dietro!",
            components: [bot]
        })


        const collector = interaction.channel.createMessageComponentCollector({ time: 3000  })

        collector.on("collect", i => {
            if (i.customId == "cancella") {
                i.reply({
                    content: "Il canale verrà eliminato tra: **10 secondi!**"
                })
                setTimeout(() => {
                    canale.delete();
                }, 10000);
            }
        })

    }
}