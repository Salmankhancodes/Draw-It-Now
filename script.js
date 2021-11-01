let optionContainer = document.querySelector('.option-cont')
let toolboxContainer = document.querySelector('.toolbox-cont')
let penciloptioncont = document.querySelector('.pencil-options-cont')
let eraseroptioncont = document.querySelector('.eraser-options-cont')
let pencil = document.querySelector('.pencil')
let eraser = document.querySelector('.eraser')
let sticky = document.querySelector('.sticky')

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

sticky.addEventListener('click', (e) => {
  stickyElement = document.createElement('div')
  stickyElement.classList.add('sticky-cont')
  stickyElement.innerHTML = `
  <div class="sticky-header">
  <div class="minimizenote"></div>
  <div class="removenote"></div>
  </div>
  <div class="sticky-text">
  <textarea></textarea>
  </div>`
  document.body.appendChild(stickyElement)
  let minimizenote = document.querySelector('.minimizenote')
  let removenote = document.querySelector('.removenote')
  stickyActions(minimizenote, removenote, stickyElement)
})

function stickyActions(minimizenote, removenote, container) {
  removenote.addEventListener('click', (e) => {
    container.remove()
  })
  minimizenote.addEventListener('click', (e) => {
    // minimize = !minimize
    let stickytext = container.querySelector('.sticky-text')
    let display = getComputedStyle(stickytext).getPropertyValue('display')
    if (display === 'block') stickytext.style.display = 'none'
    else stickytext.style.display = 'block'
  })
}
