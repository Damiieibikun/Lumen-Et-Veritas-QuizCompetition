let currentStudent = JSON.parse(localStorage.getItem('currentStudent'))
currentStudent.score = 0
let allStudents = JSON.parse(localStorage.getItem('studentsData'))


let academy = document.getElementById("academyName");
let candidateName = document.getElementById("candidateName");

let questionList = document.getElementById("questions");
let nextQuestion = document.getElementById("nextQ");
let minutesLeft = document.getElementById("minute");
let secondsLeft = document.getElementById("seconds");
let currentQuestion = document.getElementById("currentQ");
let totalQuestions = document.getElementById("totalQ");
let displayScore =  document.getElementById('studentScore')
let displayScoreMsg =  document.getElementById('staticBackdropLabel')
let seeScore =  document.getElementById('seeScore')
let score = 0;

function generateQuestions() {
    // run function to generate question
    let questions = JSON.parse(localStorage.getItem("Quiz"));
    if (questions === null) {
        class Question {
            constructor(question, options, answer) {
                this.question = question;
                this.options = options;
                this.answer = answer;
            }
        }

        // Array of 10 questions as objects
        const questionsArray = [
            new Question(
                "Which planet is known as the Red Planet?",
                ["Earth", "Mars", "Jupiter", "Venus"],
                "Mars"
            ),
            new Question("What is 12 + 8?", ["18", "19", "20", "21"], "20"),
            new Question(
                "What is the full form of 'HTTP' in web protocols?",
                [
                    "HyperText Transfer Protocol",
                    "HyperText Transfer Program",
                    "High Transfer Protocol",
                    "Hyper Transfer Protocol",
                ],
                "HyperText Transfer Protocol"
            ),
            new Question(
                "If x = 5, what is the value of 2x + 3?",
                ["11", "12", "13", "10"],
                "13"
            ),
            new Question(
                "Which of the following is a prime number?",
                ["15", "16", "17", "18"],
                "17"
            ),
            new Question(
                "Who wrote the play 'Hamlet'?",
                ["William Shakespeare", "J.K. Rowling", "Mark Twain", "Leo Tolstoy"],
                "William Shakespeare"
            ),
            new Question(
                "Which of these is an operating system?",
                ["Microsoft Word", "Google Chrome", "Linux", "Python"],
                "Linux"
            ),
            new Question(
                "In a family of 3 sons, each son has 1 sister. How many children are there in total?",
                ["4", "5", "6", "3"],
                "4"
            ),
            new Question(
                "What is the synonym of 'benevolent'?",
                ["Kind", "Cruel", "Indifferent", "Selfish"],
                "Kind"
            ),
            new Question(
                "What is the solution to the equation: 3x - 2 = 4?",
                ["x = 2", "x = 3", "x = 4", "x = 6"],
                "x = 2"
            ),
        ];

        localStorage.setItem("Quiz", JSON.stringify(questionsArray));
    }
}
generateQuestions();
let questions = JSON.parse(localStorage.getItem("Quiz"));
let newRandomised = []; // get random questions

//display candidate info
academy.innerText = currentStudent.university
candidateName.innerHTML = `${currentStudent.firstname} ${currentStudent.lastname}`


