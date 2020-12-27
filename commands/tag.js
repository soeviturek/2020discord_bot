/**
 * get tags
 */
const request = require('request');
module.exports = {
    name: 'tag',
    description: "get tags",
    async exactTag(message,args) {
        //1. process args, search for tags
        var result = "NULL";
        for (var i = 0; i < args.length; i++) {
            const temp = args[i];
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
            
            let promise = new Promise((resolve,reject)=>{
                request(options, function (error, response1, responseBody1) {
                    if (error) {
                        return "ERROR";
                    }
                    //if not exist
                    if (response1.body == "[]") {
                        result = "[]";
                        return result;
                    }
                },()=>resolve("done"));
            });
            let result = await promise;
        }
        console.log(result);
        return result;
    },
    likeTags(message,tag) {
        var result = [];
        const relevant = {
            url: "https://gelbooru.com//index.php?page=dapi&s=tag&q=index&json=1&name_pattern=%" + tag.join("+") + "%",
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
            if (response2.body != "[]") {
                // console.log(responseBody2);
                const relevantTags = JSON.parse(responseBody2);
                var count = 0;
                if (relevantTags.length > 5) {
                    count = 5;
                } else {
                    count = relevantTags.length;
                }
                for (var i = 0; i < count; i++) {
                    const obj = relevantTags[i];
                    result.push(obj.tag);
                }
                const info = "[TAG_SEARCH] Did you mean:\n" + result.join("\n") + " ?";
                message.channel.send(info);
            }else{
                message.channel.send("[TAG_ERROR] Please try other tags or enter a smaller segment of the tag.");
            }
        });
    }

}