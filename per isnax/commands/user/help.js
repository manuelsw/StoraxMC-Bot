const discord = require("discord.js");

module.exports = {
    name: "help",
    description: "help command",
    nonrompere: true,
    async execute(interaction, client, message) {

        const embed = new discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Help Command")
            .addField("Musica", `\`!help music\``, true)
            .addField("Livellamento", `\`!help levels\``, true)
            .addField("Comandi", `\`!help command\``, true)
            .setFooter({
                text: "simple bot"
            })

        const row = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageSelectMenu()
                    .setCustomId("help")
                    .setPlaceholder("Seleziona")
                    .addOptions([
                        {
                            label: "Musica",
                            value: "musica"
                        },
                        {
                            label: "Comandi",
                            value: "comandi"
                        },
                    ]),
            );
            

        interaction.channel.send({
            embeds: [embed],
            components: [row]
        });

        const collector = interaction.channel.createMessageComponentCollector()

            collector.on('collect', async i => {

                const embed = new discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Musica")
                .addField(`\`!add [search]\``, "Aggiungi una canzone alla coda", false)
                .addField(`\`!join\``, "Fai entrare il bot nel tuo canale vocale", false)
                .addField(`\`!leave\``, "Fai uscire il bot dal tuo canale vocale", false)
                .addField(`\`!pause\``, "Pause the current playing track", false)
                .addField(`\`!play\``, "Inizia a riprodurre dalla coda", false)
                .addField(`\`!skip\``, "Salta alla prossima canzone", false)
                .setFooter({
                    text: "Page 1/1",
                    iconURL: client.user.displayAvatarURL()
                })

                const comandi = new discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("Comandi generali")
                    .addField(`\`!profile\``)
                    .addField(`\`!avatar\``)
                    .addField(`\`!join\``)

                const bottone = new discord.MessageActionRow()
                    .addComponents(
                        new discord.MessageButton()
                            .setCustomId("ciao")
                            .setLabel(`Request by ${interaction.author.tag}`)
                            .setStyle("SECONDARY")
                            .setDisabled()
                    )
                    if (i.values[0] == "musica") {
                        await i.update({
                            embeds: [embed],
                            components: [bottone]
                        })
                    }
            })
    }
}