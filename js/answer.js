var content = [{
    case: 1,
    question: "Who killed Theo?",
    options: ["John", "Daniel", "Michelle", "Jamie"],
    answer: 1,
    isDisplayed: false
}, {
    case: 1,
    question: "Which type of paperwork shows the proof of him/her killing Theo?",
    options: ["Billionaire Weekly", "John's Interrogation Forms", "Daniel's Interrogation Forms", "Jamie's Interrogation Forms", "Michelle's Interrogation Forms", "Suspect Board"],
    answer: 2,
    isDisplayed: false
}, {
    case: 1,
    question: "Where was the needle located before it poked Theo?",
    options: ["Theo's button", "Michelle's pocket", "tennis ball", "John's solarium"],
    answer: 2,
    isDisplayed: false
}, {
    case: 2,
    question: "Who killed Sheila?",
    options: ["Sonny", "Shane", "Stella", "Jason", "Jane"],
    answer: 3,
    isDisplayed: false
}, {
    case: 2,
    question: "What's suspicious about Stella?",
    options: ["She likes grandma", "She hates grandma", "She threw up"],
    answer: 2,
    isDisplayed: false
}]

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

firebase.database().ref().on("value", function(snapshot){
    firebaseNumber = snapshot.val().id;
})

$("#submit").on("click",function() {
    var agentNumber = $("#agent-number").val();
 
    console.log(agentNumber);
    console.log(firebaseNumber);
    
    if(agentNumber = firebaseNumber) {
        $("#id-number").empty();
        $("#question").html("hi");
    } else {
        $("#question").html("I am sorry we could not verify your ID Number. Please contact +62 81 1952 6700")
    }
})

