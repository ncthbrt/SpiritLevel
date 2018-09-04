function IndicatorRenderer (){
    var horizontalLayout=false;

    this.intialise=function(){
        this.canvasResized();
    }
    var x1;
    this.canvasResized=function(){
            if(windowWidth>windowHeight){
                horizontalLayout=false;
            }
            else{
                horizontalLayout=true;
            }
        x1=gameScreen.buildingRenderer.buildingOrigin.x-((gameScreen.buildingSprites[0].width)/2+FLOOR_INDICATOR_PADDING)*gameScreen.buildingRenderer.buildingScale;
    }


    this.display=function(){
        var scale=gameScreen.buildingRenderer.buildingScale;
        var side=scale*BASE_TRIANGLE_SIZE;
        var floatingOffset=gameScreen.buildingRenderer.calculateFloatingOffset();
        for (var i=0; i<ELEVATOR_FLOORS; i++){
            var floor=gameScreen.building.floors[i];
            if (floor!=null && buttonPressed(floor)){
                var y=gameScreen.buildingRenderer.getYCoordinateOfFloor(i)+gameScreen.buildingRenderer.ceilingHeightOfFloor(i);
                var halfFloorWidth=gameScreen.buildingRenderer.widthOfFloor(i)/2;
                var x=gameScreen.buildingRenderer.buildingOrigin.x+halfFloorWidth*1.1;
                var lineLength=width*0.9-x;

                push();
                    translate(0,floatingOffset);
                    translate(x,y);
                    stroke(193,39,45);
                    strokeWeight(1);
                    noFill();
                    line(0,0,lineLength,0);
                    translate(lineLength-UP_DOWN_INDICATOR_PADDING,-UP_DOWN_INDICATOR_PADDING);
                    push();
                        for(var j=0; j<floor.length; j++){
                            if(floor[j].destination){
                                var up=i<floor[j].destination;
                                drawIndicator(up,side);
                            }
                            translate(-UP_DOWN_INDICATOR_PADDING-side,0);
                     }
                    pop();
                pop();
            }
        }
        var elevator=gameScreen.elevator;
        var scale=gameScreen.buildingRenderer.buildingScale;
        var now=millis();
        for(var i=0; i<ELEVATOR_FLOORS; i++){
            if(elevator.has_person_destined_for(i)){
                push();
                    var y=gameScreen.buildingRenderer.getYCoordinateOfFloor(i);

                    var lineWidth;
                    if(i>0){
                        var halfFloorWidth=gameScreen.buildingRenderer.widthOfFloor(i)/2;
                        lineWidth=(gameScreen.buildingRenderer.buildingOrigin.x-halfFloorWidth*0.9)-x1;
                    }else {
                            var halfFloorWidth=gameScreen.buildingRenderer.widthOfFloor(1)/2;
                        lineWidth=(gameScreen.buildingRenderer.buildingOrigin.x-halfFloorWidth*0.9)-x1;
                    }

                    translate(x1,y+floatingOffset);
                    noFill();
                    stroke(0,104,55);
                    strokeWeight(1);
                    line(0,0,lineWidth,0);
                    noStroke();
                    fill(0,104,55);

                    rect(0,0,BASE_FLOOR_RECT_WIDTH*scale,BASE_FLOOR_RECT_HEIGHT*scale);
                    textSize(BASE_FLOOR_RECT_HEIGHT*scale);
                   // fill(0);
                    var time=round((now-gameScreen.elevator.timeOfPush(i))/1000);
                    textAlign(RIGHT,TOP);
                    text(time+"s",-UP_DOWN_INDICATOR_PADDING,0);
                pop();
            }
        }
    }

    function drawIndicator(up,side){
        var halfSide=side/2;
        push();
            if(!up){
                translate(0,-UP_DOWN_INDICATOR_PADDING);
                rotate(PI);
            }
            triangle(0,0,-halfSide,-sqrt((side*side)-(halfSide*halfSide)),-side,0);
        pop();
    }

    function buttonPressed(floor){
        for(var i=0; i<floor.length; i++){
            if(floor[i].destination){
                return true;
            }
        }
        return false;
    }
}
