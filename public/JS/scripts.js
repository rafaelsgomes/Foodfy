// path
const path = location.pathname
const menu = document.querySelectorAll('header .navbar a')

for(item of menu){
    if(path.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
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
const formCreate = document.querySelector('#form-create')
function addInput(field, container){
    const fieldInput = field
    const fieldContainer = container
    
    const newInput = fieldContainer[fieldContainer.length -1].cloneNode(true)

    if(newInput.children[0].value == "") return false

    newInput.children[0].value = ''
    fieldInput.appendChild(newInput)
}

if(formCreate){
document.querySelector('.add-ingredient').addEventListener('click', () => 
addInput(document.querySelector('#ingredients'), document.querySelectorAll('.ingredient')))

document.querySelector('.add-step').addEventListener('click', () => 
addInput(document.querySelector('#preparations'), document.querySelectorAll('.step')))
}
const formDelete = document.querySelector('#form-delete')

if(formDelete){
    // delete confirmation
document.querySelector('#form-delete').addEventListener('submit', (event)=>{
    const confirmation = confirm('Deseja realmente deletar?')
    if(!confirmation) event.preventDefault()
})
}


// Pagination
const pagination = document.querySelector('.pagination')
function paginate(pagination){
    const totalPage = pagination.dataset.total
    let currentpage = pagination.dataset.page
    const search = pagination.dataset.search
    
    const controlsElements = {
        getElements(element){
            return document.querySelector(element)
        }
    }
    const controls = {
        next(){
            currentpage++
            if(currentpage > totalPage) currentpage--
            if(search){
                window.location.href=`?search=${search}&page=${currentpage}`
            }else{
                window.location.href=`?page=${currentpage}`
            }
        },
        prev(){
            currentpage--
            if(currentpage < 1) currentpage++
            if(search){
                window.location.href=`?search=${search}&page=${currentpage}`
            }else{
                window.location.href=`?page=${currentpage}`
            }
        },
        goTo(page){
            if(page < 1) page = 1
            currentpage = +page
            
            if(page > totalPage) currentpage = totalPage
            if(search){
                window.location.href=`?search=${search}&page=${currentpage}`
            }else{
                window.location.href=`?page=${currentpage}`
            }
        },
        listeners(){
            controlsElements.getElements('.first').addEventListener('click',()=>{
                controls.goTo(1)
                updatePage()
            })
    
            controlsElements.getElements('.last').addEventListener('click',()=>{
                controls.goTo(totalPage)
                updatePage()
            })
    
            controlsElements.getElements('.next').addEventListener('click',()=>{
                controls.next()
                updatePage()
            })
    
            controlsElements.getElements('.prev').addEventListener('click',()=>{
                controls.prev()
                updatePage()
            })
        }
    }
    const buttons = {
        element: controlsElements.getElements('.pages-list'),
        createButtons(page){
            const button = document.createElement('div')
            button.innerHTML = page

            if(currentpage == page){
                button.classList.add('active-item-control')
            }

            button.addEventListener('click', ()=>{
                if(search){
                    window.location.href=`?search=${search}&page=${page}`
                }else{
                    window.location.href=`?page=${page}`
                }
                update()
            })
            buttons.element.appendChild(button)
            
        },
        update(){
            const {left, right} = buttons.maxButtons()
            buttons.element.innerHTML = ''
            for(page = left; page <= right; page++){
                buttons.createButtons(page)
                
            }
        },
        maxButtons(){
            let left = (currentpage - Math.floor(5 / 2))
            let right = (currentpage + Math.floor(5 / 2))

            if(left < 1){
                left = 1
                right = 5
            }
            if(right > totalPage){
                left = totalPage - (5 - 1)
                right = totalPage

                if(left < 1) left = 1
            }
            return {left, right}
        }
    }
        controls.listeners()
        buttons.update() 

    function update(){
        buttons.update() 
    }
}

if(pagination){
    paginate(pagination)
    const paginationNumbers = document.querySelectorAll('.pages-list div')
    for (item of paginationNumbers){
    item.classList.add('item-control')
    }
}
