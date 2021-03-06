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
        $("#game-id").empty();
        if (snapshot.val().user.order[gameID] == undefined) {
            $("#image-buttons").html("I am sorry we could not verify your ID Number. Please contact +62 81 1952 6700");
        } else {
            startGame();

        }

    })

})

//images submitted
var iconOptions = ["./icon/1", "./icon/2", "./icon/3", "./icon/4", "./icon/5", "./icon/6", "./icon/7", "./icon/8", "./icon/9", "./icon/10"];

var numberIndexForIcons = [0, 3, 7, 1, 9, 2, 6, 8, 3, 5, 7, 0, 8, 4, 1, 6, 5, 9, 4, 2];

var listOfClick = numberIndexForIcons.map(index => iconOptions[index]);


var playerA = [];
var playerB = [];
for (var i = 0; i < listOfClick.length; i++) {
    if (i % 2 === 0) {
        playerA.push(listOfClick[i]);
    } else {
        playerB.push(listOfClick[i]);
    }
}

//render game
var a = 0;
var expectedButtonIndex = 0;
var failureTimer;
var i;


//how playerA starts
function startGame() {
    $("#image-buttons").empty();

    //print out image buttons
    for (var i = 0; i < iconOptions.length; i++) {
        var button = $("<button>");
        button.addClass("game-button");
        button.attr("data-let", (i));
        button.html("<img src =" + iconOptions[i] + ".png>");
        $("#image-buttons").append(button);
    }
    restartGame();

}

function restartGame() {
    // Just set the button index to the beginning and call the function for showing the image
    expectedButtonIndex = 0;
    showImage();
}


function showImage() {
    firebase.database().ref().once("value").then(function (snapshot) {
        AorB = snapshot.val().user.order[gameID].AorB;
        if (expectedButtonIndex % 2 === (AorB === "A" ? 0 : 1)) {
            // Show image
            $("#top-image").html("<img class = 'game-image' src=" + listOfClick[expectedButtonIndex] + ".png>");
        } else {
            // Show blank
            $("#top-image").html("<img class = 'game-image' src=./icon/blank.png>");
        }
    })
    // Start the timer for the game to fail in 3 seconds if the user doesn't do anything
    // If they do click a button, we have the onClick code below which will either
    //   a) Stop this timer if they made the correct choice
    //   b) End the game if they clicked the correct one
    failureTimer = setTimeout(failed, 8000);
}

function failed() {
    // TODO Show a message if you want to, and then restart the game
    alert("you are not doing it right!");
    restartGame();

}

$("#image-buttons").on("click", "button", function () {
    // Whether this is correct or not, we don't need the failure timer
    clearTimeout(failureTimer);

    var buttonThatWasClicked = $(this).data("let");
    if (buttonThatWasClicked == numberIndexForIcons[expectedButtonIndex]) {
        //Prepare for showing the next image/blank
        expectedButtonIndex++;

        // If we don't have anything to show, we are done
        if (expectedButtonIndex > listOfClick.length - 1) {
            // TODO Successfully completed the game
            $("#top-image").empty();
            $("#image-buttons").html("OPEN TAU");
            return;
        }

        // If we do have more images, show it now
        showImage();
    } else {
        // Clicked the wrong button, that's a failure similarly to 3secs expiring
        failed();
    }
})