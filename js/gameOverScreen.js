function GameOverScreen(){
    this.preload=function(){
    }

    this.initialise=function(){
    }

    this.update=function(){
        gameScreen.elevator.update();
        tod.update();
    }

    this.display=function(){
            tod.display();
            push();
            noStroke();
            fill(255, 255, 255);
            textSize(40);
            textAlign(CENTER);
            text('GAME OVER', width / 2, 100);
            gameScreen.elevatorRenderer.display();
            gameScreen.buildingRenderer.display();
            pop();
    }
    this.canvasResized=function(){
        tod.canvasResized();
    }

    this.keyPressed=function(){
        if(keyCode==='r'){
            currentScreen=introScreen;
        }
    }
}
