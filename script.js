const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

//list of words for game 
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
]

//init word, score, time
let randomWord, score = 0, time = 10,
    difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

difficultySelect.value = difficulty

//focus text on start
text.focus()

//start counting down
const timeInterval = setInterval(updateTime, 1000)

//generate random word
const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)]
}

//add word to DOM
addWordToDOM = () => {
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}

const updateScore = () => {
    score++
    scoreEl.innerHTML = score
}

function updateTime() {
    time--
    timeEl.innerHTML = time + 's'
    if (time === 0) clearInterval(timeInterval), gameOver()
}

const gameOver = () => {
    endgameEl.innerHTML =
        `<h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>`

    endgameEl.style.display = 'flex'
}

//event listener 
text.addEventListener('input', e => {
    const insertedText = e.target.value
    if (insertedText === randomWord) {
        addWordToDOM()
        updateScore()
        e.target.value = ''

        if (difficulty === 'hard') {
            time += 2
        } else if (difficulty === 'medium') {
            time += 3
        } else {
            time += 5
        }
        updateTime()
    }
})

//settings
settingsBtn.addEventListener('click', e => {
    settings.classList.toggle('hide')
})

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})

addWordToDOM()
