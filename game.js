var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var isStarted = false;

var level = 0;

var userClickedPattern = [];

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level "+level);
  level++;
}

$(".btn").on("click",function(){
  var userChosenColor = this.id;
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswers(userClickedPattern.length-1);
  playSound(userChosenColor);
});

function playSound (name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor) {
    $("."+currentColor).addClass("pressed");
  setTimeout(() => {
    $("."+currentColor).removeClass("pressed");
  }, 100);
}

$("body").on("keydown",function(e) {
  if(isStarted===false){
    nextSequence();
    isStarted = true;
    
  }
  else{
    console.log("game already Started");
  }
});

function checkAnswers(currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("Success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("Failed");
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart")
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  isStarted = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
