var icons=[];
var song;
var on=false;

//Load images
function preload() {
  bgImg = loadImage('finalmap2.jpg');
  //icons
  gameImg = loadImage('megaphone.png');
 kiteImg = loadImage('information.png');
  calliImg = loadImage('hourglass.png');
  treeImg = loadImage('start.png');
  taichiImg = loadImage('smartphone.png');
  musicImg = loadImage('abacus.png');
  riskyImg = loadImage('barrier.png');
  statueImg = loadImage('panel.png');
  playgroundImg = loadImage('smartphone.png');
  lakeImg = loadImage('barrier.png');
  cardImg = loadImage('barrier.png');
  deloImg = loadImage('slogan2.png');

 // delImg = loadImage('/icons/delo.jpg');

  //coins
  coinImg = loadImage('dell.jpg');
  song = loadSound('Footstep.mp3');
  coinSound = loadSound('coin.mp3');


}

function setup() {
  createCanvas(900,700);
  //Resize images
//bgImg.resize(912.8,609);
deloImg.resize(500,188);
  gameImg.resize(50,50);
 kiteImg.resize(45,45);
  calliImg.resize(50,50);
  treeImg.resize(65,65);
 taichiImg.resize(45,45);
  musicImg.resize(65,65);
  riskyImg.resize(65,65);
  statueImg.resize(65,65);
  playgroundImg.resize(45,45);
  lakeImg.resize(65,65);
  cardImg.resize(65,65);
  coinImg.resize(20,20);

  // NESS is our guy, he is 32px wide and 50px tall
  NESS = createSprite(850,660,10,10);
  frameDelay=1;
  // Below are animations, each corresponding to a direciton of movement
  var myAnimation = NESS.addAnimation("stationary","stationary_1.png");
  NESS.addAnimation("top","top_1.png",'top_2.png','top_3.png');
  NESS.addAnimation("bot","bot_1.png", "bot_2.png","bot_3.png");
  NESS.addAnimation("right","right_1.png","right_2.png", "right_3.png");
  NESS.addAnimation("diag","diag_1.png","diag_2.png", "diag_3.png");

  //create sprite groups -- coins and NESS are sprites; icons are standard objects
  coins = new Group();
  //Create coin objects
  for(var i=0; i<6; i++){
    var coin = createSprite(random(80, width-100), random(30,height-100), 20, 20);
    if (NESS.overlap(coin)){
      coin.remove();
    }
    else{
      coin.addImage(coinImg);
      coins.add(coin);
    }
  }



  //Create icon objects
  // icons.push(new icon("del", delImg, 400, 500, 50, 50));

  icons.push(new icon("game", gameImg, 450, 205, 50, 50));
  icons.push(new icon("kite", kiteImg,800, 650, 50, 50));
  icons.push(new icon("music", musicImg, 400, 610, 50, 50));
  icons.push(new icon("card", cardImg, 600, 500, 50, 50));
 icons.push(new icon("tai-chi", taichiImg, 170, 300, 50, 50));
  icons.push(new icon("playground", playgroundImg, 387, 317, 50, 50));
  icons.push(new icon("lake", lakeImg, 750, 490, 50, 50));
  icons.push(new icon("calligraphy", calliImg, 660, 200, 50, 50));
  icons.push(new icon("statue", statueImg, 810, 190, 50, 50));
 // icons.push(new icon("saxophone", musicImg, 270, 544, 50, 50));
  icons.push(new icon("risky", riskyImg, 90, 550, 50, 50));
  icons.push(new icon("tree", treeImg, 620, 610, 50, 50));
}

