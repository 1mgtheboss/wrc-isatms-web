$(document).ready(function() {
    $("#header").fadeIn();

    function moveToNextScreen() {
        
        $("#header").fadeOut(function() {
            location.href = "index-1.html";
        });
    }
    $("#header").click(function() {
        moveToNextScreen();
    });
    $(document).on('keypress', function(e) {
        if (e.which == 13) {
            moveToNextScreen();
        }
    });
});