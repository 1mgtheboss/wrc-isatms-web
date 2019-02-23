$(document).ready(function() {
    var testdataa, testdatab;
    var meterdataabc, meterdatabbc, rstbc, wrcbc, wrcpricebc, o2filenamea = "",
        o2filenameb = "";

    var fileInputa = document.getElementById("test-data-file-a");
    var fileInputb = document.getElementById("test-data-file-b");
    readFilea = function() {

        Papa.parse(fileInputa.files[0], {
            complete: function(results) {
                testdataa = results.data;
                o2filenamea = fileInputa.files[0].name;
                $("#test-data-loaded").html("Files loaded: " + o2filenamea + " " + o2filenameb);
            }
        });
    };

    readFileb = function() {

        Papa.parse(fileInputb.files[0], {
            complete: function(results) {
                testdatab = results.data;
                o2filenameb = fileInputb.files[0].name;
                $("#test-data-loaded").html("Files loaded: " + o2filenamea + " " + o2filenameb);
            }
        });
    };



    fileInputa.addEventListener('change', readFilea);
    fileInputb.addEventListener('change', readFileb);



    function postprocess(vola, volb, volbclean) {

        var percentwaste = ((volbclean / vola) * 100).toFixed(1);
        var wrcsearned = (volbclean / 1000).toFixed(0);

        var resultcontent = "Vola: " + vola.toFixed(1) + "<br>Volb: " + volb.toFixed(1) + "<br>Volbclean: " + volbclean.toFixed(1) + "<br>% wastewater reuse: " + percentwaste + "<br>No. of wrc's earned: " + wrcsearned + "<br><br>";

        if (percentwaste < parseFloat($("#percent-reuse-target").val())) {
            resultcontent += "The organization has failed to meet the % reuse target. Difference: " + (percentwaste - parseFloat($("#percent-reuse-target").val())).toFixed(1) + "%";
        } else if (percentwaste > parseFloat($("#percent-reuse-target").val())) {
            resultcontent += "The organization has surpassed the % reuse target. Difference: " + (percentwaste - parseFloat($("#percent-reuse-target").val())).toFixed(1) + "%";

        } else {
            resultcontent += "The organization has met the % reuse target. Difference: " + (percentwaste - parseFloat($("#percent-reuse-target").val())).toFixed(1) + "%";

        }

        resultcontent += "<br><br>";

        if (wrcsearned < parseInt($("#wrc-target").val())) {
            resultcontent += "The organization has failed to meet the wrc target. Difference: " + (wrcsearned - parseInt($("#wrc-target").val()));
        } else if (wrcsearned > parseInt($("#wrc-target").val())) {
            resultcontent += "The organization has surpassed the wrc target. Difference: " + (wrcsearned - parseInt($("#wrc-target").val()));

        } else {
            resultcontent += "The organization has met the wrc target. Difference: " + (wrcsearned - parseInt($("#wrc-target").val()));

        }


        resultcontent += "<br><br>";



        rstbc = new Blockchain();
        rstbc.addBlock(new Block(Date.now().toString(), {
            "data": $("#wrc-target").val()
        }));

        wrcbc = new Blockchain();

        for (var i = 0; i < wrcsearned; i++) {
            wrcbc.addBlock(new Block(Date.now().toString(), {
                "data": "wrc-" + i
            }));

        }

        wrcpricebc = new Blockchain();
        wrcpricebc.addBlock(new Block(Date.now().toString(), {
            "data": $("#wrc-price").val()
        }));

        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("meterdataabc", JSON.stringify(meterdataabc));
            localStorage.setItem("meterdatabbc", JSON.stringify(meterdatabbc));
            localStorage.setItem("rstbc", JSON.stringify(rstbc));
            localStorage.setItem("wrcbc", JSON.stringify(wrcbc));
            localStorage.setItem("wrcpricebc", JSON.stringify(wrcpricebc));



            resultcontent += "Data saved in 5 blockchains (meter data a, meter data b, regulator set target, wrc, wrc price).";

        } else {

            resultcontent += "Data could not be saved due to no web storage support.";

        }

        $("#result").html(resultcontent).fadeIn();


    }
    $("#admin-back").click(function() {
        location.href = "index-1.html";
    });


    

    $("#process-data").click(function() {



        if ($("#opt-no").val() == "1") {
            testdataa = [];
            testdatab = [];
            if ($("#test-data-set-no").val() == "c") {

                testdataa.push(["id", "time", "vol"]);
                for (var i = 0; i < 1000; i++) {
                    testdataa.push(["CA", Date.now(), (Math.random() * (1956.0 - 0.0) + 0.0).toFixed(1)]);
                }


                testdatab.push(["id", "time", "vol", "ph", "solids", "hardness", "oil", "bod"]);
                for (var i = 0; i < 1000; i++) {
                    testdatab.push(["CB", Date.now(), (Math.random() * (195.6 - 0.0) + 0.0).toFixed(1), (Math.random() * (10.5 - 4.5) + 4.5).toFixed(1), (Math.random() * (100 - 0) + 0).toFixed(1), (Math.random() * (90 - 0) + 0).toFixed(1), (Math.random() * (10 - 0) + 0).toFixed(1), (Math.random() * (10 - 0) + 0).toFixed(1)]);
                }


                meterdataabc = new Blockchain();
                meterdatabbc = new Blockchain();

                for (var i = 0; i < testdataa.length; i++) {

                    meterdataabc.addBlock(new Block(Date.now().toString(), {
                        "data": testdataa[i]
                    }));
                }

                for (var i = 0; i < testdatab.length; i++) {

                    meterdatabbc.addBlock(new Block(Date.now().toString(), {
                        "data": testdatab[i]
                    }));
                }




                $("#test-data-loaded").html("Custom data set loaded ...");
                var n = Math.min(testdataa.length, testdatab.length) - 1;

                var vola = 0.0,
                    volb = 0.0,
                    volbclean = 0.0;

                for (var i = 2; i <= n; i++) {

                    vola += parseFloat(meterdataabc.chain[i].data.data[2]);
                    volb += parseFloat(meterdatabbc.chain[i].data.data[2]);

                    if ((parseFloat(meterdatabbc.chain[i].data.data[3]) > 6.5) && (parseFloat(meterdatabbc.chain[i].data.data[3]) < 8.5) && (parseFloat(meterdatabbc.chain[i].data.data[4]) < 50) && (parseFloat(meterdatabbc.chain[i].data.data[5]) < 45) && (parseFloat(meterdatabbc.chain[i].data.data[6]) < 5) && (parseFloat(meterdatabbc.chain[i].data.data[7]) < 5))
                        volbclean += parseFloat(meterdatabbc.chain[i].data.data[2]);

                }




                postprocess(vola, volb, volbclean);

            } else {
                var data = Papa.parse("test-data/IND" + $("#test-data-set-no").val() + "A.csv", {
                    download: true,
                    complete: function(results) {
                        testdataa = results.data;
                        var data = Papa.parse("test-data/IND" + $("#test-data-set-no").val() + "B.csv", {
                            download: true,
                            complete: function(results) {
                                testdatab = results.data;


                                meterdataabc = new Blockchain();
                                meterdatabbc = new Blockchain();

                                for (var i = 0; i < testdataa.length; i++) {

                                    meterdataabc.addBlock(new Block(Date.now().toString(), {
                                        "data": testdataa[i]
                                    }));
                                }

                                for (var i = 0; i < testdatab.length; i++) {

                                    meterdatabbc.addBlock(new Block(Date.now().toString(), {
                                        "data": testdatab[i]
                                    }));
                                }
                                $("#test-data-loaded").html("Test data set " + $("#test-data-set-no").val() + " loaded ...");
                                var n = Math.min(testdataa.length, testdatab.length) - 1;

                                var vola = 0.0,
                                    volb = 0.0,
                                    volbclean = 0.0;

                                for (var i = 2; i <= n; i++) {

                                    vola += parseFloat(meterdataabc.chain[i].data.data[2]);
                                    volb += parseFloat(meterdatabbc.chain[i].data.data[2]);

                                    if ((parseFloat(meterdatabbc.chain[i].data.data[3]) > 6.5) && (parseFloat(meterdatabbc.chain[i].data.data[3]) < 8.5) && (parseFloat(meterdatabbc.chain[i].data.data[4]) < 50) && (parseFloat(meterdatabbc.chain[i].data.data[5]) < 45) && (parseFloat(meterdatabbc.chain[i].data.data[6]) < 5) && (parseFloat(meterdatabbc.chain[i].data.data[7]) < 5))
                                        volbclean += parseFloat(meterdatabbc.chain[i].data.data[2]);

                                }


                                postprocess(vola, volb, volbclean);
                            }
                        });
                    }
                });

            }

        }

        if ($("#opt-no").val() == "2") {
            meterdataabc = new Blockchain();
            meterdatabbc = new Blockchain();

            for (var i = 0; i < testdataa.length; i++) {

                meterdataabc.addBlock(new Block(Date.now().toString(), {
                    "data": testdataa[i]
                }));
            }

            for (var i = 0; i < testdatab.length; i++) {

                meterdatabbc.addBlock(new Block(Date.now().toString(), {
                    "data": testdatab[i]
                }));
            }

            var n = Math.min(testdataa.length, testdatab.length) - 1;

            var vola = 0.0,
                volb = 0.0,
                volbclean = 0.0;

            for (var i = 2; i <= n; i++) {

                vola += parseFloat(meterdataabc.chain[i].data.data[2]);
                volb += parseFloat(meterdatabbc.chain[i].data.data[2]);

                if ((parseFloat(meterdatabbc.chain[i].data.data[3]) > 6.5) && (parseFloat(meterdatabbc.chain[i].data.data[3]) < 8.5) && (parseFloat(meterdatabbc.chain[i].data.data[4]) < 50) && (parseFloat(meterdatabbc.chain[i].data.data[5]) < 45) && (parseFloat(meterdatabbc.chain[i].data.data[6]) < 5) && (parseFloat(meterdatabbc.chain[i].data.data[7]) < 5))
                    volbclean += parseFloat(meterdatabbc.chain[i].data.data[2]);

            }


            postprocess(vola, volb, volbclean);
        }


    });

    $("#enter-meter-data-a").click(function() {
        $("#test-data-file-a").click();



    });
    $("#enter-meter-data-b").click(function() {
        $("#test-data-file-b").click();




    });

    $("#clear-blockchain-storage").click(function() {


        if (confirm("Are you sure you want to clear storage?")) {
            if (typeof(Storage) !== "undefined") {
                localStorage.removeItem("meterdataabc");
                localStorage.removeItem("meterdatabbc");
                localStorage.removeItem("rstbc");
                localStorage.removeItem("wrcbc");
                localStorage.removeItem("wrcpricebc");
            } else {

            }
        } else {

        }

    });

    

});