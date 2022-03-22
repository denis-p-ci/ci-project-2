let score = 0;
let currentQuestion = 0;
questions = prepareQuestions();
document.getElementById('ans1').addEventListener('click', checkAnswer);
document.getElementById('ans2').addEventListener('click', checkAnswer);
document.getElementById('ans3').addEventListener('click', checkAnswer);
document.getElementById('ans4').addEventListener('click', checkAnswer);
document.getElementById('current-question').addEventListener('click', () => {
    if (currentQuestion < 14) {
        currentQuestion++; askQuestion(currentQuestion, questions);
    }
});
askQuestion(currentQuestion, questions);


/**
 * Function retrieves all easy, medium and hard questions, shuffles them, slices 5 of each and concatenates them in a single array
 * @returns 15 easy, medium and hard questions as an array
 */
function prepareQuestions() {
    /* Get all easy, medium and hard questions in separate arrays */
    let easyQuestions = allQuestions.filter((q) => { return q.difficulty == 'easy' });
    let mediumQuestions = allQuestions.filter((q) => { return q.difficulty == 'medium' });
    let hardQuestions = allQuestions.filter((q) => { return q.difficulty == 'hard' });
    /* Shuffle those arrays and extract first 5 questions */
    easyQuestions.sort(() => Math.random() - 0.5);
    easyQuestions = easyQuestions.slice(0, 5);
    mediumQuestions.sort(() => Math.random() - 0.5);
    mediumQuestions = mediumQuestions.slice(0, 5);
    hardQuestions.sort(() => Math.random() - 0.5);
    hardQuestions = hardQuestions.slice(0, 5);
    questions = easyQuestions.concat(mediumQuestions).concat(hardQuestions);
    return questions;
}

/**
 * Function will display question and four buttons with possible answers
 * @param {question number} i 
 * @param {array of questions} questions 
 */
function askQuestion(i, questions) {
    let incorrectAnswers = [];
    /* Randomly choose which button provides correct answer */
    let rndCorrect = Math.floor(Math.random() * 4);
    let correctAnswer = questions[i].correct_answer;
    incorrectAnswers[0] = questions[i].incorrect_answers[0];
    incorrectAnswers[1] = questions[i].incorrect_answers[1];
    incorrectAnswers[2] = questions[i].incorrect_answers[2];
    /* Re-enable buttons and reset their colour */
    for (btn of document.getElementsByTagName('button')) { btn.removeAttribute('disabled'); };
    for (btn of document.getElementsByTagName('button')) { btn.style.backgroundColor = 'blue'; };
    /* Hide timer */
    document.getElementById('timer').style.display = 'none';
    document.getElementById('current-question').innerText = questions[i].question;
    /* Write possible answers in buttons, set data-correct to 1 if correct, 0 otherwise */
    switch (rndCorrect) {
        case 0: {
            document.getElementById('ans1').innerText = correctAnswer;
            document.getElementById('ans1').dataset.correct = "1";
            document.getElementById('ans2').innerText = incorrectAnswers[0];
            document.getElementById('ans2').dataset.correct = "0";
            document.getElementById('ans3').innerText = incorrectAnswers[1];
            document.getElementById('ans3').dataset.correct = "0";
            document.getElementById('ans4').innerText = incorrectAnswers[2];
            document.getElementById('ans4').dataset.correct = "0";
            break;
        }
        case 1: {
            document.getElementById('ans1').innerText = incorrectAnswers[0];
            document.getElementById('ans1').dataset.correct = "0";
            document.getElementById('ans2').innerText = correctAnswer;
            document.getElementById('ans2').dataset.correct = "1";
            document.getElementById('ans3').innerText = incorrectAnswers[1];
            document.getElementById('ans3').dataset.correct = "0";
            document.getElementById('ans4').innerText = incorrectAnswers[2];
            document.getElementById('ans4').dataset.correct = "0";
            break;
        }
        case 2: {
            document.getElementById('ans1').innerText = incorrectAnswers[0];
            document.getElementById('ans1').dataset.correct = "0";
            document.getElementById('ans2').innerText = incorrectAnswers[1];
            document.getElementById('ans2').dataset.correct = "0";
            document.getElementById('ans3').innerText = correctAnswer;
            document.getElementById('ans3').dataset.correct = "1";
            document.getElementById('ans4').innerText = incorrectAnswers[2];
            document.getElementById('ans4').dataset.correct = "0";
            break;
        }
        case 3: {
            document.getElementById('ans1').innerText = incorrectAnswers[0];
            document.getElementById('ans1').dataset.correct = "0";
            document.getElementById('ans2').innerText = incorrectAnswers[1];
            document.getElementById('ans2').dataset.correct = "0";
            document.getElementById('ans3').innerText = incorrectAnswers[2];
            document.getElementById('ans3').dataset.correct = "0";
            document.getElementById('ans4').innerText = correctAnswer;
            document.getElementById('ans4').dataset.correct = "1";
            break;
        }
    }
}

/**
 * Function increases score if answer was correct, changes buttons colour and displays timer
 */
function increaseScore() {
    if (score <= 14) {
        /* Highlight won sum */
        document.querySelectorAll(`[data-score="${score}"`)[0].style.backgroundColor = 'green';
        if (score === 14) {
            alert('Greast job!! You won a million!!');
        }
        else {
            score++;
        }
        if (currentQuestion < 14) {
            currentQuestion++;
            /* Countdown untill next question */
            setTimeout(() => { askQuestion(currentQuestion, questions) }, 3000);
            displayTimer();
        }
    };

}

/**
 * Function checks if answer is correct
 */

function checkAnswer() {
    /* If correct, change selected answer button colour to green ans increase score */
    /* Othwerwise, change selected answer button colour to orange, and correct one to green */
    if (this.dataset.correct == 1) {
        this.style.backgroundColor = 'green';
        increaseScore();
    } else {
        this.style.backgroundColor = 'orange';
        document.querySelectorAll("[data-correct='1']")[0].style.backgroundColor = 'green';
        if (score <= 4) {
            alert('We\'re sorry, you\'re leaving with 0...');
        } else if (score <= 9) {
            alert('great job!! You won 1.000,00!');
        } else if (score <= 14) {
            alert('great job!! You won 32.000,00!');
        }
    }
    /* Disable buttons until new question */
    for (btn of document.getElementsByTagName('button')) { btn.setAttribute('disabled', ''); };
}

function displayTimer() {
    /* Change numbers of seconds remaining */
    document.getElementById('timer').style.display = 'flex';
    setTimeout(() => { document.getElementById('counter').innerText = "3" }, 0);
    setTimeout(() => { document.getElementById('counter').innerText = "2" }, 1000);
    setTimeout(() => { document.getElementById('counter').innerText = "1" }, 2000);
}