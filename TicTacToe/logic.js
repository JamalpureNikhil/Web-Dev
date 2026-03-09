// Move Title and Reset button inside the main container for a unified "Game Console" look
const gameContainer = document.querySelector("#container");
const mainTitle = document.querySelector("h1");
const resetButton = document.querySelector(".button");

if (gameContainer && mainTitle && resetButton && !mainTitle.classList.contains("h1")) {
    gameContainer.insertBefore(mainTitle, gameContainer.firstChild); // Move Title to top of box
    gameContainer.appendChild(resetButton); // Move Button to bottom of box
}

let boxes = document.querySelectorAll(".box"); 

let newgame = document.querySelector(".p");

let congrats = document.querySelector(".h1");

var win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let turnX = true;

boxes.forEach((box)=> {
box.addEventListener("click",()=>{
    if(turnX){
    box.innerText = "X";
    box.style.color = "#00d4ff"; // Neon Cyan for X
    turnX = false;
    }else{
    box.innerText = "O";
    box.style.color = "#ff0055"; // Neon Pink for O
    turnX = true;
    }
    box.disabled = true;
    winner();
});
});
// console.log(box);
function winner(){
let isWinner = false;
for(let pattern of win){
    // console.log(pattern[0],pattern[1],pattern[2]);
    // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
   let pos1val = boxes[pattern[0]].innerText;
   let pos2val = boxes[pattern[1]].innerText;
   let pos3val = boxes[pattern[2]].innerText;
   if(pos1val!=""&&pos2val!=""&&pos3val!=""){
   if(pos1val===pos2val&&pos2val===pos3val){
    isWinner = true;
    boxes.forEach((box)=>{
        box.disabled=true;
    })
    
    // Inject HTML with Message, Instruction Text, and Button
    congrats.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem; text-shadow: 0 0 30px currentColor;">Congrats! Player ${pos1val} Wins!</div>
        <div style="font-size: 1.2rem; margin-bottom: 2rem; color: #aaa; letter-spacing: 2px;">Press new game to start a new game</div>
        <button id="popup-reset-btn" class="button">New Game</button>
    `;
    congrats.style.display = "flex";
    document.querySelector("#popup-reset-btn").addEventListener("click", resetfun);
   }
}
}

if (!isWinner) {
    let allFilled = true;
    boxes.forEach((box) => {
        if(box.innerText === "") allFilled = false;
    });
    if(allFilled) {
        congrats.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem; color: #fff;">It's a Draw!</div>
            <div style="font-size: 1.2rem; margin-bottom: 2rem; color: #aaa; letter-spacing: 2px;">Press new game to start a new game</div>
            <button id="popup-reset-btn" class="button">New Game</button>
        `;
        congrats.style.display = "flex";
        document.querySelector("#popup-reset-btn").addEventListener("click", resetfun);
    }
}
}
let Reset = document.querySelector(".button");

const resetfun = function(){
    turnX = true;
    boxes.forEach(function (box){
        box.innerText = "";
        box.disabled = false;
        box.style.color = "";
    });
    congrats.style.display = "none";
};

Reset.addEventListener("click",resetfun);