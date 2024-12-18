let gameboard = document.querySelector('.gameboard');

function Gameboard(){
    let board = [];
    let cells =[];
    for(let i =0;i<9;i++){
        let cell=document.createElement('div');
        cell.classList.add("cell");
        board.push('E');
        gameboard.appendChild(cell);
        cell.dataset.index = i;
        cell.textContent = board[i];
        cells.push(cell);
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

    const resetBoard=()=>{
        board = ['E','E','E','E','E','E','E','E','E'];
        cells.forEach(cell=>cell.innerHTML='E');
    };

    return {getBoard, addMark,resetBoard, cells};
}

function Player(name, mark){
    return {name,mark, playerChoices: []};
}

function Game(){
    let board = Gameboard();
    let Player1 = Player('P1','X');
    let Player2 = Player('P2','0');
    let currentPlayer = Player1;

    const newGame=()=>{
        board.resetBoard();
        Player1.playerChoices =[];
        Player2.playerChoices =[];
    }

    const setMark=(index,currentPlayer)=>{
        if(board.addMark(index,currentPlayer.mark)){
            if(!currentPlayer.playerChoices.includes(index)){
                currentPlayer.playerChoices.push(index);
            }else{
                return "Error"
            }
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
       

    const playRound=()=>{
        board.cells.forEach(cell=>cell.addEventListener('click',()=>{
            const index = parseInt(cell.dataset.index); 
            let result = setMark(index,currentPlayer);
            if(result==='Invalid move'){
                console.log(result) ;
            }
            if(result!=='Invalid move'){
                cell.textContent = currentPlayer.mark;
            }
            if(checkWin(currentPlayer.playerChoices)){
                
                alert( `Player ${currentPlayer.name} won!`);
                newGame();
            }
            if(endTie(board)===true){
                
                alert( 'Game Over');
                newGame();
            }

            currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
            return result;
            })
        )
    }
    return{playRound}
}

const game = Game();
game.playRound();




