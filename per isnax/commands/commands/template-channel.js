const discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "vtemplate",
    async execute(message, client) {

        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Template per canali")
            .setDescription("Ecco alcuni template per canali!\n**〃**\n**〢**\n**|**\n**﹙﹚**")


        message.channel.send({
            embeds: [embed],
            components: []
        })
    }
}