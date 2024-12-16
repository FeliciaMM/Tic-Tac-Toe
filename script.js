function Gameboard(){  
    let indexes = 9;                      
    let board=[];

    for(let i = 0; i<indexes;i++){ 
        board.push(0);
    }

   const getBoard = ()=>board;

    const addMark = (index,player)=>{
     if(board[index]===0){
            board[index]=player;
            return true;
        }
        return "Spot is already taken";
    };

   return {getBoard,addMark};
}

const Player = (name,mark)=>{
    let playerMarks = [];

     const addMark = (index) => {
        playerMarks.push(index);
     };

     const getMarks = () => playerMarks;

    return {name, mark, addMark, getMarks}; 
}

function Game(){
    const board = Gameboard();
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]       
    ];

    const checkWinner = (playerMarks) => {
        return winningCombinations.some(combination =>
            combination.every(index => playerMarks.includes(index))
        );
    };

    const playTurn = (index) => {
        if (board.addMark(index, currentPlayer.mark) === true) {
            currentPlayer.addMark(index);
            if (checkWinner(currentPlayer.getMarks())) {
                return `${currentPlayer.name} wins!`;
            }
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            return `${currentPlayer.name}, placed on ${index}. Next turn`;
        }
        return "Invalid move";
    };

    const getBoard = () => board.getBoard();

    return { playTurn, getBoard };
}


const game = Game();
console.log(game.playTurn(0));
console.log(game.playTurn(1)); 
console.log(game.playTurn(3)); 
console.log(game.playTurn(4)); 
console.log(game.playTurn(6));
