
function CreditsScreen () {

  this.preload = function () {};
  this.update = function () {};
  this.canvasResized = function () {};

  this.intialise = function () {    
      
  };

  this.display = function () {
    var credits_text = 'Art & Programming: Nick Cuthbert\n'
      + 'Programming: Nic Malan\n'
      + 'Art: Chad Lawrence\n'      
      + 'Music: "The Elevator Bossa Nova" by Bensound\n';

    push();    
    noStroke();
    fill(0, 0, 0);
    push();
    textSize(40);
    textAlign(CENTER);
    text('CREDITS', width / 2, 100);
    pop();
    push();
    textSize(20);
    textLeading(30);    
    textAlign(CENTER);
    text(credits_text, width / 2, 150);
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