function shuffleArray(array) {
    // Helper function to shuffle array
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomQuestion(questions) {
    if (questions.length === 0) {
       
        return;
    }

    let randomIndex = Math.floor(Math.random() * questions.length); // random index
    let randomQuestion = questions[randomIndex];
    let shuffledOptions = shuffleArray([...randomQuestion.options]);

    let questionObj = {
        question: randomQuestion.question,
        options: shuffledOptions,
        answer: randomQuestion.answer,
    };
    newRandomised.push(questionObj);
    questions.splice(randomIndex, 1);
    getRandomQuestion(questions);
}

let questionsCopy = [...questions]; // spread questions
getRandomQuestion(questionsCopy); // run function

totalQuestions.innerText = newRandomised.length;
questionList.innerHTML = `
  <div class="card-header">
    ${newRandomised[0].question}
  </div>
  <ul class="list-group list-group-flush" id="answers">
    ${newRandomised[0].options
        .map((option) => `<li class="list-group-item" id=${0}>${option}</li>`)
        .join("")}
  </ul>
`;

let number = 1;
nextQuestion.addEventListener("click", function () {
    if (number < newRandomised.length) {
        currentQuestion.innerText = number + 1;
        questionList.innerHTML = `
        <div class="card-header">
          ${newRandomised[number].question}
        </div>
        <ul class="list-group list-group-flush" id="answers">
          ${newRandomised[number].options
                .map(
                    (option) =>
                        `<li class="list-group-item" id=${number}>${option}</li>`
                )
                .join("")}
        </ul>
      `;
        number++;
    }
    else{
        clearInterval(test);
        displayScoreMsg.innerText = 'Quiz Finished'
        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop0'));
        myModal.show(); 
    
    }

    if (number === newRandomised.length) {
        nextQuestion.innerText = "Finish";
    }

    let answer = localStorage.getItem("chosen");
    if (answer === "true") {
        score++;
        allStudents.forEach(student => {
            if((student.email === currentStudent.email) && (student.phone === currentStudent.phone)){
                student.score = score
                currentStudent.score = score
                localStorage.setItem('studentsData', JSON.stringify(allStudents))
                localStorage.setItem('currentStudent', JSON.stringify(currentStudent))
            }
        });

    }  
});




let timeRemaining = 120; // two minutes

let test = setInterval(() => {
    if (timeRemaining > 0) {
        minutesLeft.innerText = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
        secondsLeft.innerText = String(timeRemaining % 60).padStart(2, '0');
        timeRemaining--;
    } else {
        clearInterval(test);
        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        myModal.show();
        document.getElementById('staticBackdropLabelT').innerText = 'Time is up!'
        displayScore.innerHTML = `
        <p>Your Score</p>
        <p class="text-3xl font-bold">${(currentStudent.score/newRandomised.length) * 100}%</p>
        `
    }
}, 1000);

document.addEventListener("click", function (event) {
    let result;
    if (event.target.classList.contains("list-group-item")) {
        for (var i of event.target.parentElement.children) {
            i.classList.remove("selectedAnswer");
        }
        event.target.classList.add("selectedAnswer");

        if (event.target.innerText === newRandomised[event.target.id].answer) {
            result = true;
        } else {
            result = false;
        }
    }

    localStorage.setItem("chosen", result);
});


seeScore.addEventListener('click', function(){
    var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    myModal.show();
    
    displayScore.innerHTML = `
    <p>Your Score</p>
    <p class="text-3xl font-bold">${(currentStudent.score/newRandomised.length) * 100}%</p>
    `  
})


// Get the top 3
const top3Scorers = allStudents.sort((a, b) => b.score - a.score).slice(0, 3);                       
let winnersScores = document.getElementById('displayWinners')
document.getElementById('view-winners').addEventListener('click', function(){
    var myModal = new bootstrap.Modal(document.getElementById('currentWinners'));
    myModal.show();
    top3Scorers.map((student)=>{
        winnersScores.innerHTML +=` <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pb-10">
            <div class="mt-5 relative rounded-full w-32 h-32 border-3 border-red-200 flex justify-center items-center">
               <p class="font-bold text-2xl">${(student.score/10) * 100}%</p>
            </div>

            <h5 class="mb-1 mt-5 text-xl font-medium text-gray-900">
                ${student.firstname} ${student.lastname}
            </h5>
           
            <div class="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mortarboard text-red-500" viewBox="0 0 16 16">
                        <path
                            d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
                        <path
                            d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
                    </svg>
                <span class="text-sm text-gray-900">${student.university}</span>
            </div>
        </div>
    </div>`
    })
   
})