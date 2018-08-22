var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var logger = require("morgan");
var app = express();
var port = 8080;
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");


// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-scraper";
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);


app.get("/scrape", function(req, res) {
    var url1 = "https://blog.erratasec.com/";
    var url2 = "https://krebsonsecurity.com/";


    axios.get(url1).then(function(response) {


        var $ = cheerio.load(response.data);
        $(".date-outer").each(function(i, element) {

            var articleEArray = [];

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
                url: url1,
                title: titleNeat,
                datePublish: datePublishText,
                author: authorNeat,
                body: bodyNeat.substr(0, 550)
            };

            articleEArray.push(articleErratasec);

            db.Article.create(articleEArray)
                .then(function(dbArticle) {
                    // If saved successfully, send the the new User document to the client
                    res.json(dbArticle);
                })
                .catch(function(err) {
                    // If an error occurs, send the error to the client
                    res.json(err);
                });
        });
        //res.send("Scrape Complete");


    });



    // res.send("Scrape 1 Complete");
    // res.send(articleErratasecArray[0].title);
    //});
    axios.get(url2).then(function(response) {
        var articleKArray = [];
        var $ = cheerio.load(response.data);
        $(".post-smallerfont").each(function(i, element) {
            var authorNeat = "Kirsto Clerix"
            var title = $(element).find(".post-title a");
            titleText = title.text();
            titleNeat = titleText.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            var datePublish = $(element).find("small");
            datePublishText = datePublish.text().trim();

            var body = $(element).find(".entry");
            bodyText = body.text();
            bodyNeat = bodyText.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            var articleKirsto = {
                url: url2,
                title: titleNeat,
                datePublish: datePublishText,
                author: authorNeat,
                body: bodyNeat.substr(0, 550)
            };


            articleKArray.push(articleKirsto);
            console.log(articleKirsto);

            db.Article.create(articleKArray);

            res.send("Scrape 2 Complete");
        });

    });


    // res.send(articleErratasecArray[0].title);
});



app.get("/delete", function(req, res) {
    db.Article.remove({})
        .then(function(dbArticle) {
            // If saved successfully, send the the new User document to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurs, send the error to the client
            res.json(err);
        });
});

app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            // If saved successfully, send the the new User document to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurs, send the error to the client
            res.json(err);
        });
});


app.listen(port, function() {
    console.log("app listening on port " + port)
});