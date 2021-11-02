let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let tool = canvas.getContext('2d')
tool.strokeStyle = 'red'
tool.lineWidth = '13'
tool.beginPath()
tool.moveTo(100, 100)
tool.lineTo(200, 200)
tool.stroke()
// tool.beginPath()
tool.lineTo(200, 800)
tool.stroke()
