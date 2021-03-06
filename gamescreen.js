var whiteBox = document.getElementById("inner");
var outer;
var scoreCard = document.getElementById("score");
var backButton = document.getElementsByClassName('butt')[0];
var levelDescr = document.getElementById("description");
var color = 0;
var score = 0;
var forDialogueDrop = 0;
var setting, finalTarget, isAnimated, redSpeed, min, sec;
var body = document.getElementById("body");
var info = document.getElementById("info");
var heading = document.getElementById("header");
var timer = document.getElementById("timer");
var setting = 60;
let s = 59;
var timerInterval;
var playB = document.getElementById("playbutton");
var levelDiv = document.getElementById("levelsDiv");
var dialogueBox = document.getElementById("dialogueBox");
var sideText = document.getElementById("sideMessage");


function playButtonClick(){
  levelDiv.style.display = "block";
  playB.style.display = "none";
  backButton.style.display = "block";
}

/**
 * @function startGame() - executed once level is chosen - to begin the game
 * main set up of elements such as attaching event listeners and beginning timer
 * is done here.
 */
function startGame(levelOfDiff){
    if(levelOfDiff == 'med'){
        setting = 80;
        finalTarget = 900;
        isAnimated = 't';
        redSpeed = '10s';
        min = 1;
        sec = 10;
    }
    else if(levelOfDiff == 'hard'){
        setting = 60;
        finalTarget = 700;
        isAnimated = 't';
        redSpeed = '5s';
        min = 1;
        sec = 0;
    }
    else
    {
        setting = 100;
        finalTarget = 1200;
        isAnimated = 'f';
        redSpeed = '0';
        min = 1;
        sec = 30;
    }
    scoreCard.innerHTML = "Score: 0<br>Final Target = " + finalTarget;
    forDialogueDrop = 1;
    levelDescr.style.display = "none";
    levelDiv.style.display = "none";
    whiteBox.style.display = "block";
    scoreCard.style.display = "block";
    timer.style.display = "block";
    sideText.style.display = "none";
    displayTime();  
    whiteBoxMoving();  
}  
 

/**
 * @function whiteBoxMoving - to attach eventListeners to the white box
 */
function whiteBoxMoving(){
    whiteBox.addEventListener('mouseover', e => {
        whiteBox.style.backgroundColor = "red";
        whiteBox.style.transitionDuration = "0s";
        whiteBox.style.top = getRndInteger(15,85) + "vh";
        whiteBox.style.left = getRndInteger(10,82) + "vw";
        score+=10;
        scoreCard.innerHTML = "Score: " + score + "<br>Final Target: " + finalTarget;
        if(score == finalTarget){
            winningText();
            return;
        }
    
        if(score % 100 == 0 && color <= 239 && score !== 0 && score <= (finalTarget - 200)){
            color = color + 20;
            body.style.transition = "background-color 0.5s";
            body.style.backgroundColor = "rgb("+ color + "," + color + "," + color + ")";
    
        }    
        else if(score > (finalTarget - 200)){
            body.style.transition = "background-color 0.5s";
            if(finalTarget == 700){
                body.style.backgroundColor = "rgb(255,255,255)";
            }
            else{
                body.style.backgroundColor = "rgb(250,250,250)";
            }
            heading.style.color = "black";
            info.style.color = "black";
            scoreCard.style.color = "black";
            timer.style.color = "black";
        }
    
        if(score % setting == 0){
            createNewDiv();
        }
    });
    
    
    whiteBox.addEventListener('mouseout', e => {
      whiteBox.style.backgroundColor = "white";
      whiteBox.style.transitionDuration = "0.1s";  
    });
}



/**
 * @function createNewDiv - function to create new red blocks 
 */
function createNewDiv() {
    var d = document.createElement("div");
    d.className = "badBlocks";
    d.style.top = getRndInteger(20,85) + "vh";
    d.style.left = getRndInteger(10,82) + "vw";
    if(isAnimated == 't'){
        d.style.animation = "10s infinite upanddown";
    }
    document.getElementById("body").appendChild(d);
    body.lastChild.addEventListener('mouseover', e=> {
        losingText();
    });
}
  
function getRndInteger(min, max) {
 return Math.floor(Math.random() * (max - min + 1))  + min;
}

