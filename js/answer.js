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

firebase.database().ref().once("value").then(function (snapshot) {
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
    firebase.database().ref().once("value").then(function (snapshot) {

        if (i >= snapshot.val().content.cases[a].length && isSucceeded === false) {
            $("#options").empty();
            $("#question").html("Congratulation! You won!!");
            showPrizes();
            firebase.database().ref('/user/order/' + [agentNumber] + '/').update({
                isSucceeded: true
            });
            return;
        } else if (i >= snapshot.val().content.cases[a].length && isSucceeded === true) {
            $("#options").empty();
            $("#question").html("Congratulation! You already cracked the case and received a prize!!");
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

function showPrizes() {
    firebase.database().ref().once("value").then(function (snapshot) {
        for (var i = 0; i < snapshot.val().prize.length; i++) {
            var c = $("<button>");
            c.addClass("prize-button");
            c.attr("data-let", snapshot.val().prize[i].image);
            c.html("<img id='decision-image' src=./" + snapshot.val().prize[i].image + ">");
            $("#prize").append(c);
        }
        $("#options").html("Please pick your prize by clicking the prize you like!");

        $(".prize-button").on("click", function () {
            console.log("this is let" + $(this).data("let"));
            firebase.database().ref('/user/order/' + [agentNumber] + '/').update({
                prize: $(this).data("let")
            });
            
            $("#options").html("Congratulation. Please show this voucher to our vendor and mention your ID number :)");
            $("#prize").html("<img id='prize-pick-image' src=./" + $(this).data("let") + ">");

        });

    })
}