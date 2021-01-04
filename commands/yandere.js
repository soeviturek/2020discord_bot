const request = require('request');

module.exports = {
    name:'yandere',
    description:'search image from yandere',
    execute(message,args){
        var options = {
            //limits is set to 100 by default
            url: "https://yande.re/post.json?api_version=2&limit=100&tags=" + args.join("+"),
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
            // typeof response.body !== 'undefined'
            
                var rawdata = JSON.parse(responseBody);
                var data = rawdata.posts;
                if(data.length != 0){
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