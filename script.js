//create field
let field = document.createElement('div')
document.body.appendChild(field)
field.classList.add('field')

//create excels
for (let i = 0; i < 100; i++) {
    let excel = document.createElement('div')
    field.appendChild(excel)
    excel.classList.add('excel')
}

// setting the coordinates
let excel = document.getElementsByClassName('excel')
let x = 1
let y = 10
for (let i = 0; i < excel.length; i++) {
    if (x > 10) {
        x = 1
        y--
    }
    excel[i].setAttribute('posX', x)
    excel[i].setAttribute('posY', y)
    x++
}

//create snake
function generateSnake() {
    const posX = Math.round(Math.random() * (10 - 3) + 3) //чтобы не генерировались null для shakeBoby
    const posY = Math.round(Math.random() * (10 - 1) + 1)
    return [posX, posY]
}

const coordinates = generateSnake()
let snakeBody = [
    document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
    document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'),
    document.querySelector('[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]')
]

for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody')
}
snakeBody[0].classList.add('snakeHead')

//create mouse
let mouse

function createMouse() {
    function generateMouse() {
        const posX = Math.round(Math.random() * (10 - 3) + 3) //чтобы не генерировались null для shakeBoby
        const posY = Math.round(Math.random() * (10 - 1) + 1)
        return [posX, posY]
    }

    const mouseCoordinates = generateMouse()
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')

    //если мышь занимает те же ячейки, что и змея, генерируем новые координаты
    while (mouse.classList.contains('snakeBody')) {
        const mouseCoordinates = generateMouse()
        mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')
    }

    mouse.classList.add('mouse')
}

createMouse()

let direction = 'right'
let steps = false
let score = 0

let span = document.createElement('span')
document.body.appendChild(span)
span.style.cssText = `
margin: auto;
margin-bottom: 10px;
font-size: 30px;
display: block
`
span.textContent = `Score: ${score}`


function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')]
    snakeBody[0].classList.remove('snakeHead')
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody')
    snakeBody.pop()

    switch (direction) {
        case "right": {
            if (snakeCoordinates[0] < 10) {
                snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'))

            } else {
                snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'))
            }
            break
        }
        case "left": {
            if (snakeCoordinates[0] > 1) {
                snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'))

            } else {
                snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'))
            }
            break
        }
        case "up": {
            if (snakeCoordinates[1] < 10) {
                snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'))

            } else {
                snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'))
            }
            break
        }
        default: {
            if (snakeCoordinates[1] > 1) {
                snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] - 1) + '"]'))

            } else {
                snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'))
            }
            break
        }
    }


    //съдаем мышь
    if (snakeBody[0].getAttribute('posX') === mouse.getAttribute('posX')
        && snakeBody[0].getAttribute('posY') === mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse')
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX')
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY')
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'))
        createMouse()
        score++
        span.textContent = `Score: ${score}`
    }

    //конец игры
    if (snakeBody[0].classList.contains('snakeBody')) {
        setTimeout(() => alert(`Game over. Your score: ${score}`), 200)
        clearInterval(interval)
        snakeBody[0].style.background = 'red'
        setTimeout(() => location.reload(), 200)
    }


    snakeBody[0].classList.add('snakeHead')
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody')
    }
    steps = true
}


const interval = setInterval(move, 300)

window.addEventListener('keydown', function (e) {
    if (steps) {
        if (e.key === 'ArrowLeft' && direction !== 'right') {
            direction = 'left'
        }
        if (e.key === 'ArrowRight' && direction !== 'left') {
            direction = 'right'
        }
        if (e.key === 'ArrowUp' && direction !== 'down') {
            direction = 'up'
        }
        if (e.key === 'ArrowDown' && direction !== 'up') {
            direction = 'down'
        }
        steps = false
    }
})


