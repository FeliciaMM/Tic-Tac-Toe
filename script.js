function Gameboard(){
    let board = [];

    for(let i =0;i<9;i++){
        board.push('E');
    }

    const getBoard=() => board;

    const addMark=(index,mark)=>{
        if(board[index] === 'E'){
            board[index]=mark;
            return true;
        }else{
            return false;
        }
    };


    return {getBoard, addMark};
}

function Player(name, mark){
    return {name,mark, playerChoices: []};
}

function Game(){
    let board = Gameboard();
    let Player1 = Player('P1','X');
    let Player2 = Player('P2','0');
    let currentPlayer = Player1;

    const setMark=(index,currentPlayer)=>{
        if(board.addMark(index,currentPlayer.mark)){
            currentPlayer.playerChoices.push(index);
            return `Player ${currentPlayer.name} put ${currentPlayer.mark} in the ${index} cell`;
        }else{  
            return 'Invalid move';
        }
    }

    const endTie = (board)=>{
        if(board.getBoard().every(cell=>cell!='E')){
            return true;
        }
    }

    
    let winningCombinations =[
        [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[0,4,8],[3,5,4],[6,7,8],[2,4,6]
    ]

    const checkWin = (playerChoices) => {
        return winningCombinations.some(combination =>
            combination.every(index => playerChoices.includes(index))
        );
    };
       

    const playRound=(index)=>{
        let result = setMark(index,currentPlayer);
       if(result==='Invalid move'){
        return result;
       }

       if(checkWin(currentPlayer.playerChoices)){
        return `Player ${currentPlayer.name} won! with ${currentPlayer.playerChoices}`;
       }
       if(endTie(board)===true){
        board.resetBoard();
        return 'Game Over';
       }

       currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
        return result;
    }
    return{playRound}
}

const game = Game();

//p1 wins
console.log(game.playRound(1));//p1
console.log(game.playRound(3));//p2
console.log(game.playRound(2));
console.log(game.playRound(8));
console.log(game.playRound(0));



//toata lumea pierde
// console.log(game.playRound(0)); // P1
// console.log(game.playRound(1)); // P2
// console.log(game.playRound(2)); // P1
// console.log(game.playRound(4)); // P2
// console.log(game.playRound(3)); // P1
// console.log(game.playRound(5)); // P2
// console.log(game.playRound(7)); // P1
// console.log(game.playRound(6)); // P2
// console.log(game.playRound(8)); // P1 (last move)
// console.log(game.playRound(1));


