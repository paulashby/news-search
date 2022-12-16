$(document).ready(function(){

    var resultsElmt = $(".results");

    $("form").on("submit", handleSubmission);
    $("#reset").on("click", clearResults);

    function handleSubmission(event) {

        event.preventDefault();

        // Validate input
        
        var subject = $("#searchTerm").val();
        var max = $("#recordNumber").val();
        var from = $("#startYear").val() + "-01-01T00:00:00Z";
        var to = $("#endYear").val() + "-12-31T11:59:59Z";
        var queryURL = "https://gnews.io/api/v4/search?q=" + subject + "&max=" + max + "&from=" + from + "&to=" + to + "&lang=en&token=ce3e8f3a40eede2769eff477cd8dace5";

        console.log(moment("1982-12-31T11:59:59Z").format("MMMM Do YYYY"));
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response){

            clearResults();
            
            if (!response.totalArticles || !response.articles.length) {
                resultsElmt.html("<h2>The query returned no results.</h2>");
            } else {
                var articles = response.articles;
                var numArticles = articles.length;

                for (var i = 0; i < numArticles; i++) {
                    
                    var articleElmt = $("<div>").addClass("article").addClass("mt-5");
                    var articleLink = articles[i].url.trim();
                    var descriptionText = articles[i].description.trim();
                    var image = $("<img>").addClass("article-image mb-4").attr({"src": articles[i].image.trim(), "alt": descriptionText}).css("width", "500px");
                    var titleEl = $("<h2>").addClass("article-title").text(articles[i].title.trim());
                    var imageLink = $("<a>").addClass("article-image-link").attr("href", articleLink).append(image);
                    var sourceLink = $("<a>").addClass("article-source-link").attr("href", articleLink).text(articles[i].source.name.trim());
                    var publishedDate = $("<span>").addClass("article-date").text(", " + moment(articles[i].publishedAt.trim()).format("MMMM Do YYYY"));
                    var source = $("<p>").addClass("article-source").append(sourceLink, publishedDate);
                    var description = $("<p>").addClass("article-description").text(descriptionText);

                    articleElmt.append(imageLink, titleEl, source, description);
                    resultsElmt.append(articleElmt);
                }
            }
        });

    }

    function clearResults() {
        resultsElmt.empty();
    }
});