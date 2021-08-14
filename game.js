

const buttonColours = ["red", "blue", "green", "yellow"]

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let started = false;

$(document).keypress(function () {
  if(!started) {
    started = true;
    nextSequence();
    $("h1").text("level " + level);
  }
});

$(".btn").click(function (event) {
  if (started) {
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
})

function nextSequence() {

  userClickedPattern = [];

  let randomNumber = Math.floor(( Math.random() * 4 ));
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++
  $("h1").text("level " + level);

}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong")
    $('body').addClass("game-over");
    setTimeout(function () {
      $('body').removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
