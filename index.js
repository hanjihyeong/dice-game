const ralldice = document.getElementsByClassName("ralldice");
const holdscore = document.getElementsByClassName("holdscore");
const dice = document.getElementsByClassName("dice");
const playerFirstScore = document.getElementsByClassName("player-first__score");
const playerSecondScore = document.getElementsByClassName(
  "player-second__score"
);
const playerFirstOverall = document.getElementsByClassName(
  "player-first__overall"
);
const playerSecondOverall = document.getElementsByClassName(
  "player-second__overall"
);

// 플레이어 div 선택
let playerFirstDiv = document.querySelector(".player-first");
let playerSecondDiv = document.querySelector(".player-second");

// 플레이어 상태
let players = [
  { currentScore: 0, totalScore: 0, isCurrentTurn: true },
  { currentScore: 0, totalScore: 0, isCurrentTurn: false },
];

//주사위 함수
const funcRallDice = (no) => {
  return function () {
    var randomNo = Math.floor(no * Math.random() + 1);
    return randomNo;
  };
};

const handleRallDice = () => {
  let throwDice = funcRallDice(6);

  let diceValue = throwDice();

  dice[0].innerText = diceValue;

  // 현재 턴인 플레이어 찾기
  let currentPlayerIndex;
  for (let i = 0; i < players.length; i++) {
    if (players[i].isCurrentTurn) {
      currentPlayerIndex = i;
      break;
    }
  }

  // 주사위 값이 >2 일 경우 스코어 더하기
  if (diceValue > 2) {
    players[currentPlayerIndex].currentScore += diceValue;

    // 점수 업데이트
    if (currentPlayerIndex === 0) {
      playerFirstScore[0].innerText = players[currentPlayerIndex].currentScore;
    } else {
      playerSecondScore[0].innerText = players[currentPlayerIndex].currentScore;
    }
  }

  // 주사위 값이 <=2 일 경우 상대방에게 턴 넘기기 및 현재스코어 초기화.
  else {
    switchTurn(currentPlayerIndex);
    console.log(`플레이어 ${currentPlayerIndex + 1}가 실패하여 턴을 넘깁니다.`);
  }
};

// Hold Score 버튼 핸들러 함수 추가
const handleHoldButton = () => {
  // 현재 턴인 플레이어 찾기
  let currentPlayerIndex;
  for (let i = 0; i < players.length; i++) {
    if (players[i].isCurrentTurn) {
      currentPlayerIndex = i;
      break;
    }
  }

  players[currentPlayerIndex].totalScore +=
    players[currentPlayerIndex].currentScore;

  // 점수 업데이트
  if (currentPlayerIndex === 0) {
    playerFirstOverall[0].innerText = players[currentPlayerIndex].totalScore;
  } else {
    playerSecondOverall[0].innerText = players[currentPlayerIndex].totalScore;
  }

  // 종합 점수가 50점 넘으면 승리 선언
  if (players[currentPlayerIndex].totalScore >= 50) {
    console.log(`플레이어 ${currentPlayerIndex + 1} 가 승리하였습니다.`);
    resetGame();
  }

  switchTurn(currentPlayerIndex);
};

//주사위 버튼에 클릭 이벤트 리스너 추가
ralldice[0].addEventListener("click", handleRallDice);
holdscore[0].addEventListener("click", handleHoldButton);

//게임을 리셋시키는 함수
function resetGame() {
  players = [
    { currentScore: 0, totalScore: 0, isCurrentTurn: true },
    { currentScore: 0, totalScore: 0, isCurrentTurn: false },
  ];

  // 모든 배경색 제거 및 첫 번째 플레이어 배경색 추가
  playerFirstDiv.classList.add("active");
  playerSecondDiv.classList.remove("active");

  playerFirstScore[0].innerText = "00";
  playerSecondScore[0].innerText = "00";
  playerFirstOverall[0].innerText = "00";
  playerSecondOverall[0].innerText = "00";
}

// 턴을 바꾸는 함수
function switchTurn(currentPlayerIndex) {
  // 현재스코어 초기화.
  players[currentPlayerIndex].currentScore = 0;
  players[currentPlayerIndex].isCurrentTurn = false;
  players[(currentPlayerIndex + 1) % 2].isCurrentTurn = true;

  if (currentPlayerIndex === 0) {
    playerFirstDiv.classList.remove("active");
    playerSecondDiv.classList.add("active");
    playerFirstScore[0].innerText = "00";
  } else {
    playerSecondDiv.classList.remove("active");
    playerFirstDiv.classList.add("active");
    playerSecondScore[0].innerText = "00";
  }
}
