const discord = require("discord.js");

module.exports = {
    name: "accettato",
    Admim: true,
    syntax: "!accettato (utente) (mentore)",
    execute(message, client) {
        var utente = message.mentions.members?.first()
        if (message.author.bot) return;
        const utente2 = message.mentions.members?.last()

        const embed = new discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Canidatura __ACCETTATA__")
            .setThumbnail(client.user.avatarURL())
            .setDescription(`Ciao ${utente}, la tua candidatura è stata accettata.\nRecati su [Discord]() e apri un ticket per fissare il provino orale.\n\n**Mentore assegnato:** ${utente2}`)
            .setFooter({
                image: client.user.avatarURL(), 
                text: "StoraxMC Management"
            })

        const embed2 = new discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Sei stato scelto come mentore!")
            .setDescription(`Sei stato scelto come mentore di ${utente}. L'incarico consiste nel aiutarlo e orientarlo nel server in caso venisse accettato nel provino orale.\n**ATTENZIONE**\nSe richede aiuto ma non è stato accettato, l'aiuto dovrà essere esibito.`)
            .setFooter({
                image: client.user.avatarURL(), 
                text: "StoraxMC Management"
            })

        if (!utente) {
            return message.reply({
                content: "Utente non esistente!", 
                ephemeral: true
            })
        }
        if (!utente2) {
            return message.reply("Inserisci un mentore!")
        }

        message.delete()
        utente.send({
            embeds: [embed]
        })

        utente2.send({
            embeds: [embed2]
        })
        

    }
}