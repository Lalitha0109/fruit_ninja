var f1,f2,f3,f4,fruit,X;
var Sword_img,sword;
var monster,a1,a2;

var PLAY=1;
var END=0;
var gamestate=PLAY;

var score;

var knifeSwooshSound,gameOverSound;

var position;


function preload(){
  f1=loadImage("fruit1.png");
  f2=loadImage("fruit2.png");
  f3=loadImage("fruit3.png");
  f4=loadImage("fruit4.png");
  
  Sword_img=loadImage("sword.png");
  
  a1=loadImage("alien1.png");
  a2=loadImage("alien2.png");
  
  gameOver=loadImage("gameover.png");
  
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
  
  
 
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  
  sword=createSprite(windowWidth/2,windowHeight/2,20,20);
  sword.addImage(Sword_img);
  
  fruit_group=createGroup();
  enemy_group=createGroup();
  
  score=0;
  
  
  
}

function draw(){
  background("lightblue");
  
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  
  if (gamestate===PLAY){
    
    fill("red");
    
    text("score:"+score,500,50);
    
    fr_uits();
     Enemy();
    
    if(fruit_group.isTouching(sword)){
      fruit_group.destroyEach();
      score=score+2;
      knifeSwooshSound.play()
      
    }
    if(enemy_group.isTouching(sword)){
      gamestate=END;
      
    }
 }
  
  if(gamestate===END){
    enemy_group.destroyEach();
    fruit_group.destroyEach();
     sword.addImage(gameOver);
     sword.x=300;
     sword.y=300;
    gameOverSound.play();
    
  }
  
  
  
  
  
  drawSprites();

}

function fr_uits(){
  
  
  if (World.frameCount%80===0){
    
   position=Math.round(random(1,2));
   fruit=createSprite(100,100,20,20);
    if(position===1){
      fruit.x=windowWidth-100;
      fruit.velocityX=-(7+(score/4));
      
      }else{
        if(position===2){
      fruit.x=0;
      fruit.velocityX=(7+(score/4));
        }
        
        
      }
    fruit.scale=0.3;
 
    X=Math.round(random(1,4));
     if(X===1){
       fruit.addImage(f1);
       }else if(X===2){
         
         fruit.addImage(f2);
         }else if(X===3){
         
         fruit.addImage(f3);
         }else{
           fruit.addImage(f4);
         }
    
    fruit.setLifetime=200;
    
    
    fruit.y=Math.round(random(50,500));
    
    fruit_group.add(fruit);
    
      }
 
  }


function Enemy(){
  if(frameCount%200===0){
      monster=createSprite(windowWidth-100,windowHeight-400,20,20);
      Y=Math.round(random(1,2));
      if(Y===1){
        monster.addImage(a1);
      }else{
        monster.addImage(a2);
      }
      monster.velocityX=-(8+(score/10));
      monster.x =Math.round(random(50,500));
      monster.y=Math.round(random(50,500));
      monster.setLifetime=50;
    enemy_group.add(monster);
     
     
     }
  
  
  
  
}
