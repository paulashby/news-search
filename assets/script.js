$(document).ready(function(){

    var form = $(form);

    form.on("submit", handleSubmission);

    function handleSubmission(event) {

        event.preventDefault();
        
        var subject = $(this).searchTerm;
        var max = $(this).recordNumber;
        var from = $(this).startYear;
        var to = $(this).endYear;

        $.ajax({
            url: "https://gnews.io/api/v4/search?q=" + subject + "&max=" + max + "&from=" + from + "&to=" + to + "&token=ce3e8f3a40eede2769eff477cd8dace5",
            method: "GET"
        })
        .then(function(response){
            console.log(response);
        })

    }
});