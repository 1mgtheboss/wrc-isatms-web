$(document).ready(function() {

    var meterdataabc, meterdatabbc, rstbc, wrcbc, wrcpricebc;


    if (typeof(Storage) !== "undefined") {
        meterdataabc = localStorage.getItem("meterdataabc");
        meterdatabbc = localStorage.getItem("meterdatabbc");
        rstbc = localStorage.getItem("rstbc");
        wrcbc = localStorage.getItem("wrcbc");
        wrcpricebc = localStorage.getItem("wrcpricebc");

    } else {



    }
    $("#storage-back").click(function() {
        location.href = "index-1.html";
    });


    $("#view-meterdataabc").click(function() {

        if (meterdataabc != undefined) {
            var resultcontent = meterdataabc;


        } else {

            var resultcontent = "Data could not be displayed due to no web storage support.";
        }
        $("#result").html(resultcontent).fadeIn();


    });
    $("#view-meterdatabbc").click(function() {

        if (meterdatabbc != undefined) {
            var resultcontent = meterdatabbc;


        } else {

            var resultcontent = "Data could not be displayed due to no web storage support.";
        }
        $("#result").html(resultcontent).fadeIn();


    });

    $("#view-rstbc").click(function() {

        if (rstbc != undefined) {
            var resultcontent = rstbc;


        } else {

            var resultcontent = "Data could not be displayed due to no web storage support.";
        }
        $("#result").html(resultcontent).fadeIn();


    });

    $("#view-wrcbc").click(function() {

        if (wrcbc != undefined) {
            var resultcontent = wrcbc;


        } else {

            var resultcontent = "Data could not be displayed due to no web storage support.";
        }
        $("#result").html(resultcontent).fadeIn();


    });

    $("#view-wrcpricebc").click(function() {

        if (wrcpricebc != undefined) {
            var resultcontent = wrcpricebc;


        } else {

            var resultcontent = "Data could not be displayed due to no web storage support.";
        }
        $("#result").html(resultcontent).fadeIn();


    });

});