module.exports = {
    name: 'skip',
    description: "skip current song",
    execute(message, serverQueue) {
        if (!message.member.voice.channel) return message.channel.send("You need to join the voice chat first.");
        if (!serverQueue) return message.channel.send("There is nothing to skip");
        serverQueue.connection.dispatcher.end();
    }
}