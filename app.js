var express = require("express");
var request = require("request");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();
var cheerio = require("cheerio");
var port = 8080;


// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

var url = "https://blog.erratasec.com/";
request(url, function(err, resp, body) {
    var $ = cheerio.load(body);
    var articleErratasecArray = [];

    $(".date-outer").each(function(i, element) {

    	var title = $(element).find(".entry-title a");
    	titleText = title.text();
    	titleNeat = titleText.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var datePublish = $(element).find(".date-header span");
        datePublishText = datePublish.text().trim();

        var author = $(element).find(".post-author a");
        authorText = author.text();
        authorNeat = authorText.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

       var body = $(element).find(".post-body");
        bodyText = body.text();
        bodyNeat = bodyText.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var articleErratasec = {
        	title : titleNeat,
            datePublish: datePublishText,
            author: authorNeat,
            body: bodyNeat.substr(0, 250)
        };
        articleErratasecArray.push(articleErratasec);
    });
    console.log(articleErratasecArray);
});

app.listen(port, function() {
    console.log("app listening on port " + port)
});