module.exports = {
    name: 'stop',
    description: "stop playing and leave the channel",
    execute(message, serverQueue) {
        if (!message.member.voice.channel) return message.channel.send("You need to join the voice chat first.");
        if (!serverQueue) {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
        }
    }
}