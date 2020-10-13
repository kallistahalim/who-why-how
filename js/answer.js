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

var firebaseNumber;
var a;
var i = 0;

firebase.database().ref().on("value", function (snapshot) {
    for (var b = 0; b < snapshot.val().user.order.length; b++) {
        console.log(snapshot.val().user.order[b].ID);
        firebaseNumber = snapshot.val().user.order[b].ID;
        a = snapshot.val().user.order[b].case;
        console.log(a);
    }
})


//submit button for ID submission
$("#submit").on("click", function () {
    var agentNumber = $("#agent-number").val();
    $("#id-number").empty();

    if (agentNumber == firebaseNumber) {
        questionRendered();
    } else {
        $("#question").html("I am sorry we could not verify your ID Number. Please contact +62 81 1952 6700");
    }
})

function randomPrize() {
    firebase.database().ref().on("value", function (snapshot) {
        prize = snapshot.val().prize;
        var decision = prize[Math.floor(Math.random() * prize.length)].item;
        var decisionImage = prize[Math.floor(Math.random() * prize.length)].image;
        console.log(decisionImage);
        $("#options").html("You have won " + decision);
        $("#prize").html("<img id='decision-image' src=./" + decisionImage + ">");
    })
}

//render questions
function questionRendered() {
    firebase.database().ref().on("value", function (snapshot) {
        console.log(i)
        console.log(snapshot.val().content.cases[a].length)

        if (i >= snapshot.val().content.cases[a].length) {
            $("#options").empty();
            $("#question").html("Congratulation! You won!!");
            randomPrize();
            return;
        } else {
            //print question
            questionPrinted = snapshot.val().content.cases[a][i].question;
            $("#question").html(questionPrinted);
        }

        //print options
        $("#options").empty();
        for (var j = 0; j < snapshot.val().content.cases[a][i].options.length; j++) {
            var b = $("<button>");
            b.addClass("question-button");
            b.attr("data-let", j);
            b.text(snapshot.val().content.cases[a][i].options[j]);
            $("#options").append(b);
        }
        //option click to move on to another questions, or stop if you answer incorrectly
        $(".question-button").on("click", function () {
            if ($(this).data("let") === snapshot.val().content.cases[a][i].answer) {
                i++;
                questionRendered();

            } else {
                $("#options").empty();
                $("#question").html("Sorry you guess this particular question incorrectly. Please try again!")
            }
        })
    })

}