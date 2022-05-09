const discord = require("discord.js");

module.exports = {
    name: "promote",
    execute(message, member, client) {
        var utente = message.mentions.members?.first()
        var ruolo = message.mentions.roles?.last()
        var tag = message.content.slice(54).trim();

        const promozione = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle("✅ Nuova Promozione!")
            .setDescription(`${utente} è diventato ${ruolo}`)
            .setFooter("StoraxMC Management")
            .setTimestamp()
        const dm = new discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Promozione")
            .setDescription(`Sei stato promosso a ${ruolo}`)
            .setFooter("StoraxMC Management")
            .setTimestamp()
        message.delete()    
        message.channel.send({
            embeds: [promozione]
        })

        utente.send({
            embeds: [dm]
        })
        utente.roles.add("")
        utente.roles.add(ruolo)
        utente.setNickname(tag);
        
    }
}