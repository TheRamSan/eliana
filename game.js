var buttonColours = ["disk", "love", "memaker", "night"];
var gamePattern = [];
var userClickedPattern = [];
var level = [0];

$(document).one("keypress", function() {
  $("h1").text("Level " + (level.length));
  nextSequence();
});

function nextSequence() {
  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + (gamePattern[gamePattern["length"] - 1])).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + (level.length));
  level.push(level.length);
  return randomChosenColour;
};

$(".btn").click(function(event) {
  var userChosenColour = (event.target.id);
  userClickedPattern.push(userChosenColour);
  // playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
    };

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
playSound(userChosenColour);
    }
  } else {
    var audio = new Audio("fail.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
      startOver()

    console.log("wrong")
  }
}

function startOver() {

  $(document).one("keypress", function() {
  level = [0];
  gamePattern = [];
  userClickedPattern = [];
    console.log("Level" + level);
    $("h1").text("Level " + (level.length));
    nextSequence();
  });}
