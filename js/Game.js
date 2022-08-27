class Game {
  constructor() {
    this.resetTitle=createElement("h2")
    this.resetButton=createButton("")
    this.leadeboardTitle=createElement("h2")
    this.leader1=createElement("h2")
    this.leader2=createElement("h2")
  }
  getState(){
    var gameStateRef=database.ref("gameState")
    gameStateRef.on("value",function(data){
      gameState=data.val()
    })
  }
  update(state){
    database.ref("/").update({
      gameState:state
    })
  }
  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount=player.getCount()
    car1=createSprite(width/2-50,height-100)
    car1.addImage(car1Img)
    car1.scale=0.07
    car2=createSprite(width/2+100,height-100)
    car2.addImage(car2Img)
    car2.scale=0.07
    cars=[car1,car2]
  }
  handleElements(){
    form.hide()
    form.titleImg.position(40,50)
    form.titleImg.class("gameTitleAfterEfect")
    this.resetTitle.html("reiniciar jogo")
    this.resetTitle.class("resetText")
    this.resetTitle.position(width/2+200,40)
    this.resetButton.class("resetButton")
    this.resetButton.position(width/2+230,100)
    this.leadeboardTitle.html("placar")
    this.leadeboardTitle.class("resetText")
    this.leadeboardTitle.position(width/3-60,40)
    this.leader1.class("leadersText")
    this.leader1.position(width/3-50,80)
    this.leader2.class("leadersText")
    this.leader2.position(width/3-50,130)
  }
  play(){
    this.handleElements()
    this.handleResetButton()
    Player.getPlayersInfo()
    if (allPlayers!==undefined){
      image(pistaImg,0,-height*5,width,height*6)

      var index=0;

      for(var plr in allPlayers){
        index+=1

        var x=allPlayers[plr].positionX;
        var y=height - allPlayers[plr].positionY;

        cars[index-1].position.x=x
        cars[index-1].position.y=y
        
        if(index===player.index){
          stroke(10)
          fill("red")
          ellipse(x,y,60,60)
          camera.position.x=cars[index-1].position.x
          camera.position.y=cars[index-1].position.y
        }
        this.handlePlayerControls()
        drawSprites()
      }
    }
  }
  handleResetButton() {
     this.resetButton.mousePressed(() => { 
      database.ref("/").set({ 
        playerCount: 0, 
        gameState: 0, 
        players: {} 
      }); 
      window.location.reload(); 
    }); 
  }
  handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY+=10
      player.update()
    }
  }
}
