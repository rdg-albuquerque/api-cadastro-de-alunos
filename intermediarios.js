const express = require('express')
const mid = express()

mid.use((req, res, next) => {
    console.log(req.method, req.body)
    next()
})

mid.use((req, res, next) => {
    if (req.query.senha !== "cubos123") {
        res.status(401)
        res.json({ mensagem: "Você não tem autorização." })
        return
    }
    next()
})

module.exports = mid