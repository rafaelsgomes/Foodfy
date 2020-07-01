const recipeingredients = document.querySelector('.recipe-ingredients')
const recipePreparation = document.querySelector('.recipe-preparation')
const recipeInformation = document.querySelector('.recipe-information')
const detailsHeader = document.querySelectorAll('.details-header')

function showOrHide(event){
    for (let i = 0; i < detailsHeader.length; i++){
        const showOrHide = event
        event.classList.toggle('hide')
        
        if(showOrHide.querySelector('span').textContent == 'Mostrar'){
            showOrHide.querySelector('span').textContent = 'Esconder'
            
        } else{
            showOrHide.querySelector('span').textContent = 'Mostrar'
        }

    }
}

recipeingredients.querySelector('.details-header').addEventListener('click', () => {
    showOrHide(recipeingredients)
})

recipePreparation.querySelector('.details-header').addEventListener('click', () => {
    showOrHide(recipePreparation)
})

recipeInformation.querySelector('.details-header').addEventListener('click', () => {
    showOrHide(recipeInformation)
})



