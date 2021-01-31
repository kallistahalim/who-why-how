// set up firebase
var firebaseConfig = {
    apiKey: "AIzaSyDCccF8HV9s7HAdwPw2goh35UrhUmqRY2k",
    authDomain: "who-why-how.firebaseapp.com",
    databaseURL: "https://who-why-how.firebaseio.com",
    projectId: "who-why-how",
    storageBucket: "who-why-how.appspot.com",
    messagingSenderId: "921964147784",
    appId: "1:921964147784:web:563f5daa1708160bb2947d",
    measurementId: "G-YSPPGB4DMW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var AorB;

firebase.database().ref().once("value").then(function (snapshot) {

    $("#submit").on("click", function () {
        gameID = $("#game-id-input").val();
        console.log(gameID);
        console.log(snapshot.val().user.order[gameID]);
        $("#game-id").empty();
        if (snapshot.val().user.order[gameID] == undefined) {
            $("image-buttons").html("I am sorry we could not verify your ID Number. Please contact +62 81 1952 6700");
        } else {
            AorB = snapshot.val().user.order[gameID].AorB;
            if (AorB === "A") {
                startGameA();
            } else {
                startGameB();
            }

        }

    })

})

//images submitted
var iconOptions = ["./icon/1", "./icon/2", "./icon/3", "./icon/4", "./icon/5", "./icon/6", "./icon/7", "./icon/8", "./icon/9", "./icon/10"];

//images shown for player A
var playerA = [iconOptions[3], iconOptions[1], iconOptions[2], iconOptions[8], iconOptions[5], iconOptions[0], iconOptions[4], iconOptions[6], iconOptions[9], iconOptions[2]];

//images shown for player B
var playerB = [iconOptions[0], iconOptions[7], iconOptions[9], iconOptions[6], iconOptions[3], iconOptions[7], iconOptions[8], iconOptions[1], iconOptions[5], iconOptions[4]];



//render game
var a = 0;

//how playerA starts
function startGameA() {
    console.log(a);

    //print out image buttons
    for (var i = 0; i < iconOptions.length; i++) {
        var button = $("<button>");
        button.addClass("game-button");
        button.attr("data-let", (i));
        button.html("<img src =" + iconOptions[i] + ".png>");
        $("#image-buttons").append(button);
    }

    //game is done
    if (a >= playerA.length) {
        $("#top-image").empty();
        $("#image-buttons").html("Open __________");
        return;

        //game starts and continue
    } else {

        //emptyDiv
        function emptyDiv() {
            $("#top-image").empty();
        }

        //player A
        function playerAImage() {
            for (var j = 0; j < playerA.length; j++) {
                $("#top-image").html("<img class = 'game-image' src=" + playerA[j] + ".png>");
            }
        }

        $("#top-image").ready(function () {
            setTimeout(playerAImage, 3000);
            if (setTimeout(playerAImage, 3000)) {
                setTimeout(emptyDiv, 3000);
            }

        })
        
    }


}