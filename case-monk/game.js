var iconOptions = ["./icon/1","./icon/2","./icon/3","./icon/4", "./icon/5", "./icon/6","./icon/7","./icon/8","./icon/9", "./icon/10"];


for (var i = 0; i < iconOptions.length; i++) {
    console.log(iconOptions[i]);
    var button = $("<button>");
    button.addClass("game-button");
    button.attr("data-let", (i));
    button.html("<img src =" + iconOptions[i] + ".png>");
    console.log("<img src =" + iconOptions[i] + ".png>")
    $("#image-buttons").append(button);
}