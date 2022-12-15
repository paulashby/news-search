$(document).ready(function(){

    var form = $(form);

    form.on("submit", handleSubmission);

    function handleSubmission(event) {

        event.preventDefault();

        var subject = "World Cup";
        var max = 5;
        var from = 1998;
        var to = 2022;

        $.ajax({
            url: "https://gnews.io/api/v4/search?q=" + subject + "&max=" + max + "&from=" + from + "&to=" + to + "&token=ce3e8f3a40eede2769eff477cd8dace5",
            method: "GET"
        })
        .then(function(response){
            console.log(response);
        })

    }
});