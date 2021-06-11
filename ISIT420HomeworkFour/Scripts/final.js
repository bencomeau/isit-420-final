document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("getRace").addEventListener("click", function () {

        //getRaceData1();
       // getRaceData2();
       // getRaceData3();
    });

});

function getUnemployment() {

    $.getJSON("api/order/query1")
        .done(function (data) {
            //$.each(data, function (key, item) {
            //    // Add a list item for the product.
            //    $('<li>', { text: formatItem1(item) }).appendTo($('#displayRace1'));
            //});
            //console.log(data);
            let table = document.getElementById("table1");
            generateTable(table, data);
        });
}