//These are the questions for the quiz. More can be added if they follow the same format
var quizQuestions = {
  questions: [
    {
      question: 'Natto is a commonly eaten breakfast food in Japan, typically served over rice. What is it?',
      answers: ['Fermented soybeans', 'Seaweed salad', 'Dried bonito flakes', 'An Omelet'],
      correctAnswer: 'Fermented soybeans'
    },
    {
      question: 'Gorgonzola is an Italian blue cheese made from the milk of which animal?',
      answers: ['Sheep', 'Cow', 'Goat', 'Buffalo'],
      correctAnswer: 'Cow'
    },
        {
      question: 'Considered a delicacy in Mexican cuisine, what is huitlacoche?',
      answers: ['Cactus pulp', 'Ant larvae', 'Fish roe', 'Parasitic corn fungus'],
      correctAnswer: 'Parasitic corn fungus'
    },
    {
      question: 'There are five "mother sauces" in French cuisine. Which of the following is not one of them?',
      answers: ['Tomato sauce', 'Espagnole Sauce', 'Hollandaise sauce', 'Garlic Sauce'],
      correctAnswer: 'Garlic Sauce'
    },
    {
      question: 'In which country did tomatillos originate?',
      answers: ['Peru', 'Colombia', 'Mexico', 'Guyana'],
      correctAnswer: 'Mexico'
    },
    {
      question: 'Ropa vieja is classic Cuban dish consisting of stewed beef and vegetables. What does "ropa vieja" mean in English?',
      answers: ['Beef stew', 'Tomato soup', 'Old clothes', 'Rope soup'],
      correctAnswer: 'Old clothes'
    },
    {
      question: 'Which country leads the world in saffron production?',
      answers: ['Greece', 'India', 'Spain', 'Iran'],
      correctAnswer: 'Iran'
    },
    {
      question: 'What is the name of the scale used to measure the pungency of chili peppers?',
      answers: ['Capsicum Index', 'Scoville scale', 'Capsaicin concentration', 'Culinary Thermal Unit'],
      correctAnswer: 'Scoville scale'
    },
    {
      question: 'Pho is a noodle soup originating in which country?',
      answers: ['Thailand', 'China', 'Vietnam', 'Malaysia'],
      correctAnswer: 'Vietnam'
    },
    {
      question: 'What is yeast, scientifically speaking?',
      answers: ['Bacterium', 'Fungus', 'Algae', 'Protozoan'],
      correctAnswer: 'Fungus'
    },
    
  ],
  
  currentIndex: 0,
  correctCount: 0, 
};

//These are global variables to be used throughout quiz execution
const QUESTION_CONTAINER_CLASS = '#quizcontainer';
const QUESTION_RENDERING_CLASS = '.js-quiz-question';
const QUESTION_FORM_CLASS = '#js-quiz-form';
const RESET_BUTTON_CLASS = '#js-quiz-reset-button';
const ANSWER_OPTIONS_CLASS = '.js-quiz-options';
const SUBMIT_BUTTON_CLASS = '#js-submit-button';
const START_BUTTON_CLASS = '#js-start-button';
const FEEDBACK_CLASS = '#js-quiz-feedback';
const RESET_CLASS = '#js-quiz-reset';
const START_CLASS = '#js-quiz-start-page';
const RESPONSE_CLASS = '#js-responses';
const TRACKER_CLASS = '#js-question-tracker';

//This set of functions control what is displayed on the screen 
function setInitialLayout() {
  //$(QUESTION_CONTAINER_CLASS).hide();
  //$(FEEDBACK_CLASS).hide();
  //$(RESET_CLASS).hide();
  $(QUESTION_CONTAINER_CLASS).addClass("hidden");
  $(FEEDBACK_CLASS).addClass("hidden");
  $(RESET_CLASS).addClass("hidden");
}

function layoutDuringQuestionGeneration() {
  //$(QUESTION_CONTAINER_CLASS).show();
  //$(RESET_CLASS).show();
  //$(START_CLASS).hide();
  $(QUESTION_CONTAINER_CLASS).removeClass("hidden");
  $(RESET_CLASS).removeClass("hidden");
  $(START_CLASS).addClass("hidden");
}

function layoutForFeedback() {
  //$(FEEDBACK_CLASS).show();
  $(FEEDBACK_CLASS).removeClass("hidden");
  $(RESET_CLASS).removeClass("hidden");
}

