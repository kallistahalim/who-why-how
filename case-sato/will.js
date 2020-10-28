$("#submit").on("click", function() {
    willId = $("#will-id-input").val();
    compareWillId = willId.toUpperCase();
    console.log(willId);
    console.log(compareWillId);
    $("#will-id").empty();
    if (compareWillId === "V8SI1EIN") {
        $("#will-png").html("<img id='will-letter' src=../assets/prize/AF-100.png>");
    } else {
        $("#will-png").html("you're not worthy to read my will");
    }
})


