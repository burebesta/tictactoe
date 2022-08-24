let tiles = Array.from(document.querySelectorAll('.tile'))
let winnerTitle = document.querySelector('.winner-title')

let currentSymbol = 'X'
let currentGame = ['','','','','','','','','']
let gameFinished = false;


// 012
// 345
// 678

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

tiles.forEach(tile => tile.addEventListener('mouseover', (e)=>{
    !e.target.classList.contains('selected') && !gameFinished ? e.target.innerHTML = `${currentSymbol}` : ''
}))

tiles.forEach((tile, index) => tile.addEventListener('click', (e)=> {
    if(!gameFinished){
        addSymbol(index, currentSymbol)
        if (checkWin()) {
            winnerTitle.innerHTML = `${currentGame[index]} won!`
            gameFinished = true;
        }
        else
        if (checkTie()) {
            winnerTitle.innerHTML = `TIE`
            gameFinished = true
        }
        if(!e.target.classList.contains('selected')){
            currentSymbol === 'X' ? currentSymbol = 'O' : currentSymbol = 'X'
        }
        e.target.classList.add('selected')
    }    
}))

tiles.forEach(tile => tile.addEventListener('mouseout', (e)=> {
    !e.target.classList.contains('selected') ? e.target.innerHTML = '' : ''
}))

function checkWin() {
    return winningCombos.some(combo => {
        return ( currentGame[combo[0]] === currentGame[combo[1]] 
            && currentGame[combo[1]] === currentGame[combo[2]] 
            && currentGame[combo[1]] !== '')
    })
}

function checkTie() {
    for (let i=0; i<8; i++){
        return currentGame.every(symbol => symbol !== '')
    }
}

function addSymbol(index, currentSymbol) {
    currentGame[index] = currentSymbol
    console.log(`clicked index is ${index} and the current symbol is ${currentSymbol}`)
}

const reset = document.querySelector('button')

reset.addEventListener('click', ()=>{
    currentGame.fill('')
    gameFinished=false
    currentSymbol = 'X'
    tiles.forEach(tile=>{
    tile.classList.remove('selected')
    tile.innerHTML = ''
    })
    winnerTitle.innerHTML=''
})