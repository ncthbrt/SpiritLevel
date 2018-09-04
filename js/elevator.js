
function Elevator () {
  this.current_floor = 0;
  this.transition = 0;
  this.wait = 0;
  this.direction = ELEVATOR_DIRECTION_STOP;
  this.commands = [];
  this.passengers = [];
  var timesOfButtonPush=[];

  this.timeOfPush=function(floor){
      return timesOfButtonPush[floor];
  }

  this.initialise=function(){
      for(var i=0; i<ELEVATOR_FLOORS; i++){
          timesOfButtonPush[i]=-1;
      }
  }


  this.add_passenger = function (passenger) {
    if(timesOfButtonPush[passenger.destination]<0){
       timesOfButtonPush[passenger.destination]=millis();
    }
    this.passengers.push(passenger);
  };

  this.push_direction = function (direction) {
    this.commands.push(direction);
  };

  this.offload = function () {
    // dd('Offloading! at ' + this.current_floor);

    var that = this;
    this.direction = ELEVATOR_DIRECTION_STOP;
    this.wait += ELEVATOR_STOP_WAIT;

    // Remove all the relevant people & add wait penalty accordingly
    for (i = this.passengers.length - 1; i >= 0; i--) {
      if (this.passengers[i].destination == this.current_floor) {
        this.wait += ELEVATOR_OFFLOAD_WAIT;

        // The passenger is at their destination to update the status
        var removed = this.passengers.splice(i, 1);
        removed[0].current_floor = this.current_floor;
        removed[0].destination = null;

        gameScreen.score_delivery(removed[0]);

        gameScreen.building.add_passenger(removed[0]);
        gameScreen.sound_doors_open();
        timesOfButtonPush[this.current_floor]=-1;

      }
    }
  };

  // Are there any people at the building on this floor waiting for a lift?
  this.onload = function () {
    // Grab any people who have a destination!
    for (i = gameScreen.building.floors[this.current_floor].length - 1; i >= 0; i--) {
      if (!gameScreen.building.floors[this.current_floor].length) return;
      if (this.passengers.length >= ELEVATOR_CAPACITY) return;

      var p = gameScreen.building.floors[this.current_floor][i];
      if (p.destination) {
        // Remove the person from the floor and put him in the elev
        var r = gameScreen.building.floors[this.current_floor].splice(i, 1);
        this.add_passenger(r[0]);

        gameScreen.sound_doors_open();
      }
    }
  };

  this.has_person_destined_for = function (floor) {
    var result = false;
    this.passengers.forEach(function (e, i) {
      if (e.destination === floor) result = true;
    });

    return result;
  };

  this.update = function () {
    if (this.wait > 0) this.wait -= delta;

    if (this.direction === ELEVATOR_DIRECTION_STOP) {
      // Should I be moving?
      if (this.wait <= 0) {
        if (this.commands.length) {
          var new_direction = this.commands.shift();

          // Ignore the command if we're at the bottom and it's down, or we're at the top and it's up.
          if (
            (new_direction === ELEVATOR_DIRECTION_UP && this.current_floor < ELEVATOR_FLOORS - 1) ||
            (new_direction === ELEVATOR_DIRECTION_DOWN && this.current_floor > 0)
          ) {
            this.direction = new_direction;
          }
        } else {
          // dd('What do we do now?', this.passengers);
          this.offload();
          this.onload();
        }
      }
    } else if (this.transition < 1) {
      this.transition += delta;
    } else {
      // We've hit a new floor!
      if (this.direction === ELEVATOR_DIRECTION_UP) {
        this.current_floor++;
      } else if (this.direction === ELEVATOR_DIRECTION_DOWN) {
        this.current_floor--;
      }

      this.offload();
      this.onload();
      this.transition = 0;
    }
  };

  this.display = function () {
//    push();
//    fill(elevatorColor[0], elevatorColor[1], elevatorColor[2]);
//    var y = height - ELEVATOR_DRAW_HEIGHT - ((this.current_floor * ELEVATOR_DRAW_HEIGHT) + ((ELEVATOR_DRAW_HEIGHT * this.transition)) * this.direction);
//
//    rect(
//      (width / 2) - (ELEVATOR_DRAW_WIDTH / 2),
//      y,
//      ELEVATOR_DRAW_WIDTH,
//      ELEVATOR_DRAW_HEIGHT
//    );
//    pop();

    // Draw the buttons
//    for (i = ELEVATOR_FLOORS; i >= 0; i--) {
//      push();
//      noStroke();
//
//      if (this.has_person_destined_for(i)) fill(0, 255, 0);
//      else fill(0, 0, 255);
//
//      textSize(20);
//      textAlign(CENTER);
//      text(i.toString(), width - 30, i * 22);
//      pop();
//    }

    // Full indicator
    push();
    if (this.passengers.length >= ELEVATOR_CAPACITY) {
      noStroke();
      fill(255, 0, 0);
      textAlign(CENTER);
      textSize(30);
      text('Full', width - 70, (ELEVATOR_FLOORS + 2) * 22);
    }
    pop();

    // Command stack
    push();
    noStroke();
    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    var s = (ELEVATOR_FLOORS + 3) * 22;

    for (i = 0; i < this.commands.length; i++) {
      if (this.commands[i] === ELEVATOR_DIRECTION_UP) {
        text('UP', width - 70, s + (22 * i));
      } else if (this.commands[i] === ELEVATOR_DIRECTION_DOWN) {
        text('DOWN', width - 70, s + (22 * i));
      }
    }
    pop();
  };

}
