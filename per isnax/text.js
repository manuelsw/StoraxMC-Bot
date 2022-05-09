const commandsFiless = fs.readdirSync("./vip").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
    const command = require(`./vip/${file}`);
    client.commands.set(command.name, command);
}

const commandsFolders = fs.readdirSync("./vip");
for (const folder of commandsFolders) {
    const commandsFiless = fs.readdirSync(`./vip/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./vip/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}