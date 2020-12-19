const request = require('request');
const { execute } = require("./setu");
const auth = "&api_key=53b73a705425aa8450ef861d68410530ba99e8e76fdb365948034e0f94fa0fb9&user_id=351477";
module.exports = {
    name: 'gel',
    description: "search from gelbooru",
    async execute(message, args) {
        var tags = "";
        if (args) {
            tags = "&tags=" + args.join("+");
        }
        var options = {
            //limits is set to 50 by default
            url: "https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=100&json=1" + tags,
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
            //??
            var data = JSON.parse(responseBody);
            // console.log(data);
            if (data) {
                //url links
                const links = [];
                //push links
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    //checks for rating and score
                    if (obj.rating == "e" || obj.rating == "q") {
                        links.push(obj.file_url);
                    }

                }
                console.log(links);
                //check if links is empty ..
                //randomly send 1 result
                if(links.length>0){
                    message.channel.send(links[Math.floor(Math.random() * links.length)]);
                }
                else{
                    throw new Error("No images");
                }
            } else {
                throw new Error("[TAG_ERROR]Nobody here but us chickens!!");
            }
        });
    }
}