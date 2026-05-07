const character = document.getElementById("character");
const storyText = document.getElementById("storyText");
const scoreText = document.getElementById("score");

const feedBtn = document.getElementById("feedBtn");
const playBtn = document.getElementById("playBtn");
const resetBtn = document.getElementById("resetBtn");

let score = 0;

function playAnimation(animationName) {
  character.classList.remove("jump", "spin");

  void character.offsetWidth;

  character.classList.add(animationName);
}

feedBtn.addEventListener("click", () => {
  score += 10;
  scoreText.textContent = score;
  storyText.textContent = "小猫吃到了小鱼干，开心地跳了起来！";
  character.textContent = "😺";
  playAnimation("jump");
});

playBtn.addEventListener("click", () => {
  score += 5;
  scoreText.textContent = score;
  storyText.textContent = "你陪小猫玩了一会儿，它转了个圈！";
  character.textContent = "😸";
  playAnimation("spin");
});

resetBtn.addEventListener("click", () => {
  score = 0;
  scoreText.textContent = score;
  storyText.textContent = "小猫正在等待你的选择……";
  character.textContent = "🐱";
  character.classList.remove("jump", "spin");
});