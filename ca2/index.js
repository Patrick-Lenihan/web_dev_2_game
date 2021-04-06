let canvas;
let context;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let fpsInterval = 1000 / 60; 
let now;
let then = Date.now();

let tilesPerRow = 6;
let tileSize = 16;
let background = [
    [45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,45],
    [ 45,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47, 45],
    [ 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45]]

let player = {
    xPos:100,
    yPos:100,
    width: 10,
    height: 10,
    xChange: 0,
    yChange:0,
    frameX:0,
    frameY:0,
}
let playerImage = new Image();
let backgroundImage = new Image();

document.addEventListener("DOMContentLoaded", init, false)

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    //context.fillStyle = "yellow";
    //context.fillRect(250,150,10,10);
    playerImage.src = "Wizard_Pack/idle.png";
    backgroundImage.src = "Dungeon_Tileset.png";
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
    //context.fillStyle = "#87cefa";
    //context.fillRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < 20; r += 1) {
        for (let c = 0; c < 32; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }
    //context.fillStyle = "yellow";
    //context.fillRect(player.xPos,player.yPos,player.height,player.width);
    context.drawImage(playerImage,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    player.xChange = player.xChange * 0.9;// friction
    player.yChange = player.yChange * 0.9;//friction
    player.xPos += player.xChange;
    player.yPos += player.yChange;
    //stopping momentum if hits wall
    if(!(((-40<player.xPos) && (player.xPos<400)))){player.xChange = 0;}
    if(!(((-30<player.yPos) && (player.yPos<200)))){player.yChange = 0;}
    if(moveLeft && (-40<player.xPos)){
        playerImage.src = "Wizard_Pack/Run_Left.png";
        player.frameY = 0;
        player.frameX = (player.frameX + 231)%1848;
        player.xChange -= 1;
    }
    if(moveRight&&(player.xPos<400)){
        player.xChange += 1;
        player.frameY = 0;
        playerImage.src = "Wizard_Pack/Run.png";
        player.frameX = (player.frameX + 231)%1848;
    }
    if(moveUp && (-30<player.yPos)){
        playerImage.src = "Wizard_Pack/Run_up.png";
        player.frameX = 0;
        player.frameY = (player.frameY + 231)%1848;
        player.yChange -= 1;

    }
    if(moveDown && (player.yPos<200) ){
        playerImage.src = "Wizard_Pack/Run_down.png";
        player.frameX = 0;
        player.frameY = (player.frameY + 231)%1848;
        player.yChange += 1;
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