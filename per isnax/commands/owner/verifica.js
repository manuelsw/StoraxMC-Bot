const discord = require("discord.js");

module.exports = {
    name: "verifica",
    owner: true,
    async execute(interaction, client,) {

        const embed = new discord.MessageEmbed()
            .setTitle("Verifica")
            .setColor("BLUE")
            .setDescription("Ciao utente!\nBenvenuto sul server discord di StoraxMC!\nPrima di accedere ai canali della community, consigliamo di leggere ciò che scritto qui sotto!\n\n**INFORMAZIONI SERVER!**\nPrima di interagire col network, ti consigliamo di visionare il <#939241192854540308>, la mancata visione non potrà essere giustificata.Il server è munito di 3 chat pubbliche:")
            .addField(`Chat Generale`, "Può essere usata per chattare con gli utenti", true)
            .addField(`Chat Comandi`, "Può essere usata **_solo_** per i comandi.", true)
            .addField(`Chat Media`, "può essere usata per mandare dei video o immagini.", true)
            .addField(`Ti serve assistenza`, "Apri un ticket nel canale <#951905443469480026> o per supporto vocale <#962348500987805726>", true)
            .setFooter("StoraxMC", client.user.avatarURL())
        const verifica = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("verificato")
                    .setLabel("Verificati")
                    .setEmoji("✅")
                    .setStyle("SUCCESS"),
            )

        await interaction.channel.bulkDelete(1);
        interaction.channel.send({
            embeds: [embed],
            components: [verifica]
        })

        const collector = interaction.channel.createMessageComponentCollector({ time: 300000000  })

        collector.on("collect", async i => {
            if (i.customId == "verificato") {
                if (!interaction.member.roles.cache.get("")) {
                    await i.reply({
                        content: "Sei già verificato!",
                        ephemeral: true
                    })
                } else {
                    await i.member.roles.add('')
                    i.reply({
                        content: "Ti sei verificato correttamente",
                        ephemeral: true
                    })
                }
            }
        })
    }
}