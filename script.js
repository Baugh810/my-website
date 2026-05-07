const card = document.querySelector(".card");
const speech = document.getElementById("speech");
const subtitle = document.getElementById("subtitle");
const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const hugBtn = document.getElementById("hugBtn");
const floatLayer = document.getElementById("floatLayer");
const dogMood = document.getElementById("dogMood");
const emojiDog = document.getElementById("emojiDog");

let noClickCount = 0;
let accepted = false;

const noTexts = [
  "不要",
  "再想想？",
  "真的不要嘛？",
  "小狗要跑啦",
  "点不到我嘿嘿",
  "可以比较好哦",
  "最后机会！",
  "略略略"
];

const dogLinesBeforeYes = [
  "小狗认真地看着你。",
  "汪……真的不考虑一下嘛？",
  "小狗往旁边挪了一点点。",
  "它假装很淡定，其实尾巴摇得超快。",
  "小狗拿出了友谊小饼干。",
  "它小声说：和我做朋友会有好运哦。",
  "小狗叉腰：你真的忍心拒绝我嘛？",
  "略略略～那我只好继续逃跑啦！"
];

const successLines = [
  "好耶！从今天开始我们就是好朋友啦！",
  "小狗开心到转圈圈！",
  "友谊小狗上线：每天都给你加油！",
  "恭喜获得：一只超级开心的电子小狗！"
];

const hugLines = [
  "小狗被摸摸了，开心值 +100！",
  "它蹭了蹭你的手：今天也是好朋友！",
  "小狗送你一颗闪闪发光的友谊星星。",
  "它摇着尾巴说：要天天开心！"
];

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function setSpeech(text) {
  speech.textContent = text;
}

function makeFloat(x, y, icons = ["✨", "💛", "⭐", "🐾"]) {
  const item = document.createElement("div");
  item.className = "float-item";
  item.textContent = randomItem(icons);
  item.style.left = `${x}px`;
  item.style.top = `${y}px`;

  floatLayer.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 1700);
}

function burstAroundButton(button, amount = 12) {
  const rect = button.getBoundingClientRect();

  for (let i = 0; i < amount; i++) {
    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 160;
    const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 80;

    setTimeout(() => {
      makeFloat(x, y);
    }, i * 45);
  }
}

function burstFullScreen(amount = 42) {
  for (let i = 0; i < amount; i++) {
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight * 0.65 + Math.random() * 160;

    setTimeout(() => {
      makeFloat(x, y, ["✨", "💛", "⭐", "🐾", "🎉", "🌟"]);
    }, i * 35);
  }
}

function moveNoButton() {
  noBtn.classList.add("running");

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const padding = 18;
  const maxX = window.innerWidth - btnWidth - padding;
  const maxY = window.innerHeight - btnHeight - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function nervousDog() {
  card.classList.remove("nervous");
  void card.offsetWidth;
  card.classList.add("nervous");

  setTimeout(() => {
    card.classList.remove("nervous");
  }, 400);
}

function handleNo() {
  if (accepted) return;

  noClickCount++;

  const textIndex = Math.min(noClickCount, noTexts.length - 1);
  noBtn.textContent = noTexts[textIndex];

  dogMood.textContent = randomItem(["🐾", "🥺", "🍪", "⭐", "✨"]);
  emojiDog.textContent = randomItem(["🐶", "🐕", "🐩"]);
  setSpeech(dogLinesBeforeYes[Math.min(noClickCount - 1, dogLinesBeforeYes.length - 1)]);

  nervousDog();
  moveNoButton();
  burstAroundButton(noBtn, 5);

  if (noClickCount >= 3) {
    subtitle.textContent = "提示：这个按钮有点调皮，可能不太容易被抓到。";
  }

  if (noClickCount >= 5) {
    question.textContent = "那……可以成为我的超级好朋友嘛？";
    yesBtn.textContent = "当然可以！";
  }

  if (noClickCount >= 7) {
    noBtn.textContent = "略略略";
    yesBtn.style.transform = "scale(1.1)";
    subtitle.textContent = "小狗悄悄提示：橙色按钮会打开快乐结局。";
  }
}

function handleYes() {
  accepted = true;

  card.classList.add("success");
  result.classList.remove("hidden");

  emojiDog.textContent = "🐶";
  yesBtn.textContent = "友谊认证成功！";
  noBtn.style.display = "none";

  question.textContent = "我们是好朋友啦！";
  subtitle.textContent = "小狗已经把这一天记进快乐日记里。";
  dogMood.textContent = "🎉";

  setSpeech(randomItem(successLines));
  burstFullScreen();

  setTimeout(() => {
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 300);
}

function playDogAction() {
  const actions = ["spin-dog", "tilt-dog", "bounce-dog", "shake-dog"];
  const action = randomItem(actions);

  emojiDog.classList.remove("spin-dog", "tilt-dog", "bounce-dog", "shake-dog");

  // 让同一个动作可以连续触发
  void emojiDog.offsetWidth;

  emojiDog.classList.add(action);

  setTimeout(() => {
    emojiDog.classList.remove(action);
  }, 800);
}

function burstRandomEmojis(amount = 20) {
  const icons = [
    "🥰", "😆", "🤩", "😋", "🥳",
    "💛", "💖", "✨", "🌟", "⭐",
    "🐾", "🍪", "🦴", "🎀", "🎉"
  ];

  for (let i = 0; i < amount; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    setTimeout(() => {
      makeFloat(x, y, icons);
    }, i * 45);
  }
}

function handleHug() {
  const dogFaces = ["🐶", "🐕", "🐩"];
  const dogMoods = ["💛", "🐾", "⭐", "✨", "🥰", "🎉"];

  emojiDog.textContent = randomItem(dogFaces);
  dogMood.textContent = randomItem(dogMoods);

  setSpeech(randomItem(hugLines));

  playDogAction();
  burstRandomEmojis(24);
}

noBtn.addEventListener("click", handleNo);

noBtn.addEventListener("mouseenter", () => {
  if (!accepted && noClickCount >= 2) {
    handleNo();
  }
});

yesBtn.addEventListener("click", handleYes);
hugBtn.addEventListener("click", handleHug);

setTimeout(() => {
  setSpeech("可以成为我的好朋友嘛？我会摇尾巴的那种！");
}, 900);