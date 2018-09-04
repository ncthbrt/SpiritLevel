
function Building () {
  this.floors = [];
  for (var i = 0; i < ELEVATOR_FLOORS; i++) {
    this.floors.push([]);
  }

  this.add_passenger = function (passenger) {
    this.floors[passenger.current_floor].push(passenger);
  };

  this.count_occupants = function () {
    var count = 0;
    for (i = 0; i < this.floors.length; i++) {
      count += this.floors[i].length;
    }

    return count;
  };

  this.update = function () {
    // Chance to spawn a new person on the ground floor
    if ((Math.random() * 1000) < PERSON_CHANCE_TO_SPAWN) {
      if (this.count_occupants() < MAX_OCCUPANCY) {
        this.floors[0].push(new Person(0, random_floor_number()));
      } else {
        dd('Max Occupancy!');
      }
    }

    for (i = 1; i < this.floors.length; i++) {
      for (j = 0; j < this.floors[i].length; j++) {
        if ((Math.random() * 1000) < PERSON_CHANCE_TO_MOVE) {
          var p = this.floors[i][j];
          var rfn = random_floor_number();
          if (rfn !== p.current_floor) {
            p.destination = rfn;
          }
        }
      }
    }

    // If the user has a destination; bump his waiting time.
    for (i = 0; i < this.floors.length; i++) {
      for (j = 0; j < this.floors[i].length; j++) {
        var p = this.floors[i][j];
        if (p.destination) p.wait += delta;
      }
    }

  };

}
