
const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur labore adipisci magnam quas. Quia hic cumque aliquid cupiditate eligendi adipisci nostrum fuga a nesciunt eveniet sapiente odit, nobis voluptas molestiae quos iusto natus quaerat, rem nisi? Suscipit, laudantium error magni, reiciendis quia, assumenda debitis deleniti exercitationem molestias quis dicta! Explicabo perspiciatis molestiae reprehenderit. Iure ratione molestias quidem animi. Cupiditate dolores consectetur quos autem unde, nostrum illum perferendis cum nisi porro blanditiis aspernatur debitis sed saepe obcaecati! Labore aperiam, porro laborum aliquid quam unde cumque dicta possimus quidem repellendus nesciunt suscipit inventore. Ipsam ratione cum nemo molestias ab a nesciunt cupiditate!".replaceAll(' ', '')

let writtenHTML = document.getElementById('written')
let yetToWriteHTML = document.getElementById('yet-to-write')
let cardHTML = document.getElementById('card')
let cursorHTML = document.getElementById('cursor')
let mistakeCounterHTML = document.getElementById('mistakes-counter')
let speedHTML = document.getElementById('speed')

yetToWriteHTML.textContent = text
let lastType = Date.now()
let mistakeCounter = 0
let hadInital = false
let currentSpeed = 0
let startingTime

setInterval(() => {
    if (writtenHTML.textContent.length == 0) {
        speedHTML.textContent = '0'
        return
    }
    const passedTimeInMins = (Date.now() - startingTime) / 1000 / 60
    currentSpeed = writtenHTML.textContent.length / passedTimeInMins
    speedHTML.textContent = Math.round(currentSpeed)
}, 100)

const handleBlink = () => {
    lastType = Date.now()
    cursorHTML.classList.remove('blink')
    setTimeout(() => {
        if (Date.now() - lastType <= 200) {
            cursorHTML.classList.add('blink')
        }
    }, 200)
}

const handleBackspace = () => {
    const currentText = writtenHTML.textContent
    writtenHTML.textContent = currentText.slice(0, -1)
    const removedChar = currentText.charAt(currentText.length-1)
    yetToWriteHTML.textContent = `${removedChar}${yetToWriteHTML.textContent}`
}

const handleDefaultKeys = (event) => {
    if (event.key == yetToWriteHTML.textContent.charAt(0)) {
        yetToWriteHTML.textContent = yetToWriteHTML.textContent.slice(1)
        writtenHTML.textContent = `${writtenHTML.textContent}${event.key}`
    } else {
        mistakeCounter++
        mistakeCounterHTML.textContent = `${mistakeCounter}`
        cardHTML.classList.add('error')
        setTimeout(() => {
            cardHTML.classList.remove('error')
        }, 100)
    }
}

document.addEventListener('keydown', (event) => {    
    if (event.key == 'Backspace') {
        handleBackspace()
    } else if (event.key.length == 1) {
        handleDefaultKeys(event)
    } else {
        return
    }
    if (!hadInital) {
        startingTime = Date.now()
        hadInital = true
    }
    handleBlink()
    console.log(mistakeCounter)
})