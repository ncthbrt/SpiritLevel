function BuildingRenderer(){      
 this.floorTypeCount=[1,1,1,1,1,1,1,1,1,1];
 this.isRealFloorType=[true,true,true,false,true,false,true,false,true,false];
 this.templatableTypes=[1,4,6];
 this.buildingScale=1;
 this.buildingOrigin;
 this.buildingHeight;
 this.buildWidth;

 this.intialise=function(){
     var remainingFloors=ELEVATOR_FLOORS-6;
     for(;remainingFloors>0; remainingFloors--){         
         var indice=parseInt(random(this.templatableTypes.length));
         this.floorTypeCount[(this.templatableTypes[indice])]++;                  
     }
     this.canvasResized();
 }

 this.canvasResized=function(){
     this.buildingOrigin=createVector(windowWidth/2,0.27*windowHeight);
     this.buildingHeight=this.calculateNativeBuildingHeight();
     this.buildingScale=(windowHeight*0.7)/this.buildingHeight;
 }

 this.calculateNativeBuildingHeight=function(){
      var bHeight=0;
      for(var i=gameScreen.buildingSprites.length-1; i>=0; i--){
              bHeight+=(gameScreen.buildingSprites[i].height*this.floorTypeCount[i]);
      }
      return bHeight;
 }

 this.getYCoordinateOfFloor=function(floorNumber){
        var floorCount=ELEVATOR_FLOORS-1;
        var yCoordinate=this.buildingOrigin.y;     
        for(var i=gameScreen.buildingSprites.length-1; i>=0; i--){
          if(this.isRealFloorType[i]){
              if(floorNumber>floorCount-this.floorTypeCount[i]){
                  yCoordinate+=(floorCount-floorNumber)*gameScreen.buildingSprites[i].height*this.buildingScale;
                  return yCoordinate;
              }else{
                  yCoordinate+=gameScreen.buildingSprites[i].height*this.buildingScale*this.floorTypeCount[i];
                  floorCount-=this.floorTypeCount[i];
              }
          }else{
            yCoordinate+=gameScreen.buildingSprites[i].height*this.buildingScale*this.floorTypeCount[i];
          }
        }
        return 0;
  }
          
  this.widthOfFloor=function(floorNumber){
     var floorCount=0;
     for(var i=0; i<gameScreen.buildingSprites.length; i++){
              if(this.isRealFloorType[i]){
                  if(floorCount+this.floorTypeCount[i]>floorNumber) {
                      return gameScreen.buildingSprites[i].width*this.buildingScale;
                  }else{
                      floorCount+=this.floorTypeCount[i];
                  }
              }
     }
     return 0;
 }

 this.ceilingHeightOfFloor=function(floorNumber){
     if(floorNumber==0){
         return this.buildingScale*gameScreen.buildingSprites[0].height*0.22;
     }
     var floorCount=0;

     for(var i=0; i<gameScreen.buildingSprites.length; i++){
              if(this.isRealFloorType[i]){
                  if(floorCount+this.floorTypeCount[i]>floorNumber) {
                      return gameScreen.buildingSprites[i].height*this.buildingScale;
                  }else{
                      floorCount+=this.floorTypeCount[i];
                  }                  
              }
     }
     return 0;
 }
 

 this.calculateFloatingOffset=function(){
     var dayTime=(tod.currentTime/24)*TWO_PI;
     return windowHeight*MAX_FLOATING_OFFSET_FACTOR*sin(REVOLUTIONS_PER_DAY*dayTime);
 }

  this.display = function (){
      push();
          var floatingOffset=this.calculateFloatingOffset();
          translate(this.buildingOrigin.x,this.buildingOrigin.y+floatingOffset);
          scale(this.buildingScale);
          for(var i=gameScreen.buildingSprites.length-1; i>=0; i--){
              for(var j=0; j<this.floorTypeCount[i]; j++){
                  push();
                    translate(-gameScreen.buildingSprites[i].width/2,0);
                    image(gameScreen.buildingSprites[i],0,0);
                  pop();
                  translate(0,gameScreen.buildingSprites[i].height);
              }
          }
      pop();
  }
}
