let optionContainer = document.querySelector('.option-cont')
let toolboxContainer = document.querySelector('.toolbox-cont')
let penciloptioncont = document.querySelector('.pencil-options-cont')
let eraseroptioncont = document.querySelector('.eraser-options-cont')
let pencil = document.querySelector('.pencil')
let eraser = document.querySelector('.eraser')
let sticky = document.querySelector('.sticky')
let upload = document.querySelector('.upload')

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

    let minimizenote = document.querySelector('.minimizenote')
    let removenote = document.querySelector('.removenote')
    stickyActions(minimizenote, removenote, stickyElement)

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

  let minimizenote = document.querySelector('.minimizenote')
  let removenote = document.querySelector('.removenote')

  stickyElement.onmousedown = function (event) {
    draganddrop(event, stickyElement)
  }

  stickyElement.ondragstart = function () {
    return false
  }
  stickyActions(minimizenote, removenote, stickyElement)
}

function draganddrop(event, ball) {
  let shiftX = event.clientX - ball.getBoundingClientRect().left
  let shiftY = event.clientY - ball.getBoundingClientRect().top

  ball.style.position = 'absolute'
  ball.style.zIndex = 1000
  document.body.append(ball)

  moveAt(event.pageX, event.pageY)

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px'
    ball.style.top = pageY - shiftY + 'px'
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY)
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove)

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove)
    ball.onmouseup = null
  }
}

function stickyActions(minimizenote, removenote, container) {
  removenote.addEventListener('click', (e) => {
    container.remove()
  })
  minimizenote.addEventListener('click', (e) => {
    // minimize = !minimize

    let stickytext = container.querySelector('.sticky-text')
    let display = getComputedStyle(stickytext).getPropertyValue('display')
    if (display === 'block') stickytext.style.display = 'none'
    else if (display === 'none') stickytext.style.display = 'block'
  })
}
