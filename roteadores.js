const express = require('express')
const roteador = express()
const { showall, mostrarAluno, addAluno, deletar, editar, substituir } = require('./controladores/alunos')


roteador.get('/', showall)

roteador.get('/:id', mostrarAluno)

roteador.post('/', addAluno)

roteador.delete('/:id', deletar)

roteador.patch('/:id', editar)

roteador.put('/:id', substituir)

module.exports = roteador