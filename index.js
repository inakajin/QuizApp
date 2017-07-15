//These are my high level functions
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
    }/*,
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
    },*/
    
],
  
  currentIndex: 0,
  correctCount: 0, 
};

//These are constants to be used throughout quiz execution
const QUESTION_CONTAINER_CLASS = ".js-quiz-section";
const QUESTION_RENDERING_CLASS = ".js-quiz-question";
const QUESTION_FORM_CLASS = "#js-quiz-form";
//const QUESTION_FORM_LABEL_CLASS = "#js-quiz-form label";
const ANSWER_BUTTON_CLASS = ".js-answer-button";
const ANSWER_OPTIONS_CLASS = ".js-quiz-options";
const SUBMIT_BUTTON_CLASS = "#js-submit-button";
const FEEDBACK_CLASS = ".js-quiz-feedback";

//<label class="responses">
//           <input type="radio" name="answerButton" class="js-answer-button" value="1">
//           <span class="js-quiz-options"></span>
//         </label><br>

//This will render the questions
function renderQuestions() {
  console.log(quizQuestions.currentIndex);
  const currentQuestion = quizQuestions.questions[quizQuestions.currentIndex];
  const questionText = currentQuestion.question;
  
  console.log(currentQuestion);
  console.log(questionText);
  
  $(QUESTION_RENDERING_CLASS).text(questionText);
  
  // Render answers for current question
  for (var i=0; i<currentQuestion.answers.length; i++) {
    const template = 
          `<label class="responses">
          <input type="radio" name="answerButton" class="js-answer-button" value="${currentQuestion.answers[i]}">
          <span class="js-quiz-options">${currentQuestion.answers[i]}</span>
          </label><br>`;
    $(QUESTION_FORM_CLASS).prepend(template);
  
  } 
}

//note the user selection
function handleAnswer() {	
	$(SUBMIT_BUTTON_CLASS).click(function(event) {
		event.preventDefault();
		var userSelection = $('input[name="answerButton"]:checked').val();
		evalAnswer(userSelection);
	});
}

//Evaluate responses
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
		provideFeedback(false);
		quizQuestions.currentIndex++;
		}
		console.log(quizQuestions.currentIndex)
		console.log(quizQuestions.questions.length)
		if (quizQuestions.currentIndex == quizQuestions.questions.length) {
		renderQuestionResult();
		} 
		else {
		renderQuestions();
  	}
}



function provideFeedback(boolean) {
	//var feedback = $('#js-quiz-feedback');
	
	if (boolean === true) {
	  $(FEEDBACK_CLASS).html('<p>' + 'Correct! (' + quizQuestions.correctCount + ' / ' + quizQuestions.questions.length + ') </p>');
	}
	else if (boolean === false) {
	  $(FEEDBACK_CLASS).html('<p>' + 'Incorrect! (' + quizQuestions.correctCount + ' / ' + quizQuestions.questions.length + ') </p>');
	} 
	else if (boolean == 'unanswered'){
		$(FEEDBACK_CLASS).html('<p>' + 'Please select an answer! (' + quizQuestions.correctCount + ' / ' + quizQuestions.questions.length + ') </p>');
  	}
}

//These will be conatined within the first function
function runQuiz() {
renderQuestions(); 
//function beginQuiz();
//function restartQuiz();
handleAnswer();
// provideFeedback();

};

$(document).ready(runQuiz);