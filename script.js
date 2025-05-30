const gridContainer = document.querySelector('.grid-container');
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = `Score: ${score}`;

fetch("./data/cards.json")
    .then(response => response.json())
    .then(data => {
        const cardValues = data.cards;
        const cardPairs = [...cardValues, ...cardValues];
        cardPairs.sort(() => Math.random() - 0.5);

        cardPairs.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;
            card.innerHTML = `<span class="front">${value}</span>`;
            card.addEventListener('click', flipCard);
            gridContainer.appendChild(card);
            cards.push(card);
        });
    })
    .catch(error => console.error('Error loading cards:', error));

document.querySelector(".reset").addEventListener("click", resetGame);

function createCards() {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
    const cardPairs = [...cardValues, ...cardValues];
    cardPairs.sort(() => Math.random() - 0.5);

    cardPairs.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = `<span class="front">${value}</span>`;
        card.addEventListener('click', flipCard);
        gridContainer.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        score += 10;
        document.querySelector(".score").textContent = `Score: ${score}`;
        resetCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function resetGame() {
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
    cards = [];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    score = 0;
    document.querySelector(".score").textContent = `Score: ${score}`;
    gridContainer.innerHTML = '';
    createCards();
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    createCards();
});
