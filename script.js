let columns= 3;
let rows=3;


function gameboard(){    
    let board=[];
    for(let i = 0; i<columns;i++){ 
        let row= [];
        for(let j=0;j<rows;j++){
            row.push(0);
        }
        board.push(row);
    }
    return board;
}


function player(){
    //creaza un player
}


function round(){
    //permite unui jucator sa plaseze
}

function game(){
    //creaza gameboard
    //creaza doi playeri
    //ruleaza runde pana se face linie
    //anunta castigator

}
