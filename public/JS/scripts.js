// path
const path = location.pathname
const menu = document.querySelectorAll('header .navbar a')

for(item of menu){
    if(path.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}

// cards admin
const cardsIndex = document.querySelectorAll('.view-recipe')
    for(let i = 0; i < cardsIndex.length; i++){
    const recipeIndex = cardsIndex[i]
        
    recipeIndex.addEventListener('click', ()=>{
            window.location.href = `/admin/recipes/${i}`
    })  
}

//Show or Hide recipe informations
for (let i = 0; i < document.querySelectorAll('.details-header').length; i++){
const recipeIngredients = document.querySelector('.recipe-ingredients')
const recipePreparation = document.querySelector('.recipe-preparation')
const recipeInformation = document.querySelector('.recipe-information')

function showOrHide(event){
        event.classList.toggle('hide')
        if(event.querySelector('span').textContent == 'Mostrar'){
            event.querySelector('span').textContent = 'Esconder'     
        } else{
            event.querySelector('span').textContent = 'Mostrar'
        }
    }
recipeIngredients.querySelector('.details-header').addEventListener('click', () => showOrHide(recipeIngredients) )
recipePreparation.querySelector('.details-header').addEventListener('click', () => showOrHide(recipePreparation) )
recipeInformation.querySelector('.details-header').addEventListener('click', () => showOrHide(recipeInformation) )
}

// Add Inputs

function addInput(field, container){
    const fieldInput = field
    const fieldContainer = container
    
    const newInput = fieldContainer[fieldContainer.length -1].cloneNode(true)

    if(newInput.children[0].value == "") return false

    newInput.children[0].value = ''
    fieldInput.appendChild(newInput)
}

document.querySelector('.add-ingredient').addEventListener('click', () => 
addInput(document.querySelector('#ingredients'), document.querySelectorAll('.ingredient')))

document.querySelector('.add-step').addEventListener('click', () => 
addInput(document.querySelector('#preparations'), document.querySelectorAll('.step')))

// delete confirmation
document.querySelector('#form-delete').addEventListener('submit', (event)=>{
    const confirmation = confirm('Deseja realmente deletar?')
    if(!confirmation) event.preventDefault()
})