// alert(console.log("hello"));
const quiz = [{
    question: "Which is a search engine?",
    option: ["Google", "Bing", "Yahoo", "All of the above"],
    answer: 3
  },
  {
    question: " Which is not a property of attribute Behaviour of Marquee tag?",
    option: ["alternate", "blur", "scroll", "slide"],
    answer: 1
  },
  {
    question: "The attribute used to define a new namespace is.",
    option: ["XMLNS", "XmlNameSpace", "Xmlns", "XmlNs"],
    answer: 2
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    option: ["javascript", "script", "js", "scripting"],
    answer: 1
  },
  {
    question: "What is the name of the location address of the hypertext documents?",
    option: ["Uniform Resource Locator", "Web server", "File", " Web address"],
    answer: 0
  },
  {
    question: "What are shared on the Internet and are called as Web pages?",
    option: ["Programs", "Cables", " Hypertext documents", " None"],
    answer: 2
  },
  {
    question: "Which is the formal description of message formats and rules to be followed by computers?",
    option: ["Standards", "Protocol", "Syntax", "Language"],
    answer: 1
  },
  {
    question: " Which one of the following defines properties for the map?",
    option: ["mapOptions", "zoom", "center", "mapTypeId"],
    answer: 0
  },
  {
    question: "Which method is used to get user’s position?",
    option: [" getCurrentPosition()", "getDirectPosition()", "post()", "getDirection"],
    answer: 0
  },
  {
    question: "Which navigator object property returns a geolocation object?",
    option: ["appVersion", "geolocation", " language", "appCodeName"],
    answer: 1
  }
]

// console.log(quiz);

var questionCounter = 0;
var availableQuestions = [];
var availableOptions = [];
var currentQuestion;
var correctAnswers = 0;
var attempts =0;

const qn = document.querySelector(".question-number");
const questionText = document.querySelector(".questions-mcq");
const optionText = document.querySelector(".option-mcq");
var question_box = document.querySelector(".questions");
var score_board = document.querySelector(".score-board");
var head_box = document.querySelector(".head");
var setTime = document.querySelector("#countdown");
var timeup = document.querySelector(".time-up");



// set time
var time_in_min = 2;
var time = time_in_min * 60;

// setInterval(updateTime, 1000);
function updateTime(){
  var minutes = Math.floor(time/60);
  var seconds = time%60;

  setTime.innerHTML= `${minutes}:${seconds}`;
  time--;

if(minutes<1 && seconds<1){
  head_box.classList.add("hide");
  question_box.classList.add("hide");
  score_board.classList.add("hide");
  timeup.classList.remove("hide");
  }
}


function stopTime(){
  clearTimeout(time);
}
// set available questions into array
function setAvailableQuestions() {
  for (var i = 0; i < quiz.length; i++) {
    availableQuestions.push(quiz[i]);
  }
  // console.log(availableQuestions);
}

function getQuestion() {
  // console.log("hii");
  qn.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

  // get a random question from availableQuestions
  var randQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  // console.log((randQuestion));
  currentQuestion = randQuestion;
  questionText.innerHTML = currentQuestion.question;

  // store the index of random questions
  var index = availableQuestions.indexOf(randQuestion)
  // console.log(index);
  availableQuestions.splice(index, 1);
  // console.log(randQuestion);
  // console.log(availableQuestions);


  // get the options

  // console.log(randQuestion.option);
  // var options = randQuestion.option;
  // console.log(options);

  // push options into availableOptions array


  /**
  var optionlenght = currentQuestion.option.length;
  for(var i=0; i<optionlenght; i++){
    availableOptions.push(i);
  }
  console.log(availableOptions);

  // create options in the HTML
  for(var i=0; i<optionlenght; i++){
    var optionInsert = document.createElement("div");
    optionInsert.innerHTML = currentQuestion.option[i];
    optionInsert.id = i;
    optionInsert.className = "option";
    var OI = optionText.append(optionInsert);
    // availableOptions.splice(OI,1)

  }**/


  const optionlenght = currentQuestion.option.length;
  for (let i = 0; i < optionlenght; i++) {
    availableOptions.push(i)
  }
  optionText.innerHTML = '';
  for (let i = 0; i < optionlenght; i++) {
    // get the random option index
    var randOption = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // store the index of random option
    var index = availableOptions.indexOf(randOption);
    availableOptions.splice(index, 1); //remove the randOption from the available option so that option will not repeat
    // console.log(randOption);


    var option = document.createElement("div");
    option.innerHTML = currentQuestion.option[randOption];
    option.id = randOption;
    option.className = "option";
    optionText.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;

}


function getResult(mcqAns) {
  // console.log(currentQuestion.answer);
  // console.log(mcqAns.id);
  if (mcqAns.id == currentQuestion.answer) {
    mcqAns.classList.add("correct");
    // console.log("correct");
    correctAnswers++;
    console.log(correctAnswers);
  }
  else{
    // console.log("wrong");
    mcqAns.classList.add("wrong");

    // if the ans is incorrect the show the correct option
    var optionlength = optionText.children.length;
    for(var i=0; i<optionlength; i++){
      if(parseInt(optionText.children[i].id)==currentQuestion.answer){
        optionText.children[i].classList.add("correct");
      }
    }
  }
  attempts++;
  console.log(attempts);
  unclickableOptions();
}


function unclickableOptions(){
  var optionlenght = optionText.children.length;
  for(i=0; i<optionlenght; i++){
    optionText.children[i].classList.add("alredy-answered");
  }
}

function next() {
  if (questionCounter == quiz.length) {
    console.log("quiz over");
    quizOver();
  } else {
    getQuestion();
  }
}

function quizOver(){
  head_box.classList.add("hide");
  question_box.classList.add("hide");
  score_board.classList.remove("hide");
  quizResult();
}

function quizResult(){
  score_board.querySelector(".total-question").innerHTML = quiz.length;
  score_board.querySelector(".correct-answers").innerHTML = correctAnswers;
  score_board.querySelector(".wrong-answers").innerHTML = attempts - correctAnswers;
  score_board.querySelector(".your-score").innerHTML = correctAnswers + "/" + quiz.length;
}

function startQuiz(){
  question_box.classList.remove("hide");
}

window.onload = function() {
  setAvailableQuestions();
  getQuestion();

}
