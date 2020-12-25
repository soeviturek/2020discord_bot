const request = require('request');
const { execute } = require("./setu");
const auth = "&api_key=53b73a705425aa8450ef861d68410530ba99e8e76fdb365948034e0f94fa0fb9&user_id=351477";
var result = []; 
module.exports = {
    name: 'gel',
    description: "search from gelbooru",
    /**
     * @param {Array} args
     */
    async execute(message, args) {
        /**
         * @param {Array} rawargs 
         */
        async function searchTag(rawargs,result){
            for(var i = 0; i < rawargs.length; i++){
                const temp = rawargs[i];
                const options = {
                    url: "https://gelbooru.com//index.php?page=dapi&s=tag&q=index&json=1&name=" + temp,
                    method: "GET",
                    headers: {
                        "Accept": "text/html",
                        "User-Agent": "Chrome", 
                    }
                };
                //search exact tag
                console.log("1.search exact tag:" + options.url);
                request(options, function (error, response1, responseBody1) {
                    if (error) {
                        return;
                    }
                    //if not exist
                    if (response1.body=="[]"){
                        const relevant = {
                            url: "https://gelbooru.com//index.php?page=dapi&s=tag&q=index&json=1&name_pattern=%" + temp +"%",
                            method: "GET",
                            headers: {
                                "Accept": "text/html",
                                "User-Agent": "Chrome",
                            }
                        };
                        //give 5 most relevant tags
                        console.log("2.search relevant tag:" + relevant.url);
                        request(relevant, function (error, response2, responseBody2) {
                            if (error) {
                                return;
                            }
                            //if exists
                            if(response2.body!="[]"){
                                console.log(responseBody2);
                                const relevantTags = JSON.parse(responseBody2);
                                var count = 0;
                                if(relevantTags.length>5){
                                    count = 5;
                                }else{
                                    count = relevantTags.length;
                                }
                                for(var i = 0; i<count;i++){
                                    const obj = relevantTags[i];
                                    result.push(obj.tag);
                                }
                                const message = "[TAG_ERROR] Did you mean " + result.join("\n") + " ?";
                                throw new Error(message);
                            }else{
                                throw new Error("[TAG_ERROR] " + temp + " is an incorrect tag.");
                            }
                        });
                    }else{
                        console.log(responseBody1);
                        result.push(temp);
                    }
                });
            }
            var finals = "&tags="+result.join("+");
            // result.splice(0,result.length);
            return finals;

        }
        
        var tags = await searchTag(args,result);
        
        // if (tags) {
        // var tags = "&tags=" + result.join("+");
            console.log("tags: "+tags);
        // }
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
            
            // console.log(data);
            if (responseBody!="[]") {
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
                //check if links is empty ..
                //randomly send 1 result
                if(links.length>0){
                    message.channel.send(links[Math.floor(Math.random() * links.length)]);
                }
                else{
                    return "[]";
                }
            } else {
                throw new Error("[TAG_ERROR]Nobody here but us chickens!!");
            }
        });
    }
}
