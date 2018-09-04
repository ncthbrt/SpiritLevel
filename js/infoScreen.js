
function InfoScreen () {

  this.preload = function () {};
  this.update = function () {};
  this.intialise = function () {
      this.canvasResized();
  };
  this.canvasResized = function () {      
      if(windowWidth>windowHeight){
          this.scale=windowHeight/1080.0;        
      }else{
          this.scale=windowWidth/1920.0;                
      }
    
  };
    this.scale;
  this.display = function () {
    var intro_text = 'Richard is the ghost of a deceased elevator operator who faithfully held his post for over 20 years. As his spirit floated over his erstwhile and slightly mouldering corpse, the ghost of the man sometimes known as Dick, asked himself: "What now?"\n\nThe answer is as it always is, to carry on!\n\nYou are Richard. Take possession of the elevator to which you have dedicated much of your living years. Ensure that the elevator stays running well enough to keep the elevator servicemen at bay. \n\nTry to take all the passengers to their destinations while keeping the queue length as low as possible!';

    push();
    
    noStroke();
    fill(0, 0, 0);
    push();
    textAlign(CENTER);
    textSize(32*this.scale);
    text('How to play Spirit Level', width / 2, 100);
    pop();
    push();
    textAlign(CENTER);
    textSize(20);
    textLeading(30);    
    text(intro_text, width / 2 - 450/2, 150, 450, height - 100);
    pop();
    pop();
  };

  this.keyPressed = function () {
    if (keyCode === 27) { // esc
      currentScreen = introScreen;
    }
  };

  this.mouseClicked = function () {
    currentScreen = introScreen;
  };

}
