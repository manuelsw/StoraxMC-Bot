const discord = require("discord.js");

module.exports = {
    name: "say",
    Admim: true,
    syntax: "!say (Messaggo)",
    execute(message, client) {

        if(!message.member.roles.cache.has("962349068674273291")) {
            return message.reply({
                content: "Non hai il permesso!",
                ephemeral: true
            })
        }

        var tag = message.content.slice(5).trim();

        const embed = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(`${tag}`)
            .setFooter({
                image: client.user.avatarURL(), 
                text: "StoraxMC Management"
            })


        if (!tag) {
            return message.reply({
                content: "Inserisci un messaggio", 
                ephemeral: true
            })
        }

        message.delete()
        message.channel.send({
            embeds: [embed]
        })
        

    }
}