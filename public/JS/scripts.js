// path
const path = location.pathname
const menu = document.querySelectorAll('header .navbar a')

for(item of menu){
    if(path.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}
//Show or Hide recipe informations
const ShowOrHide = {
    showOrHide(event){
        event.parentNode.classList.toggle('hide')
        if(event.querySelector('span').textContent == 'Mostrar'){
            event.querySelector('span').textContent = 'Esconder'     
        } else{
            event.querySelector('span').textContent = 'Mostrar'
        }
    },
    targetEvent(event){
        const target = event.target.parentNode
        ShowOrHide.showOrHide(target)
    }
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

// Add Inputs
const AddInputs = {
    addInput(field, container){
        const fieldInput = field
        const fieldContainer = container
        
        const newInput = fieldContainer[fieldContainer.length -1].cloneNode(true)
    
        if(newInput.children[0].value == "") return false
    
        newInput.children[0].value = ''
        fieldInput.appendChild(newInput)
    },
    buttonAdd(event){
        const target = event.target.parentNode.children[1]
        const ingredient = document.querySelectorAll('.ingredient')
        const preparation =  document.querySelectorAll('.step')
        if(target.getAttribute("id") == "ingredients"){
            AddInputs.addInput(target, ingredient)
        }else{
            AddInputs.addInput(target, preparation)
        }
    }
}
// Delete Confirmation
const formDelete = document.querySelector('#form-delete')
if(formDelete){  
    document.querySelector('#form-delete').addEventListener('submit', (event)=>{
        const confirmation = confirm('Deseja realmente deletar?')
        if(!confirmation) event.preventDefault()
    })
}

const ImagesUpload = {
    preview: document.querySelector('#images-preview'),
    limit: 5,
    input: '',
    files: [],
    filesInput(event){
        const {files: fileList} = event.target
        const {preview} = ImagesUpload

        ImagesUpload.input = event.target

        if(ImagesUpload.uploadLimit(event)) return

        Array.from(fileList).forEach(file =>{
            ImagesUpload.files.push(file)

            const reader = new FileReader()
            reader.onload = ()=>{   
                const image = new Image()
                image.src = String(reader.result)

                const container = document.createElement('div')
                container.classList.add('image')

                container.onclick = ImagesUpload.removeImage
                container.appendChild(image)
                container.appendChild(ImagesUpload.removeButton())

               preview.appendChild(container)
            }
            reader.readAsDataURL(file)
        })
        ImagesUpload.input.files = ImagesUpload.allFiles()
    },
    allFiles(){
        const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

        ImagesUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    uploadLimit(event){
        const {limit, input, preview} = ImagesUpload
        const {files: fileList} = input
        
        if(fileList.length > limit){
            alert(`Envie no máximo ${limit} imagens`)
            event.preventDefault()
            return true
        }

        const imagesArray = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "image"){
                imagesArray.push(item)
            }
        })

        const totalImages = fileList.length + imagesArray.length

        if(totalImages > limit){
            alert(`Envie no máximo ${limit} imagens`)
            event.preventDefault()
            return true
        }

        return false
    },
    removeButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "delete_outline"
        return button
    },
    removeImage(event){
        const imageDiv = event.target.parentNode
        const imagesArray = Array.from(ImagesUpload.preview.children)
        const index = imagesArray.indexOf(imageDiv)

        ImagesUpload.files.splice(index, 1)
        ImagesUpload.input.files = ImagesUpload.allFiles()

        imageDiv.remove()
    }
}