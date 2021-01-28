var iconOptions = "./icon/";
for (var i = 0; i < iconOptions.length; i++) {
    var button = $("<button>");
    button.addClass("game-button");
    button.attr("data-let", (i+1));
    button.html("<img src =" + iconOptions + (i+1) + ".png>");
    $("#image-buttons").append(button);
}