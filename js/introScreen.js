var creditsScreen = null;
var infoScreen = null;

var richard;

function IntroScreen () {
  creditsScreen = new CreditsScreen();
  infoScreen = new InfoScreen();
  this.scale;
  this.intialise = function () {this.canvasResized()};
  this.update = function () {};
  this.canvasResized = function () {
      if(windowWidth>windowHeight){
          this.scale=windowHeight/1080;
      }else{
          this.scale=windowWidth/1920;
      }
      this.h= windowHeight - this.scale*100;
      buttonHeight=72*this.scale;
  };
  this.h;

 var buttonHeight;
 var buttonWidth=[];

  this.preload = function () {
    richard = loadImage(ASSETS_FOLDER + 'title_screen_richard.png');
  };


  this.display = function () {


    push();
      translate((windowWidth / 2) - (this.scale)*richard.width/2,(windowHeight / 2) - this.scale*richard.height/2);
      scale(this.scale);
      image(richard,0,0);
    pop();

    push();
      textSize(buttonHeight);
      noStroke();
      fill(0);
      textAlign(CENTER);
      text('Spirit Level', width / 2, 100*this.scale);


      noStroke();
      fill(0);


      buttonWidth[0]=textWidth('Play');
      buttonWidth[1]=textWidth('Info');
      buttonWidth[2]=textWidth('Credits');

      textAlign(RIGHT,TOP);
      text('Play', (width / 2) - buttonWidth[1]/2-20*this.scale, this.h);

      textAlign(CENTER,TOP);
      text('Info', width / 2, this.h);

      textAlign(LEFT,TOP);
      text('Credits', (width / 2) + buttonWidth[1]/2+20*this.scale, this.h);
    pop();
  };

  this.keyPressed = function () {
    if (keyCode === 73) { // i
      currentScreen = infoScreen;
    } else if (keyCode === 80) { // p
      currentScreen = gameScreen;
    } else if (keyCode === 67) { // c
      currentScreen = creditsScreen;
      //
    } else {
      dd('keyPressed but not caught', keyCode);
    }
  }


  this.mouseClicked = function(){
      if(mouseY>=this.h-buttonHeight*0.25 && mouseY<=this.h+buttonHeight*1.25){
          dd('Mouse clicked');
          if(mouseX< (width / 2) - buttonWidth[1]/2-20*this.scale && mouseX>=(width / 2) - buttonWidth[1]/2-40*this.scale-buttonWidth[0]){
              currentScreen = gameScreen;
          }else if(mouseX>=(width / 2) - buttonWidth[1]/2-20*this.scale && mouseX<= (width / 2) + buttonWidth[1]/2+20*this.scale){
              currentScreen=infoScreen;
          }else if(mouseX>(width / 2) + buttonWidth[1]/2+20*this.scale && mouseX<=(width / 2) + buttonWidth[1]/2+40*this.scale+buttonWidth[0]){
              currentScreen=creditsScreen;
          }
      }
  };




}

