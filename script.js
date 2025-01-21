/*************  ✨ Codeium Command 🌟  *************/
let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

// Fun o que inicia o jogo, adicionando um evento de click em cada caixa
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

// Fun o que executa quando uma caixa   clicada
function boxClicked(e) {
    const id = e.target.id

    // Verifica se a caixa est   vazia
    if(!spaces[id]){
        // Adiciona o valor do jogador atual na caixa
        spaces[id] = currentPlayer
        // Mostra o valor do jogador na caixa
        e.target.innerText = currentPlayer

        // Verifica se o jogador atual ganhou o jogo
        if(playerHasWon() !==false){
            // Mostra o resultado do jogo
            playerText.innerHTML = `${currentPlayer} has won!`
            // Mostra as caixas ganhadoras
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        // Troca o jogador atual
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

// Array com as combina es poss veis de vit ria
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

// Fun o que verifica se o jogador atual ganhou o jogo
function playerHasWon() {
    // Itera sobre as combina es poss veis de vit ria
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        // Verifica se as tr s caixas da combina o est o preenchidas
        // e se o valor delas   igual
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            // Retorna as caixas ganhadoras
            return [a,b,c]
        }
    }
    // Retorna falso se n o houver vit ria
    return false
}

// Adiciona um evento de click no bot o de restart
restartBtn.addEventListener('click', restart)

// Fun o que executa quando o bot o de restart   clicado
function restart() {
    // Reseta as caixas
    spaces.fill(null)

    // Remove o texto e a cor das caixas
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    // Reseta o texto do resultado do jogo
    playerText.innerHTML = 'Tic Tac Toe'

    // Reseta o jogador atual
    currentPlayer = X_TEXT
}

// Inicia o jogo
startGame()
/******  4ed86b8d-5495-4bfc-a403-b5ac9aa02859  *******/