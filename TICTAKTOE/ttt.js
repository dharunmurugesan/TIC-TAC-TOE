const cells=document.querySelectorAll(".cell");
const statusText=document.getElementById("status");
const resetBtn=document.getElementById("reset");

let currentPlayer="X";
let gameBoard=["","","","","","","","",""];
let gameActive=true;

const winConditions=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function handleClick(e){
    const index=e.target.dataset.index;

    if(!gameActive||gameBoard[index]!=="") return;

    gameBoard[index]=currentPlayer;
    e.target.textContent=currentPlayer;

    if(checkWin()){
        statusText.textContent=`Player ${currentPlayer} Wins!`;
        gameActive=false;
    }
    else if(!gameBoard.includes("")){
         statusText.textContent="It is a Draw";
         gameActive=false;
    }
    else{
        currentPlayer=currentPlayer==="X"?"O":"X";
        statusText.textContent=`Player ${currentPlayer}'s Turn`;
    }          
}

function checkWin(){
    return winConditions.some(comb=>{
        return comb.every(i=>gameBoard[i]===currentPlayer);
    });
}

function resetGame(){
    currentPlayer="X";
    gameBoard=["","","","","","","","",""];
    gameActive=true;
    statusText.textContent="Player X's Turn";
    cells.forEach(cell=>(cell.textContent=""));
    
}
cells.forEach(cell=>cell.addEventListener("click",handleClick));
resetBtn.addEventListener("click",resetGame);