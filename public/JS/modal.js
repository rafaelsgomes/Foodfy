const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (card of cards){
    const recipeImage = card.querySelector('.card-image').getAttribute('src')
    const recipeTitle = card.querySelector('.recipe-title').textContent
    const recipeAuthor = card.querySelector('.recipe-author').textContent
    const recipeId = card.dataset.id
    card.addEventListener('click', () => {
        modalOverlay.classList.add('active')
        modalOverlay.querySelector('img').src = `${recipeImage}`
        modalOverlay.querySelector('h2').innerHTML = `${recipeTitle}`
        modalOverlay.querySelector('h5').innerHTML = `${recipeAuthor}`
        
        modalOverlay.querySelector('.view-recipes').addEventListener('click', ()=>{
            window.location.href = `/recipe/${recipeId}`
            
        })
    })

    document.querySelector('.close-modal').addEventListener('click', ()=>{
        modalOverlay.classList.remove('active')
    })
}

