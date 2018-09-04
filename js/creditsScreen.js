
function CreditsScreen () {

  this.preload = function () {};
  this.update = function () {};
  this.canvasResized = function () {};

  this.intialise = function () {    
      
  };

  this.display = function () {
    var credits_text = 'Art & Programming: Nick Cuthbert\n'
      + 'Programming: Nic Malan\n\n'
      + 'Art: Chad Lawrence'
      + 'Resources:\n'
      + 'Music: "The Elevator Bossa Nova" by Bensound\n';

    push();
    noStroke();
    fill(0, 0, 0);
    textSize(40);
    textAlign(CENTER);
    text('CREDITS', width / 2, 100);

    textSize(20);
    textLeading(30);
    text(credits_text, width / 2, 150, width - 330, height - 100);
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
