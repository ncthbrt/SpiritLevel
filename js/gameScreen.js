function GameScreen(){
    this.elevator;
    this.building;

    this.buildingRenderer;
    this.buildingSprites = [];

    this.elevatorRenderer;
    this.elevatorColor;

    this.moon;

    this.indicators;

    this.music;
    this.musicFilter;
    this.sound_ding;
    this.sound_doors;

    this.score = 0;

    this.reset=function(){
        this.initialise();
    }

    this.preload=function(){
            
        //start load game sprites
            this.moon = loadImage(ASSETS_FOLDER+'moon.png');
        
            for (i = 0; i < 10; i++) {
                this.buildingSprites[i] = loadImage(BUILDING_FOLDER + i + '.png');
            }
        //end load game sprites

        //start game music
            this.music = loadSound(ASSETS_FOLDER+'sound/bensound-theelevatorbossanova.mp3');
            this.sound_ding = loadSound(ASSETS_FOLDER+'sound/ding.mp3');
            this.sound_doors = loadSound(ASSETS_FOLDER+'sound/doors.mp3');
        //end game music
    }

    this.initialise=function(){
        this.music.setVolume(0.2);
        this.music.loop();
        this.music.disconnect();
        this.musicFilter = new p5.LowPass();
        this.musicFilter.process(this.music, 200, 10);

        this.sound_doors.setVolume(0.5);

        this.elevatorColor= color(255, 200, 0);
        this.elevator = new Elevator();
        this.elevator.initialise();
        this.building = new Building();

        this.buildingRenderer = new BuildingRenderer();
        this.buildingRenderer.intialise();

        this.indicators=new IndicatorRenderer();
        this.indicators.intialise();

        this.elevatorRenderer=new ElevatorRenderer();
    }

    this.update=function(){
        tod.update();
        this.building.update();
        this.elevator.update();        
        this.building.floors.forEach(function (e, i) {
            if (e.length > MAX_QUEUE_LENGTH) {
                currentScreen=gameOverScreen;
            }
        });
    }

    this.display=function(){
            tod.display();
            this.elevatorRenderer.display();
            this.indicators.display();
            this.elevator.display();
            this.buildingRenderer.display();

      push();
      noStroke();
      fill(255, 255, 255);
      textSize(20);
      var s = 'Score: ';
      s += Math.ceil(this.score * 100).toString();
      text(s, 20, 30);
      pop();
    }

    this.canvasResized=function(){
        tod.canvasResized();
        this.buildingRenderer.canvasResized();
        this.indicators.canvasResized();
    }

  this.keyPressed = function () {
    if (keyCode === UP_ARROW) {
      this.elevator.push_direction(ELEVATOR_DIRECTION_UP);
    } else if (keyCode === DOWN_ARROW) {
      this.elevator.push_direction(ELEVATOR_DIRECTION_DOWN);
    } else if (keyCode === 32) {
      this.elevator.commands.shift();
    } else {
      // dd('keyPressed but not caught', keyCode);
    }
  };

  this.sound_doors_open=function() {
      this.sound_ding.play();
      this.sound_doors.play();

      this.music.connect();
      setTimeout(function () {
        gameScreen.music.disconnect();
        gameScreen.musicFilter.process(gameScreen.music, 700, 10);
      }, 1200);
  };

  this.score_delivery = function (person) {
    this.score += 1 / person.wait;
    person.wait = 0;

    dd('score_delivery score: ', this.score);
  };



}
