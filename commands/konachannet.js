const request = require('request');

module.exports = {
    name:'gel',
    description:'search image from gelbooru',
    execute(message,args){
        var options = {
            //limits is set to 100 by default
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
            // console.log((response.body).length);
            if((response.body).length != 0){  
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
                //3. check if links is empty ..randomly send 1 result
                if(links.length>0){
                    message.channel.send(links[Math.floor(Math.random() * links.length)]);
                }
            }else{
                message.channel.send("Nobody here but us chickens!");
            }
            });

        
    }
}