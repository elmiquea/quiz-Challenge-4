<<<<<<< HEAD
// Gathering HTML component for control 
const quizBody = document.getElementById("quiz");
const resultsEl = document.getElementById("result");
const finalScoreEl = document.getElementById("finalScore");
const gameoverDiv = document.getElementById("gameover");
const questionsEl = document.getElementById("questions");
const quizTimer = document.getElementById("timer");
const startQuizButton = document.getElementById("startbtn");
const startQuizDiv = document.getElementById("startpage");
const highscoreContainer = document.getElementById("highscoreContainer");
const highscoreDiv = document.getElementById("high-scorePage");
const  highscoreInputName = document.getElementById("initials");
const highscoreDisplayName = document.getElementById("highscore-initials");
const  endGameBtns = document.getElementById("endGameBtns");
const submitScoreBtn = document.getElementById("submitScore");
const  highscoreDisplayScore = document.getElementById("highscore-score");
const  buttonA = document.getElementById("a");
const  buttonB = document.getElementById("b");
const buttonC = document.getElementById("c");
const buttonD = document.getElementById("d");

// Quiz question object
const  quizQuestions = [{
    question: "What does API stands for?",
    choiceA: "Active program incorporation",
    choiceB: "Accounting program institution",
    choiceC: "Application programming interface",
    choiceD: "none of the above",
    correctAnswer: "c"},
  {
    question: "What are some style for creating a Web API?",
    choiceA: "XML/jSON",
    choiceB: "HTML/CSS",
    choiceC: "JAVASCRIPT/BASH",
    choiceD: "NONE OF THE ABOVE",
    correctAnswer: "a"},
   {
    question: "What does the Acronym REST Stand for?",
    choiceA: "Representation State Transform",
    choiceB: "Representation State Transfer",
    choiceC: "Representation State Transform",
    choiceD: "Represent State Transfer",
    correctAnswer: "b"},
    {
    question: "What declaration MUST be included as the first item in an HTML document before the tag and is used to provide instructions to the web browser?",
    choiceA: "Caption",
    choiceB: "embed",
    choiceC: "!DOCTYPE",
    choiceD: "code",
    correctAnswer: "c"},
    {
    question: "What is used to underline a word or line of text??",
    choiceA: "ul",
    choiceB: "li",
    choiceC: "s",
    choiceD: "u",
    correctAnswer: "a"},  
    {
    question: "What does HTML stand for?",
    choiceA: "Hyper Text Markup Language",
    choiceB: "High Technology Management Language",
    choiceC: "How the Management learn",
    choiceD: "Hard Technology Management Language",
    correctAnswer: "a"},
    {
    question: "What HTML attribute specifies the path to display an image?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"},
        
    
    ];
// Other global variables
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 90;
let timerInterval;
let score = 0;
let correct;

// This capability spins through the item exhibit containing the test inquiries to create the inquiries and replies.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
        
      }, 1000);
    quizBody.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This capability clears the rundown for the high scores and produces another high score list from nearby capacity
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This capability shows the high scores page while stowing away each of different pages from
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This capability slows down every one of the factors to their unique qualities and shows the landing page to empower replay of the test
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 90;
    score = 0;
    currentQuestionIndex = 0;
}
// This capability really takes a look at the reaction to each response
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
      //show in the outcomes div that the response is right.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")     
        currentQuestionIndex++;
        timeLeft = timeLeft-10;
        generateQuizQuestion();
       
         
            
        //show in the outcomes div that the response is off-base.
    }else{
        showScore();
    }
}

// This button begins the test!
=======
// Gathering HTML component for control 
const quizBody = document.getElementById("quiz");
const resultsEl = document.getElementById("result");
const finalScoreEl = document.getElementById("finalScore");
const gameoverDiv = document.getElementById("gameover");
const questionsEl = document.getElementById("questions");
const quizTimer = document.getElementById("timer");
const startQuizButton = document.getElementById("startbtn");
const startQuizDiv = document.getElementById("startpage");
const highscoreContainer = document.getElementById("highscoreContainer");
const highscoreDiv = document.getElementById("high-scorePage");
const  highscoreInputName = document.getElementById("initials");
const highscoreDisplayName = document.getElementById("highscore-initials");
const  endGameBtns = document.getElementById("endGameBtns");
const submitScoreBtn = document.getElementById("submitScore");
const  highscoreDisplayScore = document.getElementById("highscore-score");
const  buttonA = document.getElementById("a");
const  buttonB = document.getElementById("b");
const buttonC = document.getElementById("c");
const buttonD = document.getElementById("d");

// Quiz question object
const  quizQuestions = [{
    question: "What does API stands for?",
    choiceA: "Active program incorporation",
    choiceB: "Accounting program institution",
    choiceC: "Application programming interface",
    choiceD: "none of the above",
    correctAnswer: "c"},
  {
    question: "What are some style for creating a Web API?",
    choiceA: "XML/jSON",
    choiceB: "HTML/CSS",
    choiceC: "JAVASCRIPT/BASH",
    choiceD: "NONE OF THE ABOVE",
    correctAnswer: "a"},
   {
    question: "What does the Acronym REST Stand for?",
    choiceA: "Representation State Transform",
    choiceB: "Representation State Transfer",
    choiceC: "Representation State Transform",
    choiceD: "Represent State Transfer",
    correctAnswer: "b"},
    {
    question: "What declaration MUST be included as the first item in an HTML document before the tag and is used to provide instructions to the web browser?",
    choiceA: "Caption",
    choiceB: "embed",
    choiceC: "!DOCTYPE",
    choiceD: "code",
    correctAnswer: "c"},
    {
    question: "What is used to underline a word or line of text??",
    choiceA: "ul",
    choiceB: "li",
    choiceC: "s",
    choiceD: "u",
    correctAnswer: "a"},  
    {
    question: "What does HTML stand for?",
    choiceA: "Hyper Text Markup Language",
    choiceB: "High Technology Management Language",
    choiceC: "How the Management learn",
    choiceD: "Hard Technology Management Language",
    correctAnswer: "a"},
    {
    question: "What HTML attribute specifies the path to display an image?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"},
        
    
    ];
// Other global variables
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 90;
let timerInterval;
let score = 0;
let correct;

// This capability spins through the item exhibit containing the test inquiries to create the inquiries and replies.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
        
      }, 1000);
    quizBody.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This capability clears the rundown for the high scores and produces another high score list from nearby capacity
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This capability shows the high scores page while stowing away each of different pages from
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This capability slows down every one of the factors to their unique qualities and shows the landing page to empower replay of the test
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 90;
    score = 0;
    currentQuestionIndex = 0;
}
// This capability really takes a look at the reaction to each response
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
      //show in the outcomes div that the response is right.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")     
        currentQuestionIndex++;
        timeLeft = timeLeft-10;
        generateQuizQuestion();
       
         
            
        //show in the outcomes div that the response is off-base.
    }else{
        showScore();
    }
}

// This button begins the test!
>>>>>>> 6814a959d5f02bc9b0d8daf45cf9b340947d1c05
startQuizButton.addEventListener("click",startQuiz);