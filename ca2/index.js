
let canvas;
let context;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;


let fpsInterval = 1000 / 30; 
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
    casting:"no",
    moving:false,
    direction:null,
    time_until_rearm:180,
}
let playerImage = new Image();
let backgroundImage = new Image();
let enemyImage = new Image();
let disarmImage = new Image();

// for enemy
let enemy = {
    xPos: 200,
    yPos: 100,
    width:30,
    height: 50,
    xChange: 0,
    yChange:0,
    frameX:0,
    frameY:0,
    casting:"no",
    direction:0,
    time_until_rearm:180,
}
let objects = [player,enemy];
let fire_spells = []
document.addEventListener("DOMContentLoaded", init, false)

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    playerImage.src = "Wizard_Pack/idle.png";
    backgroundImage.src = "Dungeon_Tileset.png";
    enemyImage.src = "death.png";
    disarmImage.src = "disarm.png"
    window.addEventListener("keydown",activate,false);
    window.addEventListener("keyup",deactivate,false);
    draw();
}
function draw(){
    window.requestAnimationFrame(draw);
    controle_frame_rate();
    context.clearRect(0,0,canvas.width,canvas.height);
    display_background();
    context.drawImage(playerImage,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    if (!(enemy.casting === "dead")){
    context.drawImage(enemyImage,enemy.frameX,enemy.frameY,30,50, enemy.xPos, enemy.yPos,enemy.width,enemy.height);
    }
    calculate_pos();
    create_boundries();
    move_player();
    cast_spell();
    check_if_hit();
    move_enemy();
    //console.log(enemy.casting);
    console.log(player.casting);

}

function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
        player.moving = true;
        player.direction = "left";
    } else if (key === "ArrowRight") {
        moveRight = true;
        player.moving = true;
        player.direction = "right";
    } else if (key === "ArrowUp") {
        moveUp = true;
        player.moving = true;
        player.direction = "up";
    } else if (key === "ArrowDown") {
        moveDown = true;
        player.moving = true;
        player.direction = "down";
    } else if (key === "e"){
        if(player.casting === "no"){
        player.casting = "disarm";}
    } else if (key === "f"){
        if(player.casting === "no"){
        player.casting = "fire";}
    }
    else if (key === "d"){
        if(player.casting === "no"){
        player.casting = "defend";}
    }

}
function display_background(){
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
}

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
        player.moving = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
        player.moving = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
        player.moving = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
        player.moving = false;
    } else if(key === "e"){
        if(!(player.casting === "disarmed")){
        player.casting = "no";}
    }
    else if(key === "f"){
        if(!(player.casting === "disarmed")){
        player.casting = "no";}
    }
    else if(key === "d"){
        if(!(player.casting === "disarmed")){
        player.casting = "no";}
    }
}
function move_player(){
    //if (!(player.casting === "no")){return} 
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

function controle_frame_rate(){
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);
}
function calculate_pos(){
    player.xChange = player.xChange * 0.9;// friction
    player.yChange = player.yChange * 0.9;//friction
    player.xPos += player.xChange;
    player.yPos += player.yChange;
}

