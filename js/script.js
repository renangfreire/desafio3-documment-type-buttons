const testButtons = [...document.querySelector('.buttons').children].map(el => el.children[0])
const columnPrimary = document.querySelector('.column-primary')
const columnSecondary = document.querySelector('.column-secondary')
const columnTertiary = document.querySelector('.column-tertiary')
const columnCursors = document.querySelector('.column-cursors')
const toast = document.querySelector('.toast')

// typesButtons
const buttonsFunctions = {
    defaultButton(e, type, classification, btn){
        btn.classList.add('btn',`${type}`,`${classification}`)
    },
    hoverButton(e, type, classification, btn){
        btn.classList.add('btn',`${type}`,`${classification}`)
    },
    focusButton(e, type, classification, btn){
        btn.classList.add('btn',`${type}`,`${classification}`)
    },
    disabledButton(e, type, classification, btn){
        const button = testButtons.find((el) => el.classList.contains(type))
        btn.classList.add('btn',`${type}`,`${classification}`)
        btn.setAttribute('disabled', '')
        btn.style.cursor = 'url("./img/cursors/notallowed-cursor.svg"), auto'
    },
    loadingButton(e, type, classification, btn){
        const loadingDiv = document.createElement('div')
        loadingDiv.classList.add('loading-spin')

        btn.prepend(loadingDiv)
        
        btn.classList.add('btn',`${type}`,`${classification}`)
        
        btn.style.cursor = 'url("./img/cursors/loading-cursor.svg"), auto'
    },
    movableButton(e, type, classification, btn){
        const movableImage = document.createElement('img')
        movableImage.setAttribute('src', './img/movable-vector.svg')

        btn.prepend(movableImage)

        btn.classList.add('btn',`${type}`,`${classification}`)
        btn.style.cursor = 'url("./img/cursors/movable-cursor.svg"), auto'
    },
    cursorButton(e){
        const pathCursor = e.target.getAttribute('src') || e.target.children[0].getAttribute('src')
        document.querySelector('body').style.cursor = `url(${pathCursor}), auto`
    }
}

const typeToasts = {
    doneToast: {
        img: './img/done-toast.svg',
        message: 'Tudo Certo!'

    },
    errorToast: {
        img: './img/error-toast.svg',
        message: 'Ops! Parece que você já selecionou esse botão.'
    }
}


// Functions
function activeButton(e){
    const clicked = e.target.classList.contains('btn') || e.target.parentElement.classList.contains('btn')
    if(!clicked){
        return
    }

    if(e.target.classList[2]){
    const classificationButtonSelected = e.target.classList[2]
    const typeButtonSelected = e.target.classList[1]
    const buttonSelected = testButtons.find((el) => el.classList.contains(typeButtonSelected))
    showToast(e, classificationButtonSelected, buttonSelected)

    buttonSelected.classList = ''
    buttonSelected.textContent = 'INTERAJA COMIGO'
    buttonSelected.style.cursor = 'pointer'

    buttonsFunctions[classificationButtonSelected + 'Button'](e, typeButtonSelected, classificationButtonSelected, buttonSelected)
    return
   }
    buttonsFunctions.cursorButton(e)
    showToast(e)
    return
}

function showToast(e, classification, button){
    const typeToast = e.target.classList.contains(classification) && button.classList.contains(classification) ? 'errorToast' : 'doneToast' 

    toast.innerHTML = `<img src='${typeToasts[typeToast].img}'><p>${typeToasts[typeToast].message}</p>`

    toast.classList.add('show')

    setTimeout(() => toast.classList.remove('show'), 3000)

}

// Events
columnPrimary.addEventListener('click', activeButton)
columnSecondary.addEventListener('click', activeButton)
columnTertiary.addEventListener('click', activeButton)
columnCursors.addEventListener('click', activeButton)