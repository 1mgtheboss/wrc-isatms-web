$(document).ready(function() {
    var wrcbc, noofwrcsearned, rstbc, rst, tradedata = "",
        wrcpricebc, price;
    try {
        if (typeof(Storage) !== "undefined") {
            wrcbc = JSON.parse(localStorage.getItem("wrcbc"));
            rstbc = JSON.parse(localStorage.getItem("rstbc"));
            wrcpricebc = JSON.parse(localStorage.getItem("wrcpricebc"));


            noofwrcsearned = wrcbc.chain.length - 1;
            rst = parseInt(rstbc.chain[1].data.data);




            price = parseInt(wrcpricebc.chain[1].data.data);
            if (noofwrcsearned < rst) {

                tradedata += "The organization needs to purchase " + (rst - noofwrcsearned) + " wrc's. The amount required is $" + ((rst - noofwrcsearned) * price).toFixed(1) + ".";
            } else if (noofwrcsearned > rst) {

                tradedata += "The organization can sell " + (noofwrcsearned - rst) + " wrc's. The amount that will be received is $" + ((noofwrcsearned - rst) * price).toFixed(1) + ".";
            } else {
                tradedata += "The organization does not need to purchase or sell wrc's."

            }


        } else {

        }
    } catch (err) {

    }

    $("#trading-back").click(function() {
        location.href = "index-1.html";
    });

    $("#get-trade-data").click(function() {
        $("#result").html(tradedata).fadeIn();
    });

    $("#start-trade").click(function() {
        window.open(
            'https://corp.onlinesbi.com/corporate/sbi/login.html',
            '_blank'
        );

    });




});