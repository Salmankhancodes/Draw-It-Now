let optionContainer = document.querySelector('.option-cont')
let toolboxContainer = document.querySelector('.toolbox-cont')
let penciloptioncont = document.querySelector('.pencil-options-cont')
let eraseroptioncont = document.querySelector('.eraser-options-cont')
let pencil = document.querySelector('.pencil')
let eraser = document.querySelector('.eraser')
let sticky = document.querySelector('.sticky')
let upload = document.querySelector('.upload')
let download = document.querySelector('.download')

let optionToggle = true
let pencilToggle = false
let eraserToggle = false
let minimize = false

optionContainer.addEventListener('click', (e) => {
  let optionIcon = optionContainer.children[0]
  optionToggle = !optionToggle
  if (optionToggle) {
    toolboxContainer.style.display = 'flex'
    optionIcon.classList.remove('fa-times')
    optionIcon.classList.add('fa-bars')
  } else {
    toolboxContainer.style.display = 'none'
    optionIcon.classList.add('fa-times')
    optionIcon.classList.remove('fa-bars')
    penciloptioncont.style.display = 'none'
    eraseroptioncont.style.display = 'none'
  }
})

pencil.addEventListener('click', (e) => {
  pencilToggle = !pencilToggle
  if (pencilToggle) {
    penciloptioncont.style.display = 'block'
  } else {
    penciloptioncont.style.display = 'none'
  }
})

eraser.addEventListener('click', (e) => {
  eraserToggle = !eraserToggle
  if (eraserToggle) {
    eraseroptioncont.style.display = 'block'
  } else {
    eraseroptioncont.style.display = 'none'
  }
})

upload.addEventListener('click', (e) => {
  let uploadCont = document.createElement('input')
  uploadCont.setAttribute('type', 'file')
  uploadCont.click()
  uploadCont.addEventListener('change', (e) => {
    let image = uploadCont.files[0]
    const url = URL.createObjectURL(image)
    // let url = URL.createObjectURL(image)
    let stickyElement = document.createElement('div')
    stickyElement.setAttribute('class', 'sticky-cont')
    stickyElement.innerHTML = `
  <div class="sticky-header">
  <div class="minimizenote"></div>
  <div class="removenote"></div>
  </div>
  <div class="sticky-text">
  <img src="${url}"/>
  </div>`
    document.body.appendChild(stickyElement)

    stickyElement.onmousedown = function (event) {
      draganddrop(event, stickyElement)
    }

    stickyElement.ondragstart = function () {
      return false
    }
  })
})

sticky.addEventListener('click', (e) => {
  let stickyElement = document.createElement('div')
  stickyElement.setAttribute('class', 'sticky-cont')
  createStickyElement(stickyElement)
})

function createStickyElement(stickyElement) {
  stickyElement.innerHTML = `
  <div class="sticky-header">
  <div class="minimizenote"></div>
  <div class="removenote"></div>
  </div>
  <div class="sticky-text">
  <textarea spellcheck="false"></textarea>
  </div>`
  document.body.appendChild(stickyElement)
  let minimizenote = stickyElement.querySelector('.minimizenote')
  let removeenote = stickyElement.querySelector('.removenote')

  stickyAction(stickyElement, minimize, removeenote)
  stickyElement.onmousedown = function (event) {
    draganddrop(event, stickyElement)
  }

  stickyElement.ondragstart = function () {
    return false
  }
}

function stickyAction(element, minimize, remove) {
  remove.addEventListener(
    'click',
    (e) => {
      element.remove()
    },
    true
  )
}

function draganddrop(event, ball) {
  let shiftX = event.clientX - ball.getBoundingClientRect().left
  let shiftY = event.clientY - ball.getBoundingClientRect().top

  ball.style.position = 'absolute'
  ball.style.zIndex = 1000
  document.body.append(ball)

  moveAt(event.pageX, event.pageY)

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px'
    ball.style.top = pageY - shiftY + 'px'
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY)
  }

  document.addEventListener('mousemove', onMouseMove)

  ball.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove)
    ball.onmouseup = null
  }
}

download.addEventListener('click', (e) => {
  let url = canvas.toDataURL()
  let a = document.createElement('a')
  a.href = url
  a.download = 'board.jpeg'
  a.click()
})
