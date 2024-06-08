let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let box = 32;
let move = ""
let score = 0
let sound = true

//imeges
let ground = new Image();
ground.src = "images/ground.jpg"

let food = new Image();
food.src = "images/food.png"

// sound effect
let dead = new Audio();
dead.src = "audio/dead.mp3"

let up = new Audio();
up.src = "audio/up.mp3"

let down = new Audio();
down.src = "audio/down.mp3"

let right = new Audio();
right.src = "audio/right.mp3"

let left = new Audio();
left.src = "audio/left.mp3"
let eat = new Audio();
eat.src = "audio/eat.mp3"




// game over obj
let gameOver = new Image();
gameOver.src = "images/gameover.png"
//snake array
let snake = [];
snake[0] = {
    x: 4 * 32,
    y: 7 * 32
}

//food object

//event
document.addEventListener("keydown", function (event) {

    if (event.keyCode == 37 && move != "right") {
        if (sound) {
            left.play()
        }

        move = "left";

    } else if (event.keyCode == 38 && move != "down") {
        if (sound) {
            down.play()
        }

        move = "top";
    }
    else if (event.keyCode == 39 && move != "left") {
        if (sound) {
            right.play()
        }


        move = "right"
    } else if (event.keyCode == 40 && move != "top") {
        if (sound) {
            down.play()
        }
        move = "down"
    }
    console.log(move)
}
)

let foodi = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}
function draw() {
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = (i == 0) ? "black" : "orange";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    //oldoposition
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (move == "left") {
        snakeX -= box;
    } else if (move == "top") {
        snakeY -= box
    } else if (move == "right") {
        snakeX += box
    } else if (move == "down") {
        snakeY += box
    }
    // snakje new head 
    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    if (snakeX == foodi.x && snakeY == foodi.y) {
        eat.play()
        score++;
        foodi.x = Math.floor(Math.random() * 17 + 1) * box,
            foodi.y = Math.floor(Math.random() * 15 + 3) * box
    } else {
        +
            snake.pop();
    }
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (newHead.x == array[i].x && newHead.y == array[i].y)
                return true;
        }
        return false
    }
    function dragoan() {
        var dragoan1 = document.getElementById("dragon1")
        var dragaon2 = document.getElementById("dragon2")
        dragoan1.style.display = "block";
        dragaon2.style.display = "block";
    }
    // game over logic
    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17 || collision(newHead, snake)) {
        dragoan()
        dead.play()
        clearInterval(game)
        ctx.drawImage(gameOver, 0, 0, 512, 371, canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200)
        sound = false
    }
    snake.unshift(newHead)
    ctx.fillStyle = "#ffffff"
    ctx.font = "40px impact"
    ctx.fillText(score, box * 2.2, box * 1.6)
    ctx.drawImage(food, 0, 0, box, box, foodi.x, foodi.y, box, box)

}
function loop() {
    ctx.drawImage(ground, 0, 0, 608, 608, 0, 0, 608, 608)
    draw();
}
let game = setInterval(loop, 200)