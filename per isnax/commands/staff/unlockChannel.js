const ds = require("discord.js");
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config  = require("../../config.json");

module.exports = {
    name: "unlock",
    Staff: true,
    async execute(interaction) {
        const role = config.utente;
        const staff = config.staff;

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('lock')
                    .setLabel('Blocca')
                    .setStyle('DANGER')
                    .setDisabled()
            )
            .addComponents(
                new MessageButton()
                .setCustomId('unlock')
                .setLabel("Sblocca")
                .setStyle("SUCCESS")
            )

        interaction.reply({
            content: "Blocca il canale!",
            components: [row]
        })
        const collector = interaction.channel.createMessageComponentCollector()

        collector.on('collect', async i => {
            if (i.customId === "unlock") {
            interaction.channel.edit({
                permissionOverwrites: [
                  {
                    id: config.staff,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                  },
                  {
                    id: config.utente,
                    allow: ['SEND_MESSAGES'],
                  },
                ],
            })
        }
        })
    }
}