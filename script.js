
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const score = document.querySelector(".score");
var points = 0
var speedPipe = 2

score.textContent = "Score:"

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const tryAgain = () => {
  document.location.reload(true)
}

var timePoints = setInterval(() => {

  if (points == 2) {
    speedPipe = 1
  }
  points++
  pipe.style.animation = `pipe_animation ${speedPipe}s infinite linear`

}, speedPipe*1000);

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
  const cloudsPosition = clouds.offsetLeft;
  
  score.textContent = `Score: ${points}`

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./mariojump_images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "45px";

    clouds.style.animation = "none";
    clouds.style.left = `${cloudsPosition}px`;

    clearInterval(timePoints);
    clearInterval(loop);

    let gameOver = document.querySelector(".gameOver");
    gameOver.innerText = "You lose!\n Press any key to try again";

    setTimeout(() => {
      document.addEventListener("keydown", tryAgain);
    }, 500)
  }
}, 10)

document.addEventListener("keydown", jump);
