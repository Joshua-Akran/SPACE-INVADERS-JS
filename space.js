const Grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let result = 0

for ( let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    Grid.appendChild(square)
}

const square =Array.from( document.querySelectorAll('.grid div'))

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30, 31,32,33,34,35,36,37,38,39
]

function draw() {
    for ( let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)){
            square[alienInvaders[i]].classList.add('invader')
        }
    }
}
draw()

function remove() {
    for ( let i = 0; i < alienInvaders.length; i++) {
        square[alienInvaders[i]].classList.remove('invader')
}
}

//square[currentShooterIndex].classList.add('shooter')


function moveShooter(event){
    square[currentShooterIndex].classList.remove('shooter')
    switch(event.key){
        case 'ArrowLeft':
            if (currentShooterIndex % width !==0) currentShooterIndex -=1
            break
            case 'ArrowRight':
            if (currentShooterIndex % width < width -1) currentShooterIndex +=1
            break
    }
    square[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
    remove()

    if (rightEdge && goingRight) {
        for ( let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width +1
            direction = -1
            goingRight = false
        }
    }

    if (leftEdge && !goingRight) {
        for ( let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width -1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < alienInvaders. length; i++) {
        alienInvaders[i] += direction
    }
    draw()
    
    if (square[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultDisplay.innerHTML = 'GAME OVER!'
        clearInterval(invadersId)
    }

    for (let i = 0; i < alienInvaders. length; i++){
        if (alienInvaders[i] > (square.length )){
        resultDisplay.innerHTML = 'GAME OVER!'
        clearInterval(invadersId)
        }
    }
     if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = "WIN!😁👍"
        clearInterval(invadersId)
     }
}
invadersId = setInterval(moveInvaders, 300)

function shoot(event){
    let laserId
    let currentLaserIndex = currentShooterIndex

    function moveLaser(){
        square[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        square[currentLaserIndex].classList.add('laser')

        if (square[currentLaserIndex].classList.contains('invader')){
        square[currentLaserIndex].classList.remove('laser')
        square[currentLaserIndex].classList.remove('invader')
        square[currentLaserIndex].classList.add('boom')

        setTimeout(()=> square[currentLaserIndex].classList.remove('boom'), 300)
        clearInterval(laserId)

        const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
        aliensRemoved.push(alienRemoved)
        result++
        resultDisplay.innerHTML = result
        }
    }
    switch(event.key){
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
     }
}

document.addEventListener('keydown', shoot) 