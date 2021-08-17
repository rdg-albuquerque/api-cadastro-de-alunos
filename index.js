const express = require('express')
const app = express()
const roteador = require('./roteadores')
const mid = require('./intermediarios')

app.use(express.json())

app.use(mid)

app.use(roteador)

app.listen(8000)