function cast_spell(){
    move_spells();
    if (player.casting === "disarm"){
        if (player.direction === "left"){
            playerImage.src = "Wizard_Pack/Attack2_left.png";
            player.frameY = 0;
            player.frameX = (player.frameX + 231)%1848;
            cast_disarm("left");
    }
    else if (player.direction === "up"){
            playerImage.src = "Wizard_Pack/Attack2_up.png";
            player.frameX = 0;
            player.frameY = (player.frameY + 231)%1848;
            cast_disarm("up");
    }
    else if (player.direction === "down"){
            playerImage.src = "Wizard_Pack/Attack2_down.png";
            player.frameX = 0;
            player.frameY = (player.frameY + 231)%1848;
            cast_disarm("down");
    }
    else{
    playerImage.src = "Wizard_Pack/Attack2.png";
    player.frameY = 0;
    player.frameX = (player.frameX + 231)%1848;
    cast_disarm("right");
}
}
if (player.casting === "no" && player.moving === false){
    player.frameX = 0;
    player.frameY = 0;
    playerImage.src = "Wizard_Pack/idle.png";
}
if(player.casting == "fire"){
    // pretty ineficent way to do this if you ask me, must fix later reuses code
    if (player.direction === "left"){
            playerImage.src = "Wizard_Pack/Attack2_left.png";
            player.frameY = 0;
            player.frameX = (player.frameX + 231)%1848;
            cast_fire("left");
    }
    else if (player.direction === "up"){
            playerImage.src = "Wizard_Pack/Attack2_up.png";
            player.frameX = 0;
            player.frameY = (player.frameY + 231)%1848;
            cast_fire("up");
    }
    else if (player.direction === "down"){
            playerImage.src = "Wizard_Pack/Attack2_down.png";
            player.frameX = 0;
            player.frameY = (player.frameY + 231)%1848;
            cast_fire("down");
    }
    else{
    playerImage.src = "Wizard_Pack/Attack2.png";
    player.frameY = 0;
    player.frameX = (player.frameX + 231)%1848;
    cast_fire("right");
    }

}
if(player.casting === "defend"){
    defend_player();
}
}
function create_boundries(){
    //stopping momentum if hits wall
    if(!(((-40<player.xPos) && (player.xPos<400)))){player.xChange = 0;}
    if(!(((-30<player.yPos) && (player.yPos<200)))){player.yChange = 0;}
}
function cast_disarm(dir){
    if(dir === "left"){
        //console.log("player",player.yPos)
        //console.log("enemy",enemy.yPos)
        for(let x of objects){
            if ((x.xPos< player.xPos)&&(x.yPos-80 < player.yPos )){
                if((x.yPos>player.yPos)){
                x.casting = "disarmed";
                //console.log("hit, sir a very palpible hit.");
            }
            }
}
    }
if(dir === "right"){
        //console.log("player",player.yPos)
        //console.log("enemy",enemy.yPos)
        for(let x of objects){
            if ((x.xPos> player.xPos)&&(x.yPos-80 < player.yPos )){
                if((x.yPos>player.yPos)){
                x.casting = "disarmed";
                //console.log("hit, sir a very palpible hit.");
            }
            }
}
    }
    if(dir === "down"){
        //console.log("player",player.yPos)
        //console.log("enemy",enemy.yPos)
        for(let x of objects){
            if ((x.yPos> player.yPos)&&(x.xPos-80 < player.xPos )){
                if((x.xPos>player.xPos)){
                x.casting = "disarmed";
                //console.log("hit, sir a very palpible hit.");
            }
            }
}
    }
    if(dir === "up"){
        //console.log("player",player.yPos)
        //console.log("enemy",enemy.yPos)
        for(let x of objects){
            if ((x.yPos< player.yPos)&&(x.xPos-80 < player.xPos )){
                if((x.xPos>player.xPos)){
                x.casting = "disarmed";
                //console.log("hit, sir a very palpible hit.");
            }
            }
}
    }
}

function cast_fire(dir){
    // dir is the direction you want the cast to be in
    if(dir == "left"){
        let fire_spell = {
            direction:"left",
            xPos:player.xPos,
            yPos:player.yPos,
        }
        fire_spells.push(fire_spell);

    }
    if(dir == "right"){
        let fire_spell = {
            direction:"right",
            xPos:player.xPos,
            yPos:player.yPos,
        }
        fire_spells.push(fire_spell);

    }
    if(dir == "up"){
        let fire_spell = {
            direction:"up",
            xPos:player.xPos,
            yPos:player.yPos,
        }
        fire_spells.push(fire_spell);

    }
    if(dir == "down"){
        let fire_spell = {
            direction:"down",
            xPos:player.xPos,
            yPos:player.yPos,
        }
        fire_spells.push(fire_spell);

    }

}
function move_spells(){
    for(let fire of fire_spells){
        if(fire.direction == "left"){
            fire.xPos -= 10;
            context.fillStyle = "orange";
            context.fillRect(fire.xPos,fire.yPos+50,20,10);
            if(((enemy.xPos<fire.xPos)&&(fire.xPos< enemy.xPos+20))&&((enemy.yPos<fire.yPos+50)&&(fire.yPos+50< enemy.yPos+50))){
                enemy.casting = "dead";
            }
        }
        else if(fire.direction == "right"){
            fire.xPos += 10;
            context.fillStyle = "orange";
            context.fillRect(fire.xPos+100,fire.yPos+50,20,10);
            if(((enemy.xPos<fire.xPos)&&(fire.xPos< enemy.xPos+20))&&((enemy.yPos<fire.yPos+50)&&(fire.yPos+50< enemy.yPos+50))){
                enemy.casting = "dead";
            }
        }
        else if(fire.direction == "up"){
            fire.yPos -= 10;
            context.fillStyle = "orange";
            context.fillRect(fire.xPos+50,fire.yPos+50,10,20);
            if(((enemy.xPos<fire.xPos+50)&&(fire.xPos+50< enemy.xPos+20))&&((enemy.yPos<fire.yPos+50)&&(fire.yPos+50< enemy.yPos+50))){
                enemy.casting = "dead";
            }
        }
        else if(fire.direction == "down"){
            fire.yPos += 10;
            context.fillStyle = "orange";
            context.fillRect(fire.xPos+80,fire.yPos+50,10,20);
            if(((enemy.xPos<fire.xPos+80)&&(fire.xPos+80< enemy.xPos+20))&&((enemy.yPos<fire.yPos+50)&&(fire.yPos+50< enemy.yPos+50))){
                enemy.casting = "dead";
            }
        }
    }
}
function defend_player(){
    playerImage.src = "Wizard_Pack/Attack1.png";
    player.frameY = 0;
    player.frameX = (player.frameX + 231)%1848;
}

