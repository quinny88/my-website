const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Create the pong paddle
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 5;

// Create the ball
const ballSize = 10;
const ballSpeed = 4;

let playerPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

let aiPaddle = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

let ball = {
    x: canvas.width / 2 - ballSize / 2,
    y: canvas.height / 2 - ballSize / 2,
    size: ballSize,
    dx: ballSpeed,
    dy: ballSpeed
};

function drawPaddle(paddle) {
    context.fillStyle = '#fff';
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    context.fillStyle = '#fff';
    context.fillRect(ball.x, ball.y, ball.size, ball.size);
}

function movePaddle(paddle) {
    paddle.y += paddle.dy;

    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y > canvas.height - paddle.height) paddle.y = canvas.height - paddle.height;
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y <= 0 || ball.y >= canvas.height - ball.size) ball.dy *= -1;

    if (ball.x <= playerPaddle.x + playerPaddle.width && ball.y >= playerPaddle.y && ball.y <= playerPaddle.y + playerPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x >= aiPaddle.x - ball.size && ball.y >= aiPaddle.y && ball.y <= aiPaddle.y + aiPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2 - ball.size / 2;
        ball.y = canvas.height / 2 - ball.size / 2;
        ball.dx *= -1;
    }
}

function update() {
    movePaddle(playerPaddle);
    movePaddle(aiPaddle);
    moveBall();
    aiPaddle.y = ball.y - aiPaddle.height / 2;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(playerPaddle);
    drawPaddle(aiPaddle);
    drawBall();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function keyDownHandler(e) {
    if (e.key === 'ArrowUp') playerPaddle.dy = -paddleSpeed;
    if (e.key === 'ArrowDown') playerPaddle.dy = paddleSpeed;
}

function keyUpHandler(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') playerPaddle.dy = 0;
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

gameLoop();
