const quizQuestions = [
    {
        question : "In which city is the famous Big Ben located?",
        options : ['italy','london','france','germany'],
        answer : 1,
    },
    {
        question : "What does the term black gold refer to?",
        options : ['petroleum','Natural gas','coal','benzene'],
        answer : 0,
    },
    {
        question : "What is the smallest Arab country in terms of area?",
        options : ['Oman','Morocco','Bahrain','Tunisia'],
        answer : 2,
    },
    {
        question : "What is the proportion of water in the globe?",
        options : ['75%','71%','79%','77%'],
        answer : 1,
    },
    {
        question : "What is the name of the unit of sound intensity?",
        options : ['Richter','volts','wat','db'],
        answer : 3,
    }
]

// declare variable of classes

const questionNumber = document.querySelector(".questionNumber");
const questionText = document.querySelector(".questionText");
const optionList = document.querySelector(".optionList");
const answersIndicatorContainer = document.querySelector(".circles");
const instructionBox = document.querySelector("#instruction");
const questionsBox = document.querySelector("#questions");
const resultBox = document.querySelector("#results");
const startExamBox = document.querySelector("#startExam");

let questionCounter = 0;
let currentQuestion ;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// Put The Question In Avalible Questions Array

function setAvailableQuestions(){
    const totalQuestions = quizQuestions.length;
    for(let i=0; i<totalQuestions; i++){
        availableQuestions.push(quizQuestions[i])
    }
}

// Set Question Number , Text and Options

function getNewQuestion(){
    questionNumber.innerHTML = 'Question ' + (questionCounter + 1) + ' of ' + quizQuestions.length;

    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;

    questionText.innerHTML = currentQuestion.question;

    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);

    // Set Options
    const optionLen = currentQuestion.options.length;
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i);
    }
    
    optionList.innerHTML = ' ';
    let animationDelay = 0.15;

    for(let i=0; i<optionLen; i++){
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);
        const option = document.createElement('div');
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15 ;
        option.className = 'option';
        optionList.appendChild(option);
        option.setAttribute('onclick',"getResult(this)");
    }

    questionCounter++;
}

// Get The Result Of Current Question 
function getResult(element){
    const id = parseInt(element.id);
    if (id === currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");

        // Put Green Color In The Correct Answer When Check Wrong Answer
        const optionLen = optionList.children.length;
        for(let i=0; i<optionLen; i++){
            if (parseInt(optionList.children[i].id) === currentQuestion.answer){
                optionList.children[i].classList.add("correct"); 
            }
        }
    }

    attempt++;
    unclickableOptions();
}

// Make Options Unclickable while User Select One 

function unclickableOptions(){
    const optionLen = optionList.children.length;
    for(let i=0; i<optionLen; i++){
        optionList.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestions = quizQuestions.length;
    for(let i=0; i<totalQuestions; i++){
        const indicator = document.createElement('div');
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
    if(questionCounter === quizQuestions.length){
        console.log('Quiz Over');
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    questionsBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quizQuestions.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quizQuestions.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML =  correctAnswers + " / " + quizQuestions.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    resultBox.classList.add("hide");
    questionsBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    resultBox.classList.add("hide");
    instructionBox.classList.remove("hide");
    resetQuiz();
}

function startExam(){
    startExamBox.classList.add("hide");
    instructionBox.classList.remove("hide");
}

function startQuiz(){
    instructionBox.classList.add("hide");
    questionsBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}

window.onload = function(){
    instructionBox.querySelector(".total-question").innerHTML = quizQuestions.length;
}