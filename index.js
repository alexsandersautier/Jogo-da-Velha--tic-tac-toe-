const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')
const section = document.querySelector('section')
const btnStart = document.getElementById('btnplay')
let play = 'O'
let finished = false
let game = [
    ['*', '*', '*'],
    ['*', '*', '*'],
    ['*', '*', '*']
]

function validate(value) {
    if(value !== '*'){
        if(game[0][0] === game[0][1] && game[0][1] === game[0][2]){
            if(!game[0].includes('*')){
                document.getElementById(0+'.'+0).style.backgroundColor = 'blue'
                document.getElementById(0+'.'+1).style.backgroundColor = 'blue'
                document.getElementById(0+'.'+2).style.backgroundColor = 'blue'
                return true
            }
        }else if(game[1][0] === game[1][1] && game[1][1] === game[1][2]){
            if(!game[1].includes('*')){
                return true
            }
        }else if(game[2][0] === game[2][1] && game[2][1] === game[2][2]){
            if(!game[2].includes('*')){
                return true
            }
        }else if(game[0][0] === game[1][0] && game[1][0] === game[2][0]){
            if(!game[0][0].includes('*') && !game[1][0].includes('*') && !game[2][0].includes('*')){
                return true
            }
        }else if(game[0][1] === game[1][1] && game[1][1] === game[2][1]){
            if(!game[0][1].includes('*') && !game[1][1].includes('*') && !game[2][1].includes('*')){
                return true
            }
        }else if(game[0][2] === game[1][2] && game[1][2] === game[2][2]){
            if(!game[0][2].includes('*') && !game[1][2].includes('*') && !game[2][2].includes('*')){
                return true
            }
        }else if(game[0][0] === game[1][1] && game[1][1] === game[2][2]){
            if(!game[0][0].includes('*') && !game[1][1].includes('*') && !game[2][2].includes('*')){
                return true
            }
        }else if(game[0][2] === game[1][1] && game[1][1] === game[2][0]){
            if(!game[0][2].includes('*') && !game[1][1].includes('*') && !game[2][0].includes('*')){
                return true
            }
        }else{
            return false
        }
    }
}

btnStart.addEventListener('click', (ev) => {
    ev.currentTarget.hidden = !finished
    player1.hidden = true
    player2.hidden = true
    document.getElementById('lbl1').hidden = true
    document.getElementById('lbl2').hidden = true

    const scoreboard = document.createElement('h2')
    scoreboard.innerText = 'Jogador 1: ' + player1.value + '(Bolinha) VS (X)' + ' Jogador 2: ' + player2.value
    scoreboard.classList.add('score')
    section.append(scoreboard)



    const table = document.createElement('table')

    game.forEach((line, indexLine) => {
        const tr = document.createElement('tr')
        tr.id = indexLine
        line.forEach((column, indexColumn) => {
            const td = document.createElement('td')
            td.innerText = column
            td.id = indexLine + '.' + indexColumn
            td.addEventListener('click', function handleclick(ev) {
                ev.currentTarget.removeEventListener('click', handleclick)
                td.innerText = play
                game[indexLine][indexColumn] = play
                play = play === 'O' ? 'X' : 'O'
                td.innerText === 'O' ? td.style.backgroundColor = '#ADD8E6' : '#FFF'
                if (validate(play)) {
                    finished = true
                    btnStart.hidden = !finished
                    btnStart.innerText = 'Jogar Novamente'
                    scoreboard.classList.add('scoreWin')
                    scoreboard.innerText = game[indexLine][indexColumn] === 'O' ? player1.value + ' Ganhou' : player2.value + ' Ganhou'
                    section.removeChild(table)
                    finished = false
                    game = [
                        ['*', '*', '*'],
                        ['*', '*', '*'],
                        ['*', '*', '*']
                    ]
                }else if(!game[0].includes('*') && !game[1].includes('*') && !game[2].includes('*')){
                    finished = true
                    btnStart.hidden = !finished
                    btnStart.innerText = 'Jogar Novamente'
                    section.removeChild(scoreboard)
                    section.removeChild(table)
                    section.append(document.createElement('h3').innerText ='VELHA')
                    finished = false
                    game = [
                        ['*', '*', '*'],
                        ['*', '*', '*'],
                        ['*', '*', '*']
                    ]                    
                }

            })
            tr.append(td)
        })
        table.append(tr)
    })
    table.classList.add('table')
    table.setAttribute('border', '1px')
    section.append(table)
})

