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

var a;
var i = 0;
var agentNumber = 0;
var isSucceeded;


firebase.database().ref().on("value", function (snapshot) {
        //submit button for ID submission
        $("#submit").on("click", function () {
            agentNumber = parseInt($("#agent-number").val());
            $("#id-number").empty();
            if (snapshot.val().user.order[agentNumber] == undefined) {
                $("#question").html("I am sorry we could not verify your ID Number. Please contact +62 81 1952 6700");
            } else {
                a = snapshot.val().user.order[agentNumber].case;
                isSucceeded = snapshot.val().user.order[agentNumber].isSucceeded;
                questionRendered();
            }
        })
    })

//render questions
function questionRendered() {
    firebase.database().ref().on("value", function (snapshot) {
console.log(isSucceeded, i, snapshot.val().content.cases[a], snapshot.val().content.cases[a].length, isSucceeded === false);
        if (i >= snapshot.val().content.cases[a].length && isSucceeded === false) {
            $("#options").empty();
            $("#question").html("Congratulation! You won!!");
            randomPrize();
            firebase.database().ref('/user/order/' + [agentNumber] + '/').update({
                isSucceeded: true
            });
            return;
        } else if (i >= snapshot.val().content.cases[a].length && isSucceeded === true) {
            $("#options").empty();
            $("#question").html("Congratulation! You already cracked the case and received a prize!!");

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

function randomPrize() {
    firebase.database().ref().on("value", function (snapshot) {
        prize = snapshot.val().prize;
        p = Math.floor(Math.random() * prize.length)
        var decision = prize[p].item;
        var decisionImage = prize[p].image;
        $("#options").html("You have won " + decision);
        $("#prize").html("<img id='decision-image' src=./" + decisionImage + ">");
        firebase.database().ref('/user/order/' + [agentNumber] + '/').update({
            prize : decision
        });
    })
}