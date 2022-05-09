const discord = require("discord.js");

module.exports = {
    name: "demote",
    Admin: true,
    execute(message, member, client) {
        var utente = message.mentions.members?.first()
        var ruolo = message.mentions.roles?.last()
        var tag = message.content.slice(54).trim();

        const promozione = new discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle("❌ Nuovo Degrado!")
            .setDescription(`${utente} è diventato Utente!`)
            .setFooter("StoraxMC Management")

        message.delete()    
        message.channel.send({
            embeds: [promozione]
        })

        utente.roles.remove(ruolo)
        utente.setNickname(tag);
        
    }
}