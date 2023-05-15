class Scoreboard {

    constructor(currentScore, previousScore, enteredScore, currentLegs, currentAvg) {
        this.currentScoreText = currentScore;
        this.previouslyScoredText = previousScore;
        this.enteredScoreText = enteredScore;
        this.currentLegsText = currentLegs;
        this.currentAvgText = currentAvg;

        //clear anything in the entered field
        this.clear();
    }

    //start a new game
    //clear scores and legs
    newGame() {
        if (numberOfDarts > 1) {
            numberOfDarts = 0;
            numberOfLegs = 0;
            numberOfThrows = 0;
            totalScore = 0;

            this.currentScoreText.innerText = '501';
            this.previouslyScoredText.innerText = '';
            this.enteredScoreText.innerText = '';
            this.currentLegsText.innerText = 'Legs: ';
            this.currentAvgText.innerText = 'Avg: ';
        }

    }

    //starts a new leg of the game
    newLeg() {
        numberOfLegs++;

        this.currentScoreText.innerText = '501';
        this.enteredScoreText.innerText = '';
        this.currentLegsText.innerText = 'Legs: ' + numberOfLegs;
    }

    //calculate the dart average
    calcAverage() {
        //((Score left – 501) / Number of darts thrown) * 3 = Darts average
        let averageScore = 0;

        if ((totalScore > 0) && (numberOfThrows > 0)) {
            console.log('total score ' + totalScore);
            averageScore = (totalScore / numberOfDarts) * 3;

            console.log('average ' + averageScore);
            this.currentAvgText.innerText = 'Avg: ' + averageScore.toFixed(2); //2 decimal places
        }

    }

    //clear the entered score
    clear() {
        this.enteredScoreText.innerText = '';
    }

    //player doesn't score although the dart count rises
    bust() {

    }

    //check out player
    checkOut() {
        this.newLeg();


    }

    //add the entered number to the entered score field
    appendEnteredScore(number) {

        var enteredScore = this.enteredScoreText.innerText + number;
        var potientalFinalScore = this.currentScoreText.innerText - enteredScore;

        console.log('potenitalScore: ' + potientalFinalScore);

        //check numbers that cant be hit
        if (bogeyNumbers.includes(enteredScore)) {
            return;
        }

        //check for any score over 180
        if (enteredScore > 180) {
            return;
        }

        //check for finish
        if (potientalFinalScore === 0) {
            this.enteredScoreText.innerText += number;
            return;
        }

        //dont allow more than 1 leading zeros
        if ((this.enteredScoreText.innerText.charAt(0) === '0') &&
            number === '0') {
            return;
        }

        //check for any score that leave a score lower than 2
        if (potientalFinalScore < 2) {
            return;
        }

        this.enteredScoreText.innerText += number;

    }

    //minus the entered score from the current score
    score() {
        if (enteredScoreText.innerText.trim() !== '') {
            this.previouslyScoredText.innerText = enteredScoreText.innerText;

            this.currentScoreText.innerText -= enteredScoreText.innerText;

            totalScore += parseFloat(enteredScoreText.innerText); // convert text to float
            console.log('total score: ' + totalScore);

            if (currentScoreText.innerText === '0') {
                this.checkOut();
            }


            this.clear(); // clears entered score

            //increment dart count and throws
            numberOfDarts += 3;
            numberOfThrows++;

            this.calcAverage();
            console.log("num: " + numberOfLegs + " Darts: " + numberOfDarts + " Throws: " + numberOfThrows);
        }
    }
}

//all buttons
const numberButtons = document.querySelectorAll('[data-number]');
const clearButton = document.querySelector('[data-clear]');
const bustButton = document.querySelector('[data-bust]');
const scoreButton = document.querySelector('[data-score]');
const newGameButton = document.querySelector('[data-new-game]');
const undoButton = document.querySelector('[data-undo]');

//text fields
const previouslyScoredText = document.querySelector('[data-previously-scored]');
const currentScoreText = document.querySelector('[data-current-score]');
const enteredScoreText = document.querySelector('[data-entered-score]');
const currentLegsText = document.querySelector('[data-current-legs]');
const currentAvgText = document.querySelector('[data-current-avg]');


//array of all dart numbers not able to be hit;
var bogeyNumbers = ['169', '168', '166', '165', '163', '162', '159'];

//declaring stats
var totalScore = 0; // game score of every dart
var numberOfLegs = 0;
var numberOfDarts = 0;
var numberOfThrows = 0;

//declare constructor class
const scoreboard = new Scoreboard(currentScoreText, previouslyScoredText,
    enteredScoreText, currentLegsText, currentAvgText); //current, previous, entered

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        scoreboard.appendEnteredScore(button.innerText);
    });
});

scoreButton.addEventListener('click', button => {
    scoreboard.score();
});

clearButton.addEventListener('click', button => {
    scoreboard.clear();
});

bustButton.addEventListener('click', button => {
    scoreboard.bust();
});

newGameButton.addEventListener('click', button => {
    scoreboard.newGame();
});
