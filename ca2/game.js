
let canvas;
let context;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let game_over = false;
let fpsInterval = 1000 / 30; 
let level = 0;
let testLevel = 0;
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
    [ 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45]];
// setting up main player object
let player = {
    type:"player",
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
};
// all images must be loaded into there own vars so the client has them in good time durring the game
let playerImage = new Image();
let backgroundImage = new Image();
let enemyImage = new Image();
let disarmImage = new Image();
let chaserImage = new Image();
let playerImageLeft = new Image();
let playerImageRight = new Image();
let playerImageUp = new Image();
let playerImageDown = new Image();
let playerImageAttackLeft = new Image();
let playerImageAttackRight = new Image();
let playerImageAttackUp = new Image();
let playerImageAttackDown = new Image();
let playerImageDefend = new Image();
let playerImageHitLeft = new Image();
let playerImageHitRight = new Image();
let playerImageHitUp = new Image();
let playerImageHitDown = new Image();
let playerImageCur = 0;
let display_level = document.querySelector("#level");
let frames_since_start = 0;

// objects will be a list of all physical objects displayed on the screen (apart from background tileset and spells)
let objects = [player];
// this populates objects with all the enemys we need for level 0
populate_objects(1,0)
// fire_spells will store all the fire spell objects used for killing enemys 
let fire_spells = [];
document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    playerImage.src = "Wizard_Pack/Idle.png";
    playerImageLeft.src = "Wizard_Pack/Run_Left.png";
    playerImageUp.src = "Wizard_Pack/Run_up.png";
    playerImageRight.src = "Wizard_Pack/Run.png";
    playerImageDown.src = "Wizard_Pack/Run_down.png";
    playerImageAttackLeft.src = "Wizard_Pack/Attack2_left.png"
    playerImageAttackRight.src = "Wizard_Pack/Attack2.png"
    playerImageAttackUp.src = "Wizard_Pack/Attack2_up.png"
    playerImageAttackDown.src = "Wizard_Pack/Attack2_down.png"
    playerImageDefend.src = "Wizard_Pack/Attack1.png";
    playerImageHitLeft.src = "Wizard_Pack/Hit.png";
    playerImageHitRight.src = "Wizard_Pack/Hit_Right.png";
    playerImageHitUp.src = "Wizard_Pack/Hit_up.png";
    playerImageHitDown.src = "Wizard_Pack/Hit_down.png";
    backgroundImage.src = "Dungeon_Tileset.png";
    enemyImage.src = "death.png";
    disarmImage.src = "disarm.png";
    chaserImage.src = "death_scythe.png";
    window.addEventListener("keydown",activate,false);
    window.addEventListener("keyup",deactivate,false);
    draw();
}
function draw(){
    console.log(player.casting);
    //if the game is over freeze everything
    if(game_over===false){
    window.requestAnimationFrame(draw);
    }
    // recording the number of frames since the start of the game 
    //useful for when we don't want an enemy to spawn and then kill the player imediately
    frames_since_start += 1
    controle_frame_rate();
    context.clearRect(0,0,canvas.width,canvas.height);
    display_background();
    display_player();
    // draws all instances of enemy and chaser
    for (let x = 0; x < objects.length; x += 1){
        if (!(objects[x].casting === "dead")){
            if (objects[x].type === "enemy"){
                context.drawImage(enemyImage,objects[x].frameX,objects[x].frameY,30,50, objects[x].xPos, objects[x].yPos,objects[x].width,objects[x].height);
            }
            else if(objects[x].type === "chaser"){
                context.drawImage(chaserImage,objects[x].frameX,objects[x].frameY,40,50, objects[x].xPos, objects[x].yPos,objects[x].width,objects[x].height);
            }
        }
        else{
            objects.splice(x,1);
        }

    }
    calculate_pos();
    create_boundries();
    move_player();
    cast_spell();
    check_if_hit();
    move_enemy();
    move_chasers();
    if(game_over=== true){
        // learned how to use fillText at https://www.w3schools.com/graphics/canvas_text.asp
    context.fillStyle ="red"
    context.font = "30px Arial"; 
    context.fillText("GAME OVER", 150, 150);
    context.fillText("click c to continue", 140, 200);
    }
    check_level_up();

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
    else if (key === "a"){
        if(player.casting === "no"){
        player.casting = "teleport";}
    }
    else if ((key === "c")&&(game_over = true)){
        // if you press c you restart the game
        game_over = false;
        objects = [player];
        level = 0;
        draw();
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
    else if(key === "a"){
        if(!(player.casting === "disarmed")){
        player.casting = "no";}
    }
}
function move_player(){
    // this function contains the running animation for the player and the moving logic
    if(moveLeft && (-40<player.xPos)){
        playerImageCur= 2;
        if(player.casting==="teleport"){player.xChange -= 14;}
        player.frameY = 0;
        player.frameX = (player.frameX + 231)%1848;
        player.xChange -= 1;
    }
    if(moveRight&&(player.xPos<400)){
        if(player.casting==="teleport"){player.xChange += 14;}
        player.xChange += 1;
        player.frameY = 0;
        playerImageCur = 1;
        player.frameX = (player.frameX + 231)%1848;
    }
    if(moveUp && (-30<player.yPos)){
        if(player.casting==="teleport"){player.yChange -= 14;}
        playerImageCur = 3;
        player.frameX = 0;
        player.frameY = (player.frameY + 231)%1848;
        player.yChange -= 1;

    }
    if(moveDown && (player.yPos<200) ){
        if(player.casting==="teleport"){player.yChange += 14;}
        playerImageCur = 4
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
    // physics
    player.xChange = player.xChange * 0.9;// friction
    player.yChange = player.yChange * 0.9;//friction
    player.xPos += player.xChange;
    player.yPos += player.yChange;
}

function cast_spell(){
    // moves all the fire spells
    move_spells();
    // logic for player casting disarms
    if (player.casting === "disarm"){
        if (player.direction === "left"){
            playerImageCur = 5;
            player.frameY = 0;
            player.frameX = (player.frameX + 231)%1848;
            cast_disarm("left");
    }
    else if (player.direction === "up"){
            playerImageCur = 7;
            player.frameX = 0;
            player.frameY = (player.frameY + 231)%1848;
            cast_disarm("up");
    }
    else if (player.direction === "down"){
            playerImageCur = 8;
            player.frameX = 0;
            player.frameY = (player.frameY + 231)%1848;
            cast_disarm("down");
    }
    else{
    playerImageCur = 6;
    player.frameY = 0;
    player.frameX = (player.frameX + 231)%1848;
    cast_disarm("right");
}
}
if (player.casting === "no" && player.moving === false){
    player.frameX = 0;
    player.frameY = 0;
    playerImageCur = 0;
}
// casts fire spells
if(player.casting == "fire"){
    if (player.direction === "left"){
            playerImageCur = 5;
            player.frameY = 0;
            player.frameX = (player.frameX + 231)%1848;
            cast_fire("left");
    }
    else if (player.direction === "up"){
            playerImageCur = 7;
            player.frameX = 0;
            player.frameY = (player.frameY + 231)%1848;
            cast_fire("up");
    }
    else if (player.direction === "down"){
            playerImageCur = 8;
            player.frameX = 0;
            player.frameY = (player.frameY + 231)%1848;
            cast_fire("down");
    }
    else{
    playerImageCur = 6;
    player.frameY = 0;
    player.frameX = (player.frameX + 231)%1848;
    cast_fire("right");
    }

}
// checking if we should cast a defend spell
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
    //checking if sombody has been hit by a dissarm
    if(dir === "left"){
        for(let x of objects){
            if ((x.xPos< player.xPos)&&(x.yPos-80 < player.yPos )){
                if((x.yPos>player.yPos)){
                x.casting = "disarmed";
            }
            }
}
    }
if(dir === "right"){
        for(let x of objects){
            if ((x.xPos> player.xPos)&&(x.yPos-80 < player.yPos )){
                if((x.yPos>player.yPos)){
                x.casting = "disarmed";
            }
            }
}
    }
    if(dir === "down"){
        for(let x of objects){
            if ((x.yPos> player.yPos)&&(x.xPos-80 < player.xPos )){
                if((x.xPos>player.xPos)){
                x.casting = "disarmed";
            }
            }
}
    }
    if(dir === "up"){
        for(let x of objects){
            if ((x.yPos< player.yPos)&&(x.xPos-80 < player.xPos )){
                if((x.xPos>player.xPos)){
                x.casting = "disarmed";
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
        };
        fire_spells.push(fire_spell);

    }
    if(dir == "right"){
        let fire_spell = {
            direction:"right",
            xPos:player.xPos,
            yPos:player.yPos,
        };
        fire_spells.push(fire_spell);

    }
    if(dir == "up"){
        let fire_spell = {
            direction:"up",
            xPos:player.xPos,
            yPos:player.yPos,
        };
        fire_spells.push(fire_spell);

    }
    if(dir == "down"){
        let fire_spell = {
            direction:"down",
            xPos:player.xPos,
            yPos:player.yPos,
        };
        fire_spells.push(fire_spell);

    }

}
function move_spells(){
    // moving the fire spells and eliminating any enemy that it toutches 
    for(let fire of fire_spells){
        if(fire.direction == "left"){
            fire.xPos -= 10;
            context.fillStyle = "orange";
            context.fillRect(fire.xPos,fire.yPos+50,20,10);
            for(let item of objects){
                if(((item.xPos<fire.xPos)&&(fire.xPos< item.xPos+20))&&((item.yPos<fire.yPos+50)&&(fire.yPos+50< item.yPos+50))){
                    item.casting = "dead";
                }
            }
        }
        else if(fire.direction == "right"){
            fire.xPos += 10;
            context.fillStyle = "orange";
            context.fillRect(fire.xPos+100,fire.yPos+50,20,10);
            for(let item of objects){
                if(((item.xPos<fire.xPos)&&(fire.xPos< item.xPos+20))&&((item.yPos<fire.yPos+50)&&(fire.yPos+50< item.yPos+50))){
                    item.casting = "dead";
                }
            }
        }
        else if(fire.direction == "up"){
            fire.yPos -= 10;
            context.fillStyle = "orange";
            context.fillRect(fire.xPos+50,fire.yPos+50,10,20);
            for(let item of objects){
                if(((item.xPos<fire.xPos+50)&&(fire.xPos+50< item.xPos+20))&&((item.yPos<fire.yPos+50)&&(fire.yPos+50< item.yPos+50))){
                    item.casting = "dead";
                }
            }
        }
        else if(fire.direction == "down"){
            fire.yPos += 10;
            context.fillStyle = "orange";
            context.fillRect(fire.xPos+80,fire.yPos+50,10,20);
            for(let item of objects){
                if(((item.xPos<fire.xPos+80)&&(fire.xPos+80< item.xPos+20))&&((item.yPos<fire.yPos+50)&&(fire.yPos+50< item.yPos+50))){
                    item.casting = "dead";
                }
            }
        }
    }
}
function defend_player(){
    // casts the defence spell
    playerImageCur = 9;
    player.frameY = 0;
    player.frameX = (player.frameX + 231)%1848;
}

function move_enemy(){
    // moving the enemy that casts the disarms
    for(let item of objects){
        if(item.type === "enemy"){
            let time = Date.now();
            
            if (time%10 === 0){
                // moving the enemy in a random direction when time % 10 = 0 
                item.direction = Math.floor(Math.random() * 4);// learned about Math.random and Math.floor at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            }
            if((item.direction === 0)&&(item.xPos > 0)){
                item.xPos -= 1;
            }
            else if((item.direction === 1)&&(item.xPos < canvas.width-100)){
                item.xPos += 1;
            }
            else if((item.direction === 2)&&(item.yPos < canvas.height-100)){
                item.yPos += 1;
            }
            else if((item.direction === 3)&&(item.yPos > 0)){
                item.yPos -= 1;
            }
        }
    }
}
function check_if_hit(){
    // only alowing enemy to cast if you are not casting a defend spell
    if(!(player.casting==="defend")){
        enemy_cast();
    }
    // if disarmed calculate how long it will take to be rearmed again and if that time is 0 that return casting to normal
    for(let x of objects){
        if (x.casting === "disarmed"){
            if(x.time_until_rearm===0){
            x.casting = "no";
            x.time_until_rearm = 180;
        }
            x.time_until_rearm -= 1;
            context.drawImage(disarmImage,0,0,10,10, x.xPos, x.yPos-10,30,30);
        }
    }

}
function enemy_cast(){
    // controling enemys casting disarmes
    for (let item of objects) {
        if(item.type === "enemy")
        if(!(item.casting === "disarmed")){
        if((player.yPos < item.yPos)&&(player.yPos > item.yPos-100)){
            if((item.direction === 0)&&(player.xPos<item.xPos)){
                context.drawImage(disarmImage,0,0,10,10, item.xPos-20, item.yPos-10,30,30);
                context.drawImage(disarmImage,0,0,10,10, item.xPos-40, item.yPos-10,30,30);
                //playerImage.src = "Wizard_Pack/Hit.png";
                playerImageCur = 10;
                player.casting = "disarmed";
                player.frameY = 0;
                player.frameX = (player.frameX + 231)%1848;
                if(player.xPos>-50){
                    player.xPos -= 2;
                }
            }
            else if((item.direction === 1)&&(player.xPos>item.xPos)){
                context.drawImage(disarmImage,0,0,10,10, item.xPos, item.yPos-10,30,30);
                //playerImage.src = "Wizard_Pack/Hit_Right.png";
                playerImageCur = 11;
                player.frameY = 0;
                player.casting = "disarmed";
                player.frameX = (player.frameX + 231)%1848;
                if(player.xPos<canvas.width-100){
                    player.xPos += 2;
                }
            }

        }
        else if((player.xPos < item.xPos)&&(player.xPos > item.xPos-100)){
            if((item.direction === 2)&&(player.yPos>item.yPos)){
                context.drawImage(disarmImage,0,0,10,10, item.xPos, item.yPos-10,30,30);
                //playerImage.src = "Wizard_Pack/Hit_down.png";
                playerImageCur = 13
                player.frameX = 0;
                player.casting = "disarmed";
                player.frameY = (player.frameY + 231)%1848;
                if(player.yPos<canvas.height-100){
                    player.yPos += 2;
                }

            }
            else if((item.direction === 3)&&(player.yPos< item.yPos)){
                context.drawImage(disarmImage,0,0,10,10, item.xPos, item.yPos-10,30,30);
                //playerImage.src = "Wizard_Pack/Hit_up.png";
                playerImageCur = 12;
                player.frameX = 0;
                player.casting = "disarmed";
                player.frameY = (player.frameY + 231)%1848;
                if(player.yPos>-50){
                    player.yPos -= 2;
                }

            }
        }
    }
    }
}

function move_chasers(){
    // move the chasers in such a way that they are chasing you
    for(let x of objects){
        if(x.type === "chaser"){
            if (player.xPos+55 < x.xPos){
                x.xPos -= 1;
            }
            else if (player.xPos > x.xPos){
                x.xPos += 1;
            }
            else if (player.yPos+50 < x.yPos){
                x.yPos -= 1;
            }
            else if (player.yPos > x.yPos){
                x.yPos += 1;
            }
            else if(frames_since_start > 90){
                game_over= true;
            }
        }
    }
}
function check_level_up(){
    // controling what level you are on
    if((objects.length === 1)||(testLevel != 0)){
        if(level === 1){
            display_level.innerHTML = "1";
            populate_objects(1,0);
        }
        else if((level === 2)||(testLevel==2)){
            display_level.innerHTML = "2";
            populate_objects(2,0)
        }
        else if((level === 3)||(testLevel==3)){
            display_level.innerHTML = "3";
            populate_objects(2,1)
        }
        else if((level === 4)||(testLevel==4)){
            display_level.innerHTML = "4";
            populate_objects(2,2)
        }
        else if((level === 4)||(testLevel==4)){
            display_level.innerHTML = "4";
            populate_objects(4,2)
        }
        else{
            context.fillStyle ="red"
        context.font = "30px Arial"; 
        context.fillText("YOU WON!", 150, 150);
        }
        level+=1;
        testLevel = 0;
        fire_spells = [];
        frames_since_start = 0;
    }
}
function populate_objects(num_chasers,num_enemys){
    // spawn all the enemys needed for a level
    for (let i = 0; i < num_chasers; i += 1) {
                let chaser = {
                    type:"chaser",
                    xPos: Math.floor(Math.random() * 400),
                    yPos: 50,
                    width:40,
                    height: 50,
                    xChange: 0,
                    yChange:0,
                    frameX:0,
                    frameY:0,
                    casting:"no",
                };
                objects.push(chaser)
            }
    for (let i = 0; i < num_enemys; i += 1) {
    let enemy = {
        type:"enemy",
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
    };
    objects.push(enemy);
}
}
function display_player(){
    // displays the player in its different states
    if(playerImageCur === 1){
        context.drawImage(playerImageRight,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 2){
        context.drawImage(playerImageLeft,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 3){
        context.drawImage(playerImageUp,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 4){
        context.drawImage(playerImageDown,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 5){
        context.drawImage(playerImageAttackLeft,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 6){
        context.drawImage(playerImageAttackRight,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 7){
        context.drawImage(playerImageAttackUp,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 8){
        context.drawImage(playerImageAttackDown,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 9){
        context.drawImage(playerImageDefend,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 10){
        context.drawImage(playerImageHitLeft,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 11){
        context.drawImage(playerImageHitRight,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 12){
        context.drawImage(playerImageHitUp,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else if(playerImageCur === 13){
        context.drawImage(playerImageHitDown,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
    else{ 
        context.drawImage(playerImage,player.frameX,player.frameY,200,200, player.xPos, player.yPos,150,150);
    }
}