function move_enemy(){
    let time = Date.now();
    
    if (time%10 === 0){
        enemy.direction = Math.floor(Math.random() * 4);
    }
    if((enemy.direction === 0)&&(enemy.xPos > 0)){
        enemy.xPos -= 1
    }
    else if((enemy.direction === 1)&&(enemy.xPos < canvas.width-100)){
        enemy.xPos += 1
    }
    else if((enemy.direction === 2)&&(enemy.yPos < canvas.height-100)){
        enemy.yPos += 1
    }
    else if((enemy.direction === 3)&&(enemy.yPos > 0)){
        enemy.yPos -= 1
    }
}
function check_if_hit(){
    if(!(player.casting==="defend")){
        enemy_cast();
    }
    for(let x of objects){
        if (x.casting === "disarmed"){
            if(x.time_until_rearm===0){
            x.casting = "no";
            x.time_until_rearm = 180;
        }
            x.time_until_rearm -= 1;
            console.log(player.time_until_rearm);
            context.drawImage(disarmImage,0,0,10,10, enemy.xPos, enemy.yPos-10,30,30);
        }
    }

}
function enemy_cast(){
    if(!(enemy.casting === "disarmed")){
    if((player.yPos < enemy.yPos)&&(player.yPos > enemy.yPos-100)){
        if((enemy.direction === 0)&&(player.xPos<enemy.xPos)){
            context.drawImage(disarmImage,0,0,10,10, enemy.xPos-20, enemy.yPos-10,30,30);
            context.drawImage(disarmImage,0,0,10,10, enemy.xPos-40, enemy.yPos-10,30,30);
            playerImage.src = "Wizard_Pack/Hit.png"
            player.casting = "disarmed";
            player.frameY = 0;
            player.frameX = (player.frameX + 231)%1848;
            if(player.xPos>-50){
                player.xPos -= 2
            }
        }
        else if((enemy.direction === 1)&&(player.xPos>enemy.xPos)){
            context.drawImage(disarmImage,0,0,10,10, enemy.xPos, enemy.yPos-10,30,30);
            playerImage.src = "Wizard_Pack/Hit_Right.png"
            player.frameY = 0;
            player.casting = "disarmed";
            player.frameX = (player.frameX + 231)%1848;
            if(player.xPos<canvas.width-100){
                player.xPos += 2
            }
        }

    }
    // new
    else if((player.xPos < enemy.xPos)&&(player.xPos > enemy.xPos-100)){
        if((enemy.direction === 2)&&(player.yPos>enemy.yPos)){
            context.drawImage(disarmImage,0,0,10,10, enemy.xPos, enemy.yPos-10,30,30);
            playerImage.src = "Wizard_Pack/Hit_down.png";
            player.frameX = 0;
            player.casting = "disarmed";
            player.frameY = (player.frameY + 231)%1848;
            if(player.yPos<canvas.height-100){
                player.yPos += 2
            }

        }
        else if((enemy.direction === 3)&&(player.yPos< enemy.yPos)){
            context.drawImage(disarmImage,0,0,10,10, enemy.xPos, enemy.yPos-10,30,30);
            playerImage.src = "Wizard_Pack/Hit_up.png";
            player.frameX = 0;
            player.casting = "disarmed";
            player.frameY = (player.frameY + 231)%1848;
            if(player.yPos>-50){
                player.yPos -= 2
            }

        }
    }
}
}

