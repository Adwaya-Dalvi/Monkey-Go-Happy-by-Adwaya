//Hungry monkey

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var reset;

//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload(){
  
  
  //Monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
 
}


//Setup
function setup() {
  //Canvas
  createCanvas(600,400);
  
  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.13;
  
 //Ground
  ground = createSprite(70, 350, 12000, 10);
  ground.velocityX = -4;
  ground.x=ground.width/10;
  ground.shapeColor="Black";
  
  //score
  score = 0;
  survialTime = 0;
  
}

//Draw
function draw() {
  
  //Background
  background ("azure");
  
   //displaying survialtime
  stroke("black");
    fill("black");
      textSize(20);
  
  text("Survial Time:"+  survialTime, 50, 50);
  
  //displaying score
  stroke("black");
    fill("black");
      textSize(20);
  text("Score:"+  score, 460, 50);
  
 //Monkey
  monkey.collide(ground);
  //PLAY
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    survialTime = Math.ceil(frameCount/frameRate());
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  
  
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacles();
    
    
      
    
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
  //END
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     survialTime.visible = false;
     
    monkey.velocityY=0;
     monkey.addAnimation("sprite_0.png", monkey_running);
     
     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 210, 200);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Refresh Page to Replay", 130, 240);
     
     if(keyDown("R")){
       reset();
     }
   }
 
  
  
 

  //draw Sprites
  drawSprites();
}

//Banana
function food() {
  if (frameCount % 110 === 0) {
    banana = createSprite(500,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -4;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 150 === 0){
    obstacle = createSprite(600,330,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}

function reset(){
  gameState=PLAY;
  score=0;
  survivalTime=0;
  
}
 
 


