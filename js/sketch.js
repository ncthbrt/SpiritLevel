//Begin Constants
    const FLOOR_HEIGHT = 30;
    const MAX_QUEUE_LENGTH = 6;
    const MAX_OCCUPANCY = 15;

    const ELEVATOR_FLOORS = 12;
    const ELEVATOR_CAPACITY = 5;
    const ELEVATOR_SPEED = 75;

    const ELEVATOR_DRAW_HEIGHT = 100;
    const ELEVATOR_DRAW_WIDTH = 350;
    const ELEVATOR_DIRECTION_UP = 1;
    const ELEVATOR_DIRECTION_STOP = 0;
    const ELEVATOR_DIRECTION_DOWN = -1;
    const ELEVATOR_STOP_WAIT = 0.1;
    const ELEVATOR_OFFLOAD_WAIT = 0.2;

    const PERSON_CHANCE_TO_SPAWN = 3;
    const PERSON_CHANCE_TO_MOVE = 1;
    const PERSON_DRAW_HEIGHT = 20;

    const MILLISECONDS_IN_DAY=60*1000;
    const STARTING_TIME=5.5;

    const ASSETS_FOLDER='../assets/';
    const BUILDING_FOLDER = ASSETS_FOLDER+'building_black/';

    //Indicators
    const UP_DOWN_INDICATOR_PADDING=10;
    const BASE_TRIANGLE_SIZE=150;
    const FLOOR_INDICATOR_PADDING=20;
    const BASE_FLOOR_RECT_HEIGHT=200;
    const BASE_FLOOR_RECT_WIDTH=BASE_FLOOR_RECT_HEIGHT/2;
    const INDICATOR_TEXT_SIZE=16;
    //Floating constants
    const MAX_FLOATING_OFFSET_FACTOR=0.0175;
    const REVOLUTIONS_PER_DAY=10;


//End Constants


//Begin globals
    var currentScreen;
    var gameOverScreen;
    var gameScreen;
    var introScreen;
    var delta;
    var tod;
//End globals

var last_time;
var muted=false;

function preload () {
     gameOverScreen=new GameOverScreen();
     gameScreen=new GameScreen();
     introScreen=new IntroScreen();

     gameScreen.preload();
     gameOverScreen.preload();
     introScreen.preload();

     currentScreen=introScreen;
}

function setup () {
  createCanvas(windowWidth,windowHeight);
  textFont('Raleway');
  textSize(36);
  tod=new TimeOfDay(STARTING_TIME,MILLISECONDS_IN_DAY);
  tod.initialise();

  gameScreen.initialise();
  gameOverScreen.initialise();
  introScreen.intialise();
  infoScreen.intialise();    
  creditsScreen.intialise();
  
  delta = 0;
  last_time = millis();
}

function update () {
  var m = millis();
  delta = (m - last_time) / 1000;
  last_time = m;
  var lastScreen=currentScreen;
  currentScreen.update();
  if(currentScreen!==lastScreen){
      currentScreen.update();
  }

}


function draw () {
  update();
  background(255);
  push();
        fill(255);
        noStroke(255);
        rect(0,0,windowWidth,windowHeight);
  pop();
  currentScreen.display();
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  textFont('Raleway');
  currentScreen.canvasResized();

}

function keyPressed () {
  currentScreen.keyPressed();
}

function keyTyped () {
  if (keyCode === 109) { // m
    muted = !muted;
    masterVolume(muted ? 0 : 1);
  }
}

function mouseClicked () {
  if (currentScreen.mouseClicked) currentScreen.mouseClicked();
  // dd('click', mouseX, mouseY);
}

// Helpers
function random_floor_number() {
  return Math.floor(Math.random() * (ELEVATOR_FLOORS - 1)) + 1;
}

Math.randomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function random_color() {
  return [
    Math.randomRange(0, 255)
  , Math.randomRange(0, 255)
  , Math.randomRange(0, 255)
  ];
}






