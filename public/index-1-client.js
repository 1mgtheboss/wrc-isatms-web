$(document).ready(function() {
    $("#container-1").fadeIn(function() {
        $("#index-1-back").fadeIn();

    });


    $(".tile").click(function() {

        var thiselement = $(this);

        location.href = $(this).text().toLowerCase() + ".html";
    });
    $("#index-1-back").click(function() {



        location.href = "index.html";
    });
});