const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const homeBtn = document.getElementById("home-btn");
const questionContainer = document.getElementById("question-container");
let width = 0;
let numCorrect = 0;

const progressBar = document.getElementById('progress');
const finalGrade = document.getElementById('result');

const questionElem = document.getElementById("questions");
const answerBtns = document.getElementById("answer-btn");

let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function whichQuiz() {
    switch(document.body.id) {
        case "math":
            shuffledQuestions = math_questions.sort(() => Math.random() - 0.5);
            currentQuestionIndex = 0;
            break;
        case "general":
            shuffledQuestions = general_questions.sort(() => Math.random() - 0.5);
            currentQuestionIndex = 0;
            break;
        case "gaming":
            shuffledQuestions = gaming_questions.sort(() => Math.random() - 0.5);
            currentQuestionIndex = 0;
            break;
    }
}

function startQuiz() {
    console.log("start!");
    
    width = 0;
    numCorrect = 0;
    progressBar.classList.add('hide');
    finalGrade.classList.add('hide');
    

    startBtn.classList.add("hide");
    homeBtn.classList.add("hide");

    whichQuiz();

    questionContainer.classList.remove("hide");

    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(whichQuestion) {
    questionElem.innerText = whichQuestion.question;

    whichQuestion.options.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {

            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerBtns.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextBtn.classList.add("hide");

    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
    
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;    
   
    
    if (correct) {
        selectedButton.disabled = true;

        progressBar.style.transition = 0.5 + "s";
        progressBar.classList.remove('hide');
        
        numCorrect += 1;
        width += 20;
        progressBar.style.backgroundColor = 'green';
        
        progressBar.style.width = width + "%";

    }
    
    setStatusClass(document.body, correct);
    Array.from(answerBtns.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });

    if ((currentQuestionIndex + 1) < shuffledQuestions.length) {
        nextBtn.classList.remove("hide");
    } else {
        finalGrade.classList.remove('hide');
        finalGrade.innerText = "Quiz Grade: " + numCorrect + "/" + 5; 
        startBtn.innerText = "Restart";
        startBtn.classList.remove("hide");
        homeBtn.classList.remove("hide");
        
    }
    
}

function setStatusClass(element, isCorrect) {
    clearStatusClass(element);
    
    if (isCorrect) {    
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}


function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}