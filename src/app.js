const possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];

const gameState = {
  team1: { score: 0, wickets: 0, ballsFaced: 0 },
  team2: { score: 0, wickets: 0, ballsFaced: 0 },
  turn: 1
};

let $team1Score, $team1Wickets, $team2Score, $team2Wickets, strikeButton, resetButton;

// Generate Random scores using the possible outcomes array given
function generateRandomScore() {
  const randomIndex = Math.floor(Math.random() * possibleOutcomes.length);
  return possibleOutcomes[randomIndex];
}

function updateScore() {
  const currentTeam = `team${gameState.turn}`;
  const score = generateRandomScore();
  
  gameState[currentTeam].ballsFaced++;

  if (score === "W") {
    gameState[currentTeam].wickets++;
  } else {
    gameState[currentTeam].score += score;
  }

  const ballElement = document.querySelector(`#${currentTeam}-superover div:nth-child(${gameState[currentTeam].ballsFaced})`);
  if (ballElement) {
    ballElement.textContent = score;
  } else {
    console.error(`Ball element not found for ${currentTeam}, ball ${gameState[currentTeam].ballsFaced}`);
  }

  updateDOM();

  if (gameState[currentTeam].ballsFaced === 6 || 
      gameState[currentTeam].wickets === 2 || 
      (gameState.turn === 2 && gameState.team2.score > gameState.team1.score)) {
    gameState.turn = gameState.turn === 1 ? 2 : 3;
    if (gameState.turn === 3) gameOver();
  }
}


function updateDOM() {
  if ($team1Score) $team1Score.textContent = gameState.team1.score;
  if ($team1Wickets) $team1Wickets.textContent = gameState.team1.wickets;
  if ($team2Score) $team2Score.textContent = gameState.team2.score;
  if ($team2Wickets) $team2Wickets.textContent = gameState.team2.wickets;
}

function gameOver() {
  let message = "It's a tie!";
  
  if (gameState.team1.score > gameState.team2.score) {
    message = "Team 1 wins!";
  } else if (gameState.team2.score > gameState.team1.score) {
    message = "Team 2 wins!";
  }
  
  alert(message);
}

function handleStrike() {
  if (gameState.turn < 3) {
    updateScore();
  }
}

//scores should be made blank when reset game function gets called
function resetGame() {
  gameState.team1 = { score: 0, wickets: 0, ballsFaced: 0 };
  gameState.team2 = { score: 0, wickets: 0, ballsFaced: 0 };
  gameState.turn = 1;

  // Clear the ball elements
  document.querySelectorAll('#team1-superover div, #team2-superover div').forEach(el => {
    el.textContent = "";
  });

  updateDOM();
}




// Donot edit the below lines of code
function initializeGame() {
  $team1Score = document.getElementById("score-team1");
  $team1Wickets = document.getElementById("wickets-team1");
  $team2Score = document.getElementById("score-team2");
  $team2Wickets = document.getElementById("wickets-team2");
  strikeButton = document.getElementById("strike");
  resetButton = document.getElementById("reset");

  if (strikeButton && resetButton) {
    strikeButton.addEventListener('click', handleStrike);
    resetButton.addEventListener('click', resetGame);
  } else {
    console.error("Strike or Reset button not found");
  }

  if (!$team1Score || !$team1Wickets || !$team2Score || !$team2Wickets) {
    console.error("One or more score/wicket elements not found");
  }
}

// Wait for the DOM to be fully loaded before initializing the game
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGame);
} else {
  initializeGame();
}

// Expose functions for testing
window.generateRandomScore = generateRandomScore;
window.updateScore = updateScore;
window.updateDOM = updateDOM;
window.gameOver = gameOver;
window.handleStrike = handleStrike;
window.resetGame = resetGame;
window.gameState = gameState;