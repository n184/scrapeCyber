//var articleErratasecArray = require("../../scripts/scrape.js");
var url1 = "https://blog.erratasec.com/";
//console.log(articleErratasecArray);
var count = 0;
var showArticle;

var now = moment().format("LLLL");
$(".lead").html(now);
//document.getElementByClassName("lead").html(now);
$.getJSON("/articles", function(data) {
    console.log(data.length);

    function displayArticle() {
        // Display the apropos information on the page
        $("#card-title-1").html(data[count].title);
        $("#card-text-1").html(data[count].body + "<hr> published on: " + data[count].datePublish + " by: " + data[count].author
        + "<br> For more, go to the original website:");
        //$("#card-text-1").append("<hr>");
       // $("#card-text-1").append("For more, go to the original website:");
       $("#btn-primary-1").html(data[count].url);

    }

    function nextArticle() {
    	count++;
    	$("#card-title-1").html(data[0].title);
    	setTimeout(displayArticle, 1000);
    	if (count === data.length) {
    		count = 0;
    	}
    }

    function startSlideShow() {
    	showArticle = setInterval(nextArticle, 3000)
    }

    startSlideShow();
});

//


console.log("hi world");
//});