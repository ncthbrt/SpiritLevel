
/* @startingTime The time of day in 24 at which you start
 * @timeInADay The number of milliseconds in a day
 */
function TimeOfDay(startingTime, timeInADay){
    this.currentTime=startingTime;
    this.timeInADay=timeInADay;

    this.initialise=function(){
        this.canvasResized();
    }

    this.update=function(){
    this.currentTime+=((delta * 1000) /this.timeInADay)*24;
    }

    var skies_red=[8,236,255,72,234,236];
    var skies_green=[30,85,236,197,197,85];
    var skies_blue=[84,85,146,255,255,85];
    var colourKeyTimeFrames=[0,7,9,12,14,17];

    var stellarOrigin;
    var moonOrbitalRadius;
    const baseSunRadius=75;
    var sunRadius;
    let moonRadius=70;
    var sunOrbitalRadius;

    this.canvasResized=function(){
        if(windowWidth>windowHeight){
            sunOrbitalRadius=windowWidth;
            sunRadius=(baseSunRadius/1080)*windowHeight;
            stellarOrigin= createVector(windowWidth/2,sunOrbitalRadius+1.5*sunRadius);
            moonOrbitalRadius=windowWidth*0.975;
            moonRadius=sunRadius*0.9/2;
        }
        else{
            sunOrbitalRadius=windowHeight;
            moonOrbitalRadius=windowHeight*0.9;
            sunRadius=(baseSunRadius/1920)*windowWidth;
            stellarOrigin= createVector(windowWidth/2,sunOrbitalRadius+1.5*sunRadius);
            moonRadius=sunRadius*0.9/2;
        }
    }


    this.getSkyColor=function(){
        var tempTime=this.currentTime%24; //Normalises time to produce time of day, rather than total time
        //START BACKGROUND COLOUR CALCULATION
        var prev;
        var next;
        var skyColor;
        if(tempTime>=colourKeyTimeFrames[colourKeyTimeFrames.length-1]){
            var prev=color(skies_red[colourKeyTimeFrames.length-1],skies_green[colourKeyTimeFrames.length-1],skies_blue[colourKeyTimeFrames.length-1]);
            var next=color(skies_red[0],skies_green[0],skies_blue[0]);
            var dist=(tempTime-colourKeyTimeFrames[colourKeyTimeFrames.length-1])/(24-colourKeyTimeFrames[colourKeyTimeFrames.length-1]);
            skyColor=lerpColor(prev,next,dist);
        }
        else{
            for(var i=1; i<=colourKeyTimeFrames.length; i++){
                if(tempTime>=colourKeyTimeFrames[i-1] && tempTime<=colourKeyTimeFrames[i]){
                    var prev=color(skies_red[i-1],skies_green[i-1],skies_blue[i-1]);
                    var next=color(skies_red[i],skies_green[i],skies_blue[i]);
                    var dist=(tempTime-colourKeyTimeFrames[i-1])/(colourKeyTimeFrames[i]-colourKeyTimeFrames[i-1]);
                    skyColor=lerpColor(prev,next,dist);
                }
            }
        }
        return skyColor;
    }

    /** Shows a representation of the time of day
    *
    */
    this.display=function(){

        var tempTime=this.currentTime%24; //Normalises time to produce time of day, rather than total time

        //START BACKGROUND COLOUR CALCULATION                
        push();
        colorMode(RGB);
        background(this.getSkyColor());
        pop();
        //END BACKGROUND COLOUR CALCULATION        
        //START SUN-MOON DISPLAY
        var sunAngle=PI*2*(((tempTime+3)%24)/24.0);

        push();
            fill(255,255,255);
            noStroke();
            translate(stellarOrigin.x,stellarOrigin.y);
            rotate(sunAngle);
            translate(sunOrbitalRadius,0);
            ellipse(0,0,sunRadius,sunRadius);
        pop();

        push();
            translate(stellarOrigin.x,stellarOrigin.y);
            rotate(sunAngle+PI);
            translate(moonOrbitalRadius,0);
            rotate(-(sunAngle+PI));
            scale(moonRadius/gameScreen.moon.height);
            image(gameScreen.moon,0,0);
        pop();
        //END SUN-MOON DISPLAY
    }

    const MOON_ANGLE_START=111/180;
    const MOON_ANGLE_END=-50/180;





}