/**
* @function losingText() - to display losing message once red block is toucher/**
*                         timer runs out. 
*/
function losingText(){
    forDialogueDrop = 2;
    outer= document.createElement('p');
    var bad = document.querySelectorAll(".badBlocks");
    for(var i  = 0; i < bad.length; i++){
        bad[i].style.display = "none";
    }
    outer.className = "finalText";
    body.appendChild(outer);
    inner.style.display = "none";
    timer.style.display = "none";
    scoreCard.style.display = "none";
    clearInterval(timerInterval);
    outer.id = "outer";
    body.style.backgroundColor = "black";
    heading.style.color = "white";
    info.style.color = "white";
    outer.innerHTML = "Sorry, you lost. <br> Final Score : "+ score;
    backButton.style.backgroundColor = "rgb(0,0,0)";
    color = 0;
    score = 0;
}

/**
 * @function winningText() - to display winning text once required score is achieved
 */
function winningText(){
    forDialogueDrop = 2;
    outer = document.createElement('p');
    var bad = document.querySelectorAll(".badBlocks");
    for(var i  = 0; i < bad.length; i++){
        bad[i].style.display = "none";
    }
    outer.className = "finalText";
    body.appendChild(outer);
    inner.style.display = "none";
    timer.style.display = "none";
    scoreCard.style.display = "none";
    clearInterval(timerInterval);
    outer.id = "outer";
    heading.style.color = "white";
    info.style.color = "white";
    body.style.backgroundColor = "black";
    outer.innerHTML = "YOU WON!";
    backButton.style.backgroundColor = "rgb(0,0,0)";
    score = 0;
    color = 0;
}


/**
 * @function restart - functionality for the back button.
 * /
 * @param {int} forDialogueDrop - signifies where the back button is 
 * being called from.
 * forDialogueDrop = 0 - if we click the back button on the start screen
 * forDialogueDrop = 1 - game screen
 * forDialogue Drop = 2 - winning/ losing screen  * 
 */

function restart(){
    if(forDialogueDrop == 0){
        playB.style.display = "block";
        levelDiv.style.display = "none";
        color = 0;
        return;
    }
    else if(forDialogueDrop == 2){
        outer.style.display = "none";
        playB.style.display = "block";
        playB.style.transition = "display 1s";
        sideText.style.display - "block";
        heading.style.color = "white";
        info.style.color = "white";
        forDialogueDrop = 0;
        color = 0;
    }
    else{
        inner.style.display = "none";
        timer.style.display = "none";
        heading.style.display = "block";
        info.style.display = "block";
        scoreCard.style.display = "none";
        clearTimeout(timerInterval);       
        var bad = document.querySelectorAll(".badBlocks");
        for(var i  = 0; i < bad.length; i++){
            bad[i].style.display = "none";
        }
        dialogueBox.style.animation = "0.7s 1 dropDown";
        dialogueBox.style.display = "block";
    }
}

/**
 * @function dialogue - functionality for drop down dialogue box that comes
 * when back button is clicked
 * Options - yes or no
 */
function dialogue(answer){
    if(answer == "no"){
        dialogueBox.style.display = "none"; 
        var bad = document.querySelectorAll(".badBlocks");
        for(var i  = 0; i < bad.length; i++){
            bad[i].style.display = "block";
        }
        inner.style.display = "block";
        timer.style.display = "block";
        scoreCard.style.display = "block";        
        backButton.style.display = "block";
        displayTime();
    }
    else{
        inner.style.display = "none";
        timer.style.display = "none";
        scoreCard.style.display = "none";
        playB.style.display = "block";
        backButton.style.display = "none";
        levelDiv.style.display = "none";
        sideText.style.display = "block";
        heading.style.display = "block";
        info.style.display = "block";
        dialogueBox.style.display = "none";
        body.style.backgroundColor = "black";
        finalTarget = 0;
        score = 0;
        forDialogueDrop = 0;
        heading.style.color = "white";
        info.style.color = "white";
        scoreCard.style.color = "white";
        timer.style.color = "white";
        sideText.style.color = "white";
        color = 0;
    }
}

/**
 * @function displayTime - the function that controls the game timer
 */

function displayTime(){
    if(sec > 9){
        timer.innerHTML = min + ":" + sec;
    }
    else{
        timer.innerHTML = min + ":0" + sec;
    }
    if(min == 0 && sec == 0){
        losingText();
    }
    else if(sec == 0){
        min--;
        sec = 59;
    }
    else{
        sec--;
    }
    timerInterval = setTimeout(displayTime, 1000);
}