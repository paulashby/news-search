$(document).ready(function(){

    var form = $("form");
    var resultsElmt = $(".results");

    form.on("submit", handleSubmission);

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

            console.log(response);
            
            if (!response.totalArticles || !response.articles.length) {
                resultsElmt.html("<h2>The query returned no results.</h2>");
            } else {
                var articles = response.articles;
                var numArticles = articles.length;
                var articleElmt = $("<div>").addClass("article");

                for (var i = 0; i < numArticles; i++) {
                    
                    var descriptionText = articles[i].description.trim();
                    var image = $("<img>").addClass("article-image").attr({"src": articles[i].image.trim(), "alt": descriptionText}).css("width", "500px");
                    var titleEl = $("<h2>").addClass("article-title").text(articles[i].title.trim());
                    var titleLink = $("<a>").addClass("article-title-link").attr("href", articles[i].url.trim()).html(titleEl);
                    var sourceLink = $("<a>").addClass("article-source-link").attr("href", articles[i].source.url.trim()).text(articles[i].source.name.trim());
                    var publishedDate = $("<span>").addClass("article-date").text(", " + moment(articles[i].publishedAt.trim()).format("MMMM Do YYYY"));
                    var source = $("<p>").addClass("article-source").append(sourceLink, publishedDate);
                    var description = $("<p>").addClass("article-description").text(descriptionText);

                    articleElmt.append(image, titleLink, source, description);
                    resultsElmt.append(articleElmt);
                }
            }
            /*
            [
                totalArticles: 117445,
                articles: [
                    {
                        content: "String",
                        description: "String",
                        image: "String",
                        publishedAt: "2022-12-16T08:01:25Z",
                        source: {
                            name: "String",
                            url: "String"
                        },
                        title: "String",
                        url: "String"
                    }
                ]
            ]
            */
        })

    }
});