let canvas;
let context;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let fpsInterval = 1000 / 30; 
let now;
let then = Date.now();



let player = {
    xPos:250,
    yPos:250,
    width: 10,
    height: 10,
    xChange: 0,
    yChange:0,
}

document.addEventListener("DOMContentLoaded", init, false)

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    context.fillStyle = "yellow";
    context.fillRect(250,150,10,10);
    window.addEventListener("keydown",activate,false);
    window.addEventListener("keyup",deactivate,false);
    draw();
}
function draw(){
    window.requestAnimationFrame(draw);
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = "#87cefa";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "yellow";
    context.fillRect(player.xPos,player.yPos,player.height,player.width);
    player.xChange = player.xChange * 0.9;// friction
    player.yChange = player.yChange * 0.9;//friction
    player.xPos += player.xChange;
    player.yPos += player.yChange;
    if(((0<player.xPos) && (player.xPos<500))){
        if(((0<player.yPos) && (player.yPos<320))){
    if(moveLeft){
        player.xChange -= 0.5;
    }
    if(moveRight){
        player.xChange += 0.5;
    }
    if(moveUp){
        player.yChange -= 0.5
    }
    if(moveDown){
        player.yChange += 0.5
    }
}
else{
    player.yChange = player.yChange*-1
}
    }
else{
    player.xChange = player.xChange*-1
}
}

function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    }
}

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    }
}