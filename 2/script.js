// 获取画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 获取按钮元素
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');

// 设置画布大小
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

// 定义游戏参数
const blockSize = 20;
let snake = [
  { x: 10, y: 10 }
];
let direction = 'right';
let food = {
  x: Math.floor(Math.random() * (canvas.width / blockSize)),
  y: Math.floor(Math.random() * (canvas.height / blockSize))
};
let score = 0;
let isGameRunning = false;
let gameLoopId;
// 降低蛇的移动速度，设置每 200 毫秒移动一次
const gameSpeed = 200; 

// 绘制蛇
function drawSnake() {
  ctx.fillStyle = '#00FF00';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
  });
}

// 绘制食物
function drawFood() {
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

// 绘制分数
function drawScore() {
  ctx.font = '24px Orbitron';
  ctx.fillStyle = '#00FF00';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// 移动蛇
function moveSnake() {
  let head = { ...snake[0] };
  switch (direction) {
    case 'right':
      head.x++;
      break;
    case 'left':
      head.x--;
      break;
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
  }
  snake.unshift(head);

  // 检查是否吃到食物
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvas.width / blockSize)),
      y: Math.floor(Math.random() * (canvas.height / blockSize))
    };
  } else {
    snake.pop();
  }
}

// 检查碰撞
function checkCollision() {
  let head = snake[0];
  // 检查是否撞到墙壁
  if (head.x < 0 || head.x >= canvas.width / blockSize || head.y < 0 || head.y >= canvas.height / blockSize) {
    return true;
  }
  // 检查是否撞到自己
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// 游戏循环
function gameLoop() {
  if (isGameRunning) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
    moveSnake();
    if (checkCollision()) {
      endGame();
      return;
    }
    gameLoopId = setTimeout(gameLoop, gameSpeed);
  }
}

// 开始游戏
function startGame() {
  if (!isGameRunning) {
    isGameRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    gameLoop();
  }
}

// 暂停游戏
function pauseGame() {
  if (isGameRunning) {
    isGameRunning = false;
    clearTimeout(gameLoopId);
    startButton.disabled = false;
    pauseButton.disabled = true;
  }
}

// 结束游戏
function endGame() {
  isGameRunning = false;
  clearTimeout(gameLoopId);
  alert(`游戏结束！你的分数是: ${score}`);
  resetGame();
  startButton.disabled = false;
  pauseButton.disabled = true;
}

// 重置游戏
function resetGame() {
  snake = [
    { x: 10, y: 10 }
  ];
  direction = 'right';
  food = {
    x: Math.floor(Math.random() * (canvas.width / blockSize)),
    y: Math.floor(Math.random() * (canvas.height / blockSize))
  };
  score = 0;
}

// 处理触控事件
canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0 && direction!== 'right') {
      direction = 'left';
    } else if (xDiff < 0 && direction!== 'left') {
      direction = 'right';
    }
  } else {
    if (yDiff > 0 && direction!== 'down') {
      direction = 'up';
    } else if (yDiff < 0 && direction!== 'up') {
      direction = 'down';
    }
  }

  xDown = null;
  yDown = null;
}

// 绑定按钮事件
startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
pauseButton.disabled = true;