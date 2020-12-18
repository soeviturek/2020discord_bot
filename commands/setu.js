const cheerio = require('cheerio');
const request = require('request');

module.exports = {
    name: 'setu',
    description: "send pics based on user input tags",
    async execute(message, args){
        var tags = args.join(" ");
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + tags,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        request(options, function (error, response, responseBody) {
            if (error) {
                return;
            }
            
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            
            //get every single image in the response
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

            console.log(links);
            console.log("Now searching:" + options.url);
            if (!urls.length) {
                return;
            }
            //send result
            message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
        });



    }
}