function layoutForReset() {
  //$(FEEDBACK_CLASS).hide();
  $(FEEDBACK_CLASS).addClass("hidden");
}

//This function will render the questions and answers
function renderQuestions() {
  console.log(quizQuestions.currentIndex);
  const currentQuestion = quizQuestions.questions[quizQuestions.currentIndex];
  const questionText = currentQuestion.question;
  
  console.log(currentQuestion);
  console.log(questionText);
  
  $(QUESTION_RENDERING_CLASS).text(questionText);
  
  // Render answers for current question
  let template = [];
  for (var i=0; i<currentQuestion.answers.length; i++) {
    template.push( 
          `<label class="responses">
          <input type="radio" name="answerButton" class="js-answer-button" value="${currentQuestion.answers[i]}">
          <span class="js-quiz-options">${currentQuestion.answers[i]}</span>
          </label><br>`);
  } 
  $(RESPONSE_CLASS).html(template);
}

//The next grouping of functions handles button clicks
//note the user selection and handle the click on answer
function handleAnswer() { 
  $(SUBMIT_BUTTON_CLASS).click(function(event) {
    event.preventDefault();
    var userSelection = $('input[name="answerButton"]:checked').val();
    evalAnswer(userSelection);
    layoutForFeedback();
    incrementQuestion();
  });
}

//This will handle the start button being clicked
$(START_BUTTON_CLASS).click(function (e) {
      beginQuiz();
  });
function beginQuiz() {
  console.log("beginQuiz() ran");
  renderQuestions();
  layoutDuringQuestionGeneration();
  incrementQuestion();
}

//This will handle the reset button being clicked
$(RESET_BUTTON_CLASS).click(function (e) {
    resetQuiz();
});
function resetQuiz() {
  console.log("resetQuiz() ran");
    quizQuestions.currentIndex = 0;
    quizQuestions.correctCount = 0;
    renderQuestions();
    evalAnswer();
    incrementQuestion();
}

//The next group of functions evaluates user responses
// This will evaluate responses submitted by users
function evalAnswer(userSelection) {
  
  const correctChoice = quizQuestions.questions[quizQuestions.currentIndex].correctAnswer;
  
  if(userSelection === correctChoice) {
    quizQuestions.correctCount++;
    provideFeedback(true);
    quizQuestions.currentIndex++;
  } 
  else if(userSelection === undefined) {
    provideFeedback('unanswered');
  } 
  else {
    provideFeedback(false,correctChoice);
    quizQuestions.currentIndex++;
  }
  console.log(quizQuestions.currentIndex);
  console.log(quizQuestions.questions.length);
  if (quizQuestions.currentIndex === quizQuestions.questions.length) {
    renderQuestionResult();
  } 
  else {
    renderQuestions();
    }
}


//Provide final score to user
function renderQuestionResult() {
  $(FEEDBACK_CLASS).html('<p>' + 'Congratulations! Your final score is ' + quizQuestions.correctCount + ' out of ' + quizQuestions.questions.length + '. </p>');
  evalAnswer();
}

//This increments the a out of b box
function incrementQuestion() {
  $(TRACKER_CLASS).html('<p>' + (quizQuestions.currentIndex + 1) + '/' + quizQuestions.questions.length + ' </p>');
}

//Provide feedback for each question answered by user
function provideFeedback(boolean, correctResponse) {
  
  if (boolean === true) {
    $(FEEDBACK_CLASS).html('<p>' + 'Correct! Your current score is ' + quizQuestions.correctCount + ' out of ' + quizQuestions.questions.length + '. </p>');
  }
  else if (boolean === false) {
    $(FEEDBACK_CLASS).html('<p>' + 'Incorrect! The correct answer is '+correctResponse+'. Your current score is ' + quizQuestions.correctCount + ' out of ' + quizQuestions.questions.length + '. </p>');
  } 
  else if (boolean == 'unanswered'){
    $(FEEDBACK_CLASS).html('<p>' + 'Please select an answer!</p>');
    }
}


//These will be conatined within the first function
function runQuiz() {
  setInitialLayout();
  //renderQuestions(); 
  //function beginQuiz();
  //function restartQuiz();
  handleAnswer();
}

$(document).ready(runQuiz);