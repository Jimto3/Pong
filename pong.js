let speed = 8;
let player1 = 0;
let player2 = 0;
let x = Math.random();
while (x < 0.6) {
    x = Math.random();
}
let y = Math.sqrt(1 - x ** 2);
x *= -1;
//pos = L or R
const winner = document.getElementById("winner");
const score = document.getElementById("score");
const leftPaddle = document.getElementById("left");
const rightPaddle = document.getElementById("right");
const ball = document.getElementById("ball");
const size = ball.offsetWidth;

function createPaddle(paddle) {
    window.addEventListener("keydown", (event) => {
        if (paddle == leftPaddle) {
            if (event.code == "KeyW" && paddle.offsetTop > 0) {
                paddle.style.top = paddle.offsetTop - 20 - speed * 2 + "px";
            } else if (
                event.code == "KeyS" &&
                paddle.offsetTop + paddle.offsetHeight < window.innerHeight
            ) {
                paddle.style.top = paddle.offsetTop + speed * 2 + "px";
            }
        }
        if (paddle == rightPaddle) {
            if (event.code == "ArrowUp" && paddle.offsetTop > 0) {
                paddle.style.top = paddle.offsetTop - 20 - speed * 2 + "px";
            } else if (
                event.code == "ArrowDown" &&
                paddle.offsetTop + paddle.offsetHeight < window.innerHeight
            ) {
                paddle.style.top = paddle.offsetTop + speed * 2 + "px";
            }
        }
    });
}

function CreateBall() {
    ball.style.top = (window.innerHeight - size) / 2 + "px";
    ball.style.left = window.innerWidth - leftPaddle.offsetWidth * 8 + "px";
    // ball.style.top = "200px";
    // ball.style.left = "600px";
    const update = setInterval(() => {
        if (
            ball.offsetTop + size >= window.innerHeight ||
            ball.offsetTop <= 0
        ) {
            y *= -1;
        }
        if (ball.offsetLeft + size >= window.innerWidth) {
            player1 += 1;
            displayScore(1);
            clearInterval(update);
        } else if (ball.offsetLeft <= 0) {
            player2 += 1;
            displayScore(2);
            clearInterval(update);
        }

        collisionCheck(ball);

        ball.style.left = ball.offsetLeft + x * speed + "px";
        ball.style.top = ball.offsetTop + y * speed + "px";
    }, 25);
}

function collisionCheck() {
    if (
        ball.offsetTop + ball.offsetHeight >= leftPaddle.offsetTop &&
        ball.offsetTop <= leftPaddle.offsetTop + leftPaddle.offsetHeight
    ) {
        if (
            ball.offsetLeft >= leftPaddle.offsetLeft &&
            ball.offsetLeft <= leftPaddle.offsetLeft + leftPaddle.offsetWidth
        ) {
            speed += 2;
            x *= -1;
        }
    }
    if (
        ball.offsetTop + ball.offsetHeight >= rightPaddle.offsetTop &&
        ball.offsetTop <= rightPaddle.offsetTop + rightPaddle.offsetHeight
    ) {
        if (
            ball.offsetLeft + ball.offsetWidth >= rightPaddle.offsetLeft &&
            ball.offsetLeft + ball.offsetWidth <=
                rightPaddle.offsetLeft + rightPaddle.offsetWidth
        ) {
            speed += 2;
            x *= -1;
        }
    }
}

function displayScore(win) {
    ball.style.visibility = "hidden";
    ball.style.top = (window.innerHeight - size) / 2 + "px";
    ball.style.left = window.innerWidth - leftPaddle.offsetWidth * 8 + "px";
    score.innerHTML = `${player1} - ${player2}`;
    score.style.visibility = "visible";
    if (win) {
        winner.innerHTML = `Player${win} Wins!`;
        winner.style.visibility = "visible";
    }
    speed = 8;
    x = Math.random();
    while (x < 0.6) {
        x = Math.random();
    }
    y = Math.sqrt(1 - x ** 2);
    x *= -1;
    setTimeout(() => {
        score.style.visibility = "hidden";
        winner.style.visibility = "hidden";
        ball.style.visibility = "visible";
        createPaddle(leftPaddle);
        createPaddle(rightPaddle);
        CreateBall();
    }, 2000);
}

displayScore();
