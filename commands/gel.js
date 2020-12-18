const request = require('request');
const { execute } = require("./setu");
const auth = "&api_key=53b73a705425aa8450ef861d68410530ba99e8e76fdb365948034e0f94fa0fb9&user_id=351477";
module.exports = {
    name: 'gel',
    description: "search from gelbooru",
    async execute(message, args) {
        var options = {
            url: "https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=50&json=1&tags=" + args.join(" "),
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome",
            }
        };
        request(options, function (error, response, responseBody) {
            if (error) {
                return;
            }
            console.log("Now searching: " + options.url);
            const data = JSON.parse(responseBody);
            console.log(data);
            const links = [];
            // console.log(data[0].file_url);
            for(var i = 0; i < data.length; i++) {
                var obj = data[i];
                links.push(obj.file_url);
            }
            console.log(links);
             console.log(links);
            //send result
            message.channel.send(links[Math.floor(Math.random() * links.length)]);
        });
    }
}