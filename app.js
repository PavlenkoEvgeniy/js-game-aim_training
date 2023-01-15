const buttonStart = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('.board')

const COLORS = ['#d574eb', '#eb9074', '#ddeb6e', '#6e72eb', '#78eb6e', '#eb6e7d', '#e9eb6e'];

let time = 0;
let score = 0;

buttonStart.addEventListener('click', function (event) {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', function (event) {
  if (event.target.classList.contains('time-btn')) {
    screens[1].classList.add('up');
    startGame(event);
  }
});

// //DEBUG
// time = 11;
// startGame();

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    event.target.remove();
    createRandomCircle();
    score++;
  }
});

function startGame(event) {
  
  createRandomCircle();
  time = parseInt(event.target.getAttribute('data-time'));
  timeElement.innerHTML = `00:${time}`;

  setInterval(() => {
    time--
    if (time < 10) {
      timeElement.innerHTML = `00:0${time}`
    } else {
      timeElement.innerHTML = `00:${time}`
    }

    if (time === 0) {
      stopGame();
    }
  }, 1000);
}

function stopGame() {
  timeElement.parentNode.classList.add('hide');
  board.innerHTML = `<div class="score">Ваш счет: <span class="primary">${score}</span></div>`;
};

function createRandomCircle() {
  const boardProperties = board.getClientRects();
  const width = boardProperties[0].width;
  const height = boardProperties[0].height;
  let size = randomNumbers(1, 60);

  if (size < 10) {
    size += 10;
  }

  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${randomNumbers(size, (width - size))}px`;
  circle.style.left = `${randomNumbers(size, (width - size))}px`;
  circle.style.background = `${COLORS[randomNumbers(0, COLORS.length -1)]}`;

  board.append(circle);
}

function randomNumbers(min, max) {
  const result = Math.ceil(Math.random() * (max - min));
  return result;
};


