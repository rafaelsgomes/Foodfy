const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (card of cards){
    const cardImage = card.querySelector('.card-image').getAttribute('src')
    const cardTitle = card.querySelector('.recipe-title').textContent
    const cardAuthor = card.querySelector('.recipe-author').textContent

    card.addEventListener('click', () => {
        modalOverlay.classList.add('active')
        modalOverlay.querySelector('img').src = `${cardImage}`
        modalOverlay.querySelector('h2').innerHTML = `${cardTitle}`
        modalOverlay.querySelector('h5').innerHTML = `${cardAuthor}`
    })
}

for(let i = 0; i < cards.length; i++){
    const recipe = cards[i]
    
    recipe.addEventListener('click', ()=>{ 
        modalOverlay.querySelector('.view-recipes').addEventListener('click', ()=>{
            window.location.href = `/recipe/${i}`
        })
    })  
}

document.querySelector('.close-modal').addEventListener('click', ()=>{
    modalOverlay.classList.remove('active')
})