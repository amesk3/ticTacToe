const prompt = require("prompt");
prompt.start();

let player1 = "X";
let player2 = "O";
let otherPlayer;

let contain = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9"
};

function board() {
  console.log(`\n  ${contain[1]} | ${contain[2]} | ${contain[3]} \n
  ---------
  ${contain[4]} | ${contain[5]} | ${contain[6]}\n 
  ---------
  ${contain[7]} | ${contain[8]} | ${contain[9]}`);
}

let winningCombo = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

function startPlaying() {
  console.log("You are player X.");
}

function play(player) {
  let toggle = false;

  if (player === player1) {
    otherPlayer = player2;
  } else {
    otherPlayer = player1;
  }

  console.log("Choose your move. Choose available number from 1 to 9.");
  prompt.get(["Move"], function(err, result) {
    console.log("You chose " + result.Move);
    if (
      parseInt(result.Move) > 0 &&
      parseInt(result.Move) < 10 &&
      contain[result.Move] !== "X" &&
      contain[result.Move] !== "O"
    ) {
      contain[result.Move] = player;
    } else {
      console.log("Invalid choice. Choose a number from 1 to 9");
      toggle = true;
    }

    board();

    if (checkForWin(player)) {
      console.log(`${player} wins!`);
      return true;
    } else if (checkForDraw()) {
      console.log("It's a draw");
      return true;
    }

    if (checkForWin(player) || checkForWin(otherPlayer) || checkForDraw()) {
      return;
    }
    if (toggle) {
      play(player);
    } else {
      play(otherPlayer);
    }
  });
}

function checkForWin(player) {
  for (let i = 0; i < winningCombo.length; i++) {
    let winCount = 0;
    for (let j = 0; j < winningCombo[0].length; j++) {
      if (contain[winningCombo[i][j]] === player) {
        winCount++;
      }
      if (winCount === 3) {
        return true;
      }
    }
  }
  return false;
}

function checkForDraw() {
  for (let key in contain) {
    if (contain[key] > 0 && contain[key] < 10) {
      return false;
    }
  }
  return true;
}

startPlaying();
play(player1);
