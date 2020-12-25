/**
 * get tags
 */
const request = require('request');
module.exports = {
    exactTag(message, args) {
        //1. process args, search for tags
        for (var i = 0; i < rawargs.length; i++) {
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
            request(options, function (error, response1, responseBody1) {
                if (error) {
                    return;
                }
                //if not exist
                if (response1.body == "[]") {
                    return temp;
                }
            });
            return "[]";
        }

    },
    likeTags(tag) {
        const relevant = {
            url: "https://gelbooru.com//index.php?page=dapi&s=tag&q=index&json=1&name_pattern=%" + tag + "%",
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
                console.log(responseBody2);
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
                const message = "[TAG_ERROR] Did you mean " + result.join("\n") + " ?";
                return message;
            }
        });
    }

}