module.exports = {
    name: "ready",
    async execute(message, client) {
        console.clear()
        console.log("online")
        client.user.setActivity("StoraxMC", { type: "PLAYING" })
    }
}