const cnv = document.getElementById("game");
const ctx = cnv.getContext('2d');

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let game;

const box = 32;
let score = 0;

let arena = {
    x: 1,
	y: 3,
	width: 17,
	height: 15
}

let food = {
	x: 0,
	y: 0
};

let snake = [];
snake[0] = {
	x: (Math.floor(arena.width / 2) + arena.x) * box,
	y: (Math.floor(arena.height / 2) + arena.y) * box
}

document.addEventListener("keydown", direction);

let dir;
let nextDir;

function direction(event) {
	if (event.keyCode == 37 && dir != "right") nextDir = "left";
	else if (event.keyCode == 38 && dir != "down") nextDir = "up";
	else if (event.keyCode == 39 && dir != "left") nextDir = "right";
	else if (event.keyCode == 40 && dir != "up") nextDir = "down";
}

function refreshFood() {
	while (true) {
		food = {
			x: Math.floor(Math.random() * arena.width + arena.x) * box,
			y: Math.floor(Math.random() * arena.height + arena.y) * box
		};
		if (! checkObjectSamePlace(food, snake)) break;
	}
}

function checkObjectSamePlace(object, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (object.x == arr[i].x && object.y == arr[i].y) {
			return true;
		}	
	}
	return false;
}

function eatTail(head, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (head.x == arr[i].x && head.y == arr[i].y) {
			gameOver();
			break;
		}	
	}
}

function gameOver() {
	clearInterval(game);
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y);

	for (let i = 0; i < snake.length; i++) {
		if (i == 0) {
			ctx.fillStyle = "yellow";
		} else {
			ctx.fillStyle = "green";
		}
		ctx.fillRect(snake[i].x, snake[i].y, box ,box); 		
	}

	ctx.fillStyle = "white";
	ctx.font = "40px Arial";
	ctx.fillText(score, box * 2.4, box * 1.6);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX == food.x && snakeY == food.y) {
		score++;
		refreshFood();
	} else {
		snake.pop();
	}

	if ((snakeX < arena.x * box) ||
		(snakeX > (arena.x + arena.width - 1) * box) ||
		(snakeY < arena.y * box) ||
		(snakeY > (arena.y + arena.height - 1) * box)) 
	{
		gameOver();
	}
	dir = nextDir;

	if (dir == "left") snakeX -= box;
	if (dir == "right") snakeX += box;
	if (dir == "up") snakeY -= box;
	if (dir == "down") snakeY += box;
	
	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}

function gameStart() {
	refreshFood();
	game = setInterval(drawGame, 100);
}

gameStart();

