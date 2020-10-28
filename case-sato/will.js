$("#submit").on("click", function() {
    willId = $("#will-id-input").val();
    compareWillId = willId.toUpperCase();
    console.log(willId);
    console.log(compareWillId);
    $("#will-id").empty();
    if (compareWillId === "V8SI1EIN") {
        $("#will-png1").html("<img id='will-letter' src=../assets/sato-last-will-signed/1.png>");
        $("#will-png2").html("<img id='will-letter' src=../assets/sato-last-will-signed/2.png>");
        $("#will-png3").html("<img id='will-letter' src=../assets/sato-last-will-signed/3.png>");
        $("#will-png4").html("<img id='will-letter' src=../assets/sato-last-will-signed/4.png>");
        $("#will-png5").html("<img id='will-letter' src=../assets/sato-last-will-signed/5.png>");
    } else {
        $("#will-png").html("you're not worthy to read my will");
    }
})


