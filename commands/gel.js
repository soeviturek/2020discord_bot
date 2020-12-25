const request = require('request');
var result = []; 

class Gelbooru{

    execute(message,args){
        var options = {
            //limits is set to 50 by default
            url: "https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=100&json=1&tags=" + args.join("+"),
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
                var data = JSON.parse(responseBody);
                //url links
                const links = [];
                //push links
                for (var i = 0; i < data.length; i++) {
                      obj = data[i];
                    //checks for rating and score
                    if (obj.rating == "e" || obj.rating == "q") {
                        links.push(obj.file_url);
                    }

                }
                // console.log(links);
                //3. check if links is empty ..randomly send 1 result
                if(links.length>0){
                    message.channel.send(links[Math.floor(Math.random() * links.length)]);
                }
                else{
                    throw new Error("No images");
                }
            });

        
    }
}





module.exports = Gelbooru;