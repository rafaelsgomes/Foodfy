const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (card of cards){
    const recipeId = card.getAttribute('id')
    card.addEventListener('click', () => {
        modalOverlay.classList.add('active')
        modalOverlay.querySelector('img').src = `../public/assets/${recipeId}.png`
    })
}

document.querySelector('.close-modal').addEventListener('click', ()=>{
    modalOverlay.classList.remove('active')
})