function draw(){
  background(bgImg);

  if (coins.length === 0){
    fill(500);
    textAlign(CENTER);
    textSize(80);
    text("", width/50, 200);
    image(deloImg, height/300, deloImg.width/400, deloImg.height/0.52);
  }

  //Display objects
  drawSprites();
  for (var i = 0; i<icons.length; i++){
    icons[i].display();
  }

  //Character animation & movement. Charcater stops when encounters an icon
  if (keyIsDown(DOWN_ARROW)&&keyIsDown(LEFT_ARROW)&&NESS.position.y+NESS.height<height) {
    NESS.position.y+=2;
    NESS.position.x-=2;
    NESS.changeAnimation("diag");
    NESS.mirrorX(-1); 
    playSong();
  }
  else if (keyIsDown(DOWN_ARROW)&&keyIsDown(RIGHT_ARROW)&&NESS.position.y+NESS.height<height) {
    NESS.position.y+=2;
    NESS.position.x+=2;
    NESS.changeAnimation("diag");
    NESS.mirrorX(1); 
    playSong();
  }
  else if (keyIsDown(UP_ARROW)&&keyIsDown(LEFT_ARROW)&&NESS.position.y+NESS.height<height) {
    NESS.position.y-=2;
    NESS.position.x-=2;
    NESS.changeAnimation("diag");
    NESS.mirrorX(-1); 
  }
  else if (keyIsDown(UP_ARROW)&&keyIsDown(RIGHT_ARROW)&&NESS.position.y+NESS.height<height) {
    NESS.position.y-=2;
    NESS.position.x+=2;
    NESS.changeAnimation("diag");
    NESS.mirrorX(1); 
    playSong();
  }
  else if (keyIsDown(UP_ARROW)&&NESS.position.y-NESS.height>0) {
    NESS.changeAnimation("top");
    NESS.position.y+=-2;
    playSong();
  }
  else if (keyIsDown(RIGHT_ARROW)&&NESS.position.x+NESS.width<width) {
    NESS.position.x+=2.2;
    NESS.changeAnimation("right");
    NESS.mirrorX(-1);
    playSong();
  }
  else if (keyIsDown(LEFT_ARROW)&&NESS.position.x-NESS.width>0) {
    NESS.position.x-=2.2;
    NESS.changeAnimation("right");
    NESS.mirrorX(1);
    playSong();
  }
  else if (keyIsDown(DOWN_ARROW)&&NESS.position.y+NESS.height<height) {
    NESS.position.y+=2;
    NESS.changeAnimation("bot");
    playSong();
  }
  else {
    NESS.changeAnimation("stationary");
    song.stop();
  }  

  //Check overlap of character with icon (here, we cannot use the overlap function because icons are not sprites)
  for (var i=0; i<icons.length; i++){
    if(icons[i].hovering(NESS.position.x,NESS.position.y)){
      //console.log("overlap");
      if (on==false){
        on=true;
        showInfo(icons[i].info);
      }
    }
    //If NESS is not on icon
    else{
      //and if info-box is shown --> hide info box
      if(on==true){
        on=false;
      }
    }
  }
  //Check overlap of charcater with icon
  NESS.overlap(coins, ovCoin);
}

//Play sound when NESS is walking
function playSong(){
  if(!song.isPlaying()){
    song.loop();
  }
}

//Click on icon
function mousePressed(){
  for (var i = 0; i<icons.length; i++){
    if (icons[i].hovering(mouseX, mouseY)){
      showInfo(icons[i].info);
    }
  }
}

//Overlap of charcater with coin (coin and character )
function ovCoin(NESS, coin){
  coinSound.play();
  coin.remove();
}

//Icon class
function icon(name, img, posX, posY, width, height){
  this.info = name;
  this.x = posX;
  this.y = posY;
  this.width = width;
  this.height = height;
  this.img = img;
  this.display = function(){
    imageMode(CENTER);
    image(this.img, this.x, this.y);
  };
  this.hovering = function(X,Y){
    if (X>this.x-this.width/2 && X<this.x+this.width/2 && 
      Y>this.y-this.height/2 && Y<this.y+this.height/2){
      return true;
    }
    else {
      return false; 
    }
  };

}

