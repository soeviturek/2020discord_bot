const request = require('request');
const { execute } = require("./setu");
const auth = "&api_key=53b73a705425aa8450ef861d68410530ba99e8e76fdb365948034e0f94fa0fb9&user_id=351477";
module.exports = {
    name: 'gel',
    description: "search from gelbooru",
    async execute(message, args) {
        if(args){
            const tags = "&tags=" + args.join("+");
        }
        else{
            const tags = "";
        }
        var options = {
            //limits is set to 50 by default
            url: "https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=50&json=1"+tags,
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
            const data;
            if(!responseBody){
            data = JSON.parse(responseBody);
        }else{
            throw new Error("[TAG_ERROR]Nobody here but us chickens!!");
        }
            //url links
            const links = [];
            //push links
            for(var i = 0; i < data.length; i++) {
                var obj = data[i];
                //checks for rating and score
                if((obj.rating == "e" || obj.rating == "q") && obj.score>10){
                    links.push(obj.file_url);
                }
                
            }
            //check if links is empty ..
            //randomly send 1 result
            message.channel.send(links[Math.floor(Math.random() * links.length)]);
        });
    }
}