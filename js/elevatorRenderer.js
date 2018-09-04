function ElevatorRenderer(){

    this.display=function(){
        var currentFloor=gameScreen.elevator.current_floor;
        var transition=gameScreen.elevator.transition;
        var floatingOffset=gameScreen.buildingRenderer.calculateFloatingOffset();
        var elevatorWidth=ELEVATOR_DRAW_WIDTH*gameScreen.buildingRenderer.buildingScale;
        push();
            translate(0,floatingOffset);
            noStroke();
            fill(gameScreen.elevatorColor);

            if(gameScreen.elevator.direction===ELEVATOR_DIRECTION_UP){
                var thisHeight=gameScreen.buildingRenderer.ceilingHeightOfFloor(currentFloor)*(1-transition);
                var nextHeight=gameScreen.buildingRenderer.ceilingHeightOfFloor(currentFloor+1)*(transition);

                var thisFloorY= gameScreen.buildingRenderer.getYCoordinateOfFloor(currentFloor);
                translate(gameScreen.buildingRenderer.buildingOrigin.x-elevatorWidth/2,thisFloorY);
                rect(0,0,elevatorWidth,thisHeight);
                rect(0, -nextHeight,elevatorWidth,nextHeight);
            }else if(gameScreen.elevator.direction===ELEVATOR_DIRECTION_DOWN){
                var thisHeight=gameScreen.buildingRenderer.ceilingHeightOfFloor(currentFloor)*(1-transition);
                var nextHeight=gameScreen.buildingRenderer.ceilingHeightOfFloor(currentFloor-1)*transition;

                var thisFloorY= gameScreen.buildingRenderer.getYCoordinateOfFloor(currentFloor-1);

                translate(gameScreen.buildingRenderer.buildingOrigin.x-elevatorWidth/2,thisFloorY);
                rect(0,-thisHeight,elevatorWidth,thisHeight);
                rect(0,0,elevatorWidth,nextHeight);
            }else{
                var ceilingHeight=gameScreen.buildingRenderer.ceilingHeightOfFloor(currentFloor);

                var thisFloorY= gameScreen.buildingRenderer.getYCoordinateOfFloor(currentFloor);
                translate(gameScreen.buildingRenderer.buildingOrigin.x-elevatorWidth/2,thisFloorY);
                rect(0,0,elevatorWidth,ceilingHeight);
            }

        pop();

    }
}
