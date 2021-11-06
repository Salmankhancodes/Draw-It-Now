let canvas = document.querySelector('canvas')
let allColors = document.querySelectorAll('.pencil-color')
let pencilWidth = document.querySelector('.pencil-width')
let eraserWidth = document.querySelector('.eraser-width')
let undo = document.querySelector('.undo')
let redo = document.querySelector('.redo')
let pencilWidthValue = pencilWidth.value
let selectedColor

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let undoRedoTracker = [] //Data
let track = 0 // Represent which action from tracker array

let mousedown = false

let tool = canvas.getContext('2d')
tool.strokeStyle = 'white'
tool.lineWidth = '3'

canvas.addEventListener('mousedown', (e) => {
  tool.beginPath()
  tool.moveTo(e.clientX, e.clientY)
  mousedown = true
})

allColors.forEach((eachColor) => {
  eachColor.addEventListener('click', (e) => {
    selectedColor = eachColor.classList[0]
    tool.strokeStyle = selectedColor
  })
})

pencilWidth.addEventListener('change', (e) => {
  tool.lineWidth = pencilWidth.value
})

eraserWidth.addEventListener('change', (e) => {
  tool.lineWidth = eraserWidth.value
})

canvas.addEventListener('mousemove', (e) => {
  if (mousedown) {
    tool.lineTo(e.clientX, e.clientY)
    tool.stroke()
  }
})

canvas.addEventListener('mouseup', (e) => {
  mousedown = false
  let url = canvas.toDataURL()
  undoRedoTracker.push(url)
  track = undoRedoTracker.length - 1
})

undo.addEventListener('click', (e) => {
  if (track > 0) track--
  let data = {
    trackValue: track,
    undoRedoTracker,
  }
  undoRedoCanvas(data)
})
redo.addEventListener('click', (e) => {
  if (track < undoRedoTracker.length - 1) track++
  let data = {
    trackValue: track,
    undoRedoTracker,
  }
  undoRedoCanvas(data)
})

function undoRedoCanvas(trackObj) {
  track = trackObj.trackValue
  undoRedoTracker = trackObj.undoRedoTracker
  let url = undoRedoTracker[track]
  let img = new Image()
  img.src = url
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height)
  }
}

eraser.addEventListener('click', (e) => {
  if (eraserToggle) {
    tool.strokeStyle = '#596275'
    tool.lineWidth = eraserWidth.value
  } else {
    tool.strokeStyle = selectedColor
    tool.lineWidth = pencilWidthValue
  }
})
