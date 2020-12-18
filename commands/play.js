const ytdl = require('ytdl-core');
const { YTSearcher } = require('ytsearcher'); //search the song

//create a new searcher
const searcher = new YTSearcher({
    key: "AIzaSyDFb5lNwUauGx1j6Zv_OAiBI_wIHpblHx8",
    revealed: true
});

module.exports = {
    name: 'play',
    description: "add music to queue and play",
    //might have an error here. try define an async function outside?? try to figure out how to pass queue??
    async execute(message, serverQueue, queue, args){
        function play(guild, song) {
            const serverQueue = queue.get(guild.id); //get the server
            if (!song) {
                serverQueue.vChannel.leave();
                queue.delete(guild.id);
                return;
            }
            serverQueue.txtChannel.send(`Now playing ${serverQueue.songs[0].url}`);
            // ,{ filter: "audioonly" }
            const dispatcher = serverQueue.connection.play(ytdl(song.url))
                .on('finish', () => {
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })
        }
        let vc = message.member.voice.channel;

        if (!args[0]) {
            message.channel.send("You need to provide a link!");
            return;
        }
        //check if the user is in a voice channel
        if (!vc) {
            return message.channel.send("You must be in a voice channel!");
        }

        //search song
        let result = await searcher.search(args.join(" "), { type: "video" });
        const songInfo = await ytdl.getInfo(result.first.url);

        let song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        };

        //if there is no queue
        if (!serverQueue) {
            const queueConstructor = {
                txtChannel: message.channel,
                vChannel: vc,
                connection: null,
                songs: [],
                volume: 10,
                playing: true
            };
            queue.set(message.guild.id, queueConstructor);

            //push the link to the queue
            queueConstructor.songs.push(song);
            try {
                let connection = await message.member.voice.channel.join();
                queueConstructor.connection = connection;//set the connection
                play(message.guild, queueConstructor.songs[0]);
            } catch (err) {
                console.error;
                queue.delete(message.guild.id);
                return message.channel.send(`Unable to join the voice chat ${err}`);
            }
        }
        else {
            queueConstructor = queue.get(message.guild.id);
            queueConstructor.songs.push(song);
            return message.channel.send(`The song has been added ${song.url}`);
        }
    }

}