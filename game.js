var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(document).keypress(function()
{
  if(!gameStarted){
    $("#level-title").text("Lets Begin");

    setTimeout(function(){
      $("#level-title").text("Level " + level);
      nextSequence();
      gameStarted = true;
    }, 1500)

  }
});

$(".btn").click(function(){
      var userChosenColor = $(this).attr("id");
      animatePress(userChosenColor);
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      //console.log(userClickedPattern);
      checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence(){

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  setTimeout(function(){
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  },1000);
  //Applying animaiton on the selected button acc to input


}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100)
};


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        $("#level-title").text("Success, Next Round");
        setTimeout(function(){
          nextSequence();
        },1500);
      }
  }
  else{
    console.log("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);

    $("#level-title").text("Game Over. Press any key to Restart.");
    $(document).keypress(startOver);
  }
};

function startOver(){
  location.reload();
}
