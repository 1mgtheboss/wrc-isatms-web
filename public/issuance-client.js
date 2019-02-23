$(document).ready(function() {
    var wrcbc, n;
    try {
        if (typeof(Storage) !== "undefined") {
            wrcbc = JSON.parse(localStorage.getItem("wrcbc"));

            n = wrcbc.chain.length - 1;

            if (n > 0) {
                $("#wrc-no").attr("placeholder", "Please enter wrc no (1-" + n + ") ...");
            } else {

                $("#wrc-no").attr("placeholder", "Please enter wrc no (0) ...");
            }

        } else {

        }
    } catch (err) {

    }

    $("#issuance-back").click(function() {
        location.href = "index-1.html";
    });

    $("#download-wrc").click(function() {
        var wrcno = parseInt($("#wrc-no").val());


        if (n == 0) {
            $("#result").html("The organization has not earned any wrcs.").fadeIn();
        } else if (wrcno > n || wrcno < 1) {
            $("#result").html("The wrc no. is out of range.").fadeIn();

        } else if (isNaN(wrcno)) {
            $("#result").html("The wrc no. is required.").fadeIn();

        } else {

            var doc = new jsPDF();

            doc.text("WRC-" + $("#wrc-no").val() + "\n" + "Issued on: " + (new Date()).toString(), 10, 15);
            doc.save("wrc-" + $("#wrc-no").val() + ".pdf");
            $("#result").html("The wrc " + $("#wrc-no").val() + " will get downloaded shortly.").fadeIn();

        }


    });




});