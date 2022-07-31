const rollDice = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const player1Score = document.getElementById('score--0');
const player2Score = document.getElementById('score--1');
const player1CurrentScore = document.getElementById('current--0');
const player2CurrentScore = document.getElementById('current--1');
const holdScore = document.querySelector('.btn--hold');
const refreshGame = document.querySelector('.btn--new');

let currentScore, addUpscore, activePlayer, playing;

// Creating an initialisation function
const init = () => {
  currentScore = 0;
  addUpscore = [0, 0];
  activePlayer = 0;
  playing = true;
  
  dice.classList.add('hidden')
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;

  player1.classList.remove('player--winner')
  player2.classList.remove('player--winner')
  player1.classList.add('player--active')
  player2.classList.remove('player--active')
}
init()

// Function for switching player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player--active')
  player2.classList.toggle('player--active')
}
// Rolling the dice
rollDice.addEventListener('click', () => {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer()
    }
  }
})

holdScore.addEventListener('click', () => {
  if (playing) {
    // Add current score to active player score
    addUpscore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = addUpscore[activePlayer];

    //  if the score is 100 the player wins and the game stops
    if (addUpscore[activePlayer] >= 100) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
      dice.classList.add('hidden');
    } else {
      // Switch player as game continues
      switchPlayer()
    }
  }
})

refreshGame.addEventListener('click', init);