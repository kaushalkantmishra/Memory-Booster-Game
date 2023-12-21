let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highestScore = localStorage.getItem("highestScore") || 0;
let h2 = document.querySelector("h2");

// Start the game on button click
function startGame() {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
}

// Add click event listeners to all buttons to start the game
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", startGame);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(function () {
                if (level > highestScore) {
                    highestScore = level;
                    localStorage.setItem("highestScore", highestScore);
                }
                levelUp();
            }, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Highest Score: <b>${highestScore}</b><br> Click any button to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);
        reset();
    }
}

function btnPress() {
    if (started) {
        let btn = this;
        userFlash(btn);

        userColor = btn.getAttribute("id");
        userSeq.push(userColor);

        checkAns(userSeq.length - 1);
    }
}

for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
