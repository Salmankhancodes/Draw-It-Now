const express = require('express')
const socket = require('socket.io')
const app = express()

const port = 5000

app.use(express.static('public'))

let server = app.listen(port, () => {
  console.log('listening on server')
})

let io = socket(server)
io.on('connection', (socket) => {
  console.log('made connection')
  socket.on('beginPath', (data) => {
    io.emit('beginPath', data)
  })
  socket.on('drawStroke', (data) => {
    io.emit('drawStroke', data)
  })
  socket.on('undoRedoCanvas', (data) => {
    io.emit('undoRedoCanvas', data)
  })
})
