let canvas = document.querySelector('canvas')
let allColors = document.querySelectorAll('.pencil-color')
let pencilWidth = document.querySelector('.pencil-width')
let eraserWidth = document.querySelector('.eraser-width')
let undo = document.querySelector('.undo')
let redo = document.querySelector('.redo')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let pencilColor = 'white'
let eraserColor = '#596275'

let pencilWidthValue = pencilWidth.value
let eraserWidthValue = eraserWidth.value

let undoRedoTracker = [] //Data
let track = 0 // Represent which action from tracker array

allColors.forEach((eachColor) => {
  eachColor.addEventListener('click', (e) => {
    pencilColor = eachColor.classList[0]
    console.log(pencilWidthValue, pencilColor)
  })
})

pencilWidth.addEventListener('change', (e) => {
  pencilWidthValue = pencilWidth.value
})

let mousedown = false

let tool = canvas.getContext('2d')
tool.strokeStyle = pencilColor
tool.lineWidth = pencilWidthValue

canvas.addEventListener('mousedown', (e) => {
  mousedown = true
  let data = {
    x: e.clientX,
    y: e.clientY,
  }
  beginPath(data)
  socket.emit('beginPath', data)
})

canvas.addEventListener('mousemove', (e) => {
  if (mousedown) {
    let data = {
      x: e.clientX,
      y: e.clientY,
      color: eraserToggle ? eraserColor : pencilColor,
      width: eraserToggle ? eraserWidthValue : pencilWidthValue,
    }
    socket.emit('drawStroke', data)
    // drawStroke(data)
  }
})

canvas.addEventListener('mouseup', (e) => {
  mousedown = false
  let url = canvas.toDataURL()
  undoRedoTracker.push(url)
  track = undoRedoTracker.length - 1
})

function beginPath(strokeObj) {
  tool.beginPath()
  tool.moveTo(strokeObj.x, strokeObj.y)
}

function drawStroke(strokeObj) {
  tool.strokeStyle = strokeObj.color
  tool.lineWidth = strokeObj.width
  tool.lineTo(strokeObj.x, strokeObj.y)
  tool.stroke()
}

eraserWidth.addEventListener('change', (e) => {
  eraserWidthValue = eraserWidth.value
  console.log(eraserWidth, eraserToggle)
})

undo.addEventListener('click', (e) => {
  if (track > 0) track--
  let data = {
    trackValue: track,
    undoRedoTracker,
  }
  socket.emit('undoRedoCanvas', data)
  // undoRedoCanvas(data)
})
redo.addEventListener('click', (e) => {
  if (track < undoRedoTracker.length - 1) track++
  let data = {
    trackValue: track,
    undoRedoTracker,
  }
  // undoRedoCanvas(data)
  socket.emit('undoRedoCanvas', data)
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

socket.on('beginPath', (data) => {
  beginPath(data)
})

socket.on('drawStroke', (data) => {
  drawStroke(data)
})

socket.on('undoRedoCanvas', (data) => {
  undoRedoCanvas(data)
})

// eraser.addEventListener('click', (e) => {
//   if (eraserToggle) {
//     tool.strokeStyle = eraserColor
//     tool.lineWidth = eraserWidthValue
//   } else {
//     tool.strokeStyle = pencilColor
//     tool.lineWidth = pencilWidthValue
//   }
// })
