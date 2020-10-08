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
    firebaseNumber = snapshot.val().id;
    a = snapshot.val().case;
})


//submit button for ID submission
$("#submit").on("click", function () {
    console.log(firebaseNumber);
    var agentNumber = $("#agent-number").val();
    console.log(agentNumber);
    $("#id-number").empty();

    if (agentNumber == firebaseNumber) {
        questionRendered();
    } else {
        $("#question").html("I am sorry we could not verify your ID Number. Please contact +62 81 1952 6700");
    }
})

//content information
var content = [
    [{
        question: "Who killed Sheila?",
        options: ["Sonny", "Shane", "Stella", "Jason", "Jane"],
        answer: 3,
        isDisplayed: true
    }, {
        question: "Why did he/she kill Sheila?",
        options: ["he/she hated that Stella is unhappy", "he/she was never paid attention by Sheila", "he/she wanted the museum", "he/she wanted Sheila to be quiet"],
        answer: 0,
        isDisplayed: true
    },
    {
        question: "What does the note on napkin say?",
        options: ["kick us at the upper deck s and i will tell you about the casse", "that us at the upper boat s and i will tell you about the baby", "meet us at the upper deck i and u will tell you about the work", "meet us at the upper deck s and i will tell you about the baby"],
        answer: 3,
        isDisplayed: true
    }, {
        question: "What does the card in Sheila's room say?",
        options: ["I am sorry I want to be part of your family", "I am sad I want to be part of your family", "I apologize I want to be part of your family", "I hateyou I do not want to be with you"],
        answer: 2,
        isDisplayed: true
    },
    {
        question: "What does the letter in Sheila's pocket say?",
        options: ["I am her brother and I love her I will marry her", "I am her brother and I love her I will murry her", "I am her brother and I love her I will mirry her", "I am her brother and I love her I will merry her"],
        answer: 0,
        isDisplayed: true
    },
    {
        question: "How did he/she do it?",
        options: ["gave her a note at the bar and asked her to go to upper deck then pushed her", "made her drunk at the bar then pushed her off to the ocean", "poisoned her during dinner and hid her in the bathroom", "worked together with the bartender to put sleeping pill in her drink then tossed her into the ocean"],
        answer: 0,
        isDisplayed: true
    },
]
]


//render questions
function questionRendered() {
    if (i >= content[a].length ) {
        $("#options").empty();
        $("#question").html("Congratulation! You won!!");
        return;
    } else {
        //print question
        questionPrinted = content[a][i].question;
        $("#question").html(questionPrinted);
    }

    //print options
    $("#options").empty();
    for (var j = 0; j < content[a][i].options.length; j++) {
        var b = $("<button>");
        b.addClass("question-button");
        b.attr("data-let", j);
        b.text(content[a][i].options[j]);
        $("#options").append(b);
    }
    //option click to move on to another questions, or stop if you answer incorrectly
    $(".question-button").on("click", function () {
        if ($(this).data("let") === content[a][i].answer) {
            i++;
            questionRendered();

        } else {
            $("#options").empty();
            $("#question").html("Sorry you are incorrect. Please try again!")
        }
    })


}