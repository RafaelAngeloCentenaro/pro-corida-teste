var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var pistaImg;
var car1Img,car1
var car2Img,car2
var cars=[]
var allPlayers;
var gameState

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  pistaImg = loadImage("./assets/PISTA.png");
  car1Img = loadImage("./assets/car1.png");
  car2Img = loadImage("./assets/car1.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);
  if(playerCount==2){
    game.update(1)
  }
  if (gameState==1){
    game.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
