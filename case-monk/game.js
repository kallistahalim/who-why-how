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

var listOfClick = [iconOptions[0], iconOptions[3], iconOptions[7], iconOptions[1], iconOptions[9], iconOptions[2], iconOptions[6], iconOptions[8], iconOptions[3], iconOptions[5], iconOptions[7], iconOptions[0], iconOptions[8], iconOptions[4], iconOptions[1], iconOptions[6], iconOptions[5], iconOptions[9], iconOptions[4], iconOptions[2]];

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


//how playerA starts
function startGameA() {
    $("#image-buttons").empty();

    //game is done
    if (a >= playerA.length - 1) {
        $("#top-image").empty();
        $("#image-buttons").html("Open __________");
        return;

        //game starts and continue
    } else {

        //print out image buttons
        for (var i = 0; i < iconOptions.length; i++) {
            var button = $("<button>");
            button.addClass("game-button");
            button.attr("data-let", (i));
            button.html("<img src =" + iconOptions[i] + ".png>");
            $("#image-buttons").append(button);
        }

        showImage();

    }


}

function showImage() {
    // Something like if it's an even index, show image, otherwise show blank?
    // This will make it easy to alternate images and blanks one after the other
    if (expectedButtonIndex % 2 === 0) {
        // Show image
        $("#top-image").html("<img class = 'game-image' src=" + playerA[expectedButtonIndex] + ".png>");
    } else {
        // Show blank
        $("#top-image").empty();
    }

    // Start the timer for the game to fail in 3 seconds if the user doesn't do anything
    // If they do click a button, we have the onClick code below which will either
    //   a) Stop this timer if they made the correct choice
    //   b) End the game if they clicked the correct one
    failureTimer = setTimeout(timeExpired, 3000);
}

// function restartGame() {
//     // Just set the button index to the beginning and call the function for showing the image
//     expectedButtonIndex = 0;
//     showImage();
// }


// function failed() {
//     // TODO Show a message if you want to, and then restart the game
//     alert("you are not doing it right!");
//     restartGame();
// }

// button.onClick() {
//     // Whether this is correct or not, we don't need the failure timer
//     clearTimeout(failureTimer);

//     var buttonThatWasClicked = ...;
//     if (buttonThatWasClicked == buttons[expectedButtonIndex]) {
//         //Prepare for showing the next image/blank
//         expectedButtonIndex++;

//         // If we don't have anything to show, we are done
//         if (expectedButtonIndex > totalButtons) {
//             // TODO Successfully completed the game
//             return;
//         }

//         // If we do have more images, show it now
//         showImage();
//     } else {
//         // Clicked the wrong button, that's a failure similarly to 3secs expiring
//         failed();
//     }
// }

// restartGame();