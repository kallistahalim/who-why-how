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
firebase.analytics();
