const fs = require('fs')

const alunos = JSON.parse(fs.readFileSync('./dados/alunos.json'))

const cursos = require("../dados/cursos")

/*
 VALIDAÇÕES
 */


const buscarAluno = (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400)
        res.json({ mensagem: 'O ID deve ser um número válido' })
        return
    }
    const aluno = alunos.find(aluno => aluno.id === Number(req.params.id))
    if (!aluno) {
        res.status(404)
        res.json({ mensagem: 'Aluno não encontrado' })
        return
    }
    return aluno
}

const validarReq = (params, res) => {
    const nome = params.nome
    const sobrenome = params.sobrenome
    const idade = params.idade
    const curso = params.curso
    const propriedadesEsperadas = ["nome", "sobrenome", "idade", "curso"]
    const propriedades = [nome, sobrenome, idade, curso]
    if (!nome || !sobrenome || !idade || !curso) {
        res.json({ mensagem: "Verifique se os campos 'nome', 'sobrenome', 'idade e 'curso' foram preenchidos" })
    }
    for (i = 0; i < propriedades.length; i++) {
        if (i !== 2) {
            if (typeof propriedades[i] === "number") {
                res.status(400)
                res.json({ mensagem: `O campo ${propriedadesEsperadas[i]} deve ser uma string` })
                return
            }
            else {
                const temLetra = propriedades[i].split('').find(letra => letra !== " ")
                if (!propriedades[i] || !temLetra || propriedades[i] === "") {
                    res.status(400)
                    res.json({ mensagem: `O campo ${propriedadesEsperadas[i]} não foi preenchido ou contém apenas espaços` })
                    return
                }
            }
        }
    }
    const jaEstaCadastrada = alunos.find(aluno => {
        if (aluno.nome.toLowerCase() === nome.toLowerCase() && aluno.sobrenome.toLowerCase() === sobrenome.toLowerCase()) return aluno
    })
    if (jaEstaCadastrada) {
        res.status(400)
        res.json({ mensagem: 'Esta pessoa já foi cadastrada' })
        return
    }
    if (!idade || typeof idade !== "number") {
        res.status(400)
        res.json({ mensagem: `O campo idade NÃO deve ser string` })
        return
    }
    if (idade < 18) {
        res.status(400)
        res.json({ mensagem: `O aluno não pode ser menor de idade` })
        return
    }

    if (!cursos.includes(curso.toLowerCase())) {
        res.status(400)
        res.json({ mensagem: 'O curso informado não é um curso válido' })
        return


    }
    return true
}

const writeFile = () => {
    fs.writeFileSync('./dados/alunos.json', JSON.stringify(alunos, null, 2))
}


/*
 CONTROLADORES
 */

const showall = (req, res) => {
    res.json(alunos)
}

const mostrarAluno = (req, res) => {
    const aluno = buscarAluno(req, res)
    if (!aluno) {
        return
    }
    res.json(aluno)
}

let proxID
try {
    proxID = alunos[alunos.length - 1].id + 1
} catch {
    proxID = 0
}

const addAluno = (req, res) => {
    const postValidado = validarReq(req.body, res)
    if (!postValidado) return

    const novoAluno = {
        id: proxID,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        curso: req.body.curso
    }
    proxID++
    alunos.push(novoAluno)
    res.status(201)
    res.json({ mensagem: 'Aluno adicionado' })
    writeFile()
}

const deletar = (req, res) => {
    const aluno = buscarAluno(req, res)
    if (!aluno) {
        return
    }
    const index = alunos.findIndex(aluno => aluno.id === Number(req.params.id))
    alunos.splice(index, 1)
    res.json({ mensagem: "Aluno excluído com sucesso." })
    writeFile()
}

const editar = (req, res) => {
    const aluno = buscarAluno(req, res)
    const patchValidado = validarReq({
        nome: req.body.nome ?? aluno.nome,
        sobrenome: req.body.sobrenome ?? aluno.sobrenome,
        idade: req.body.idade ?? aluno.idade,
        curso: req.body.curso ?? aluno.curso
    }, res)
    if (!aluno || !patchValidado) return

    aluno.nome = req.body.nome ?? aluno.nome
    aluno.sobrenome = req.body.sobrenome ?? aluno.sobrenome
    aluno.idade = req.body.idade ?? aluno.idade
    aluno.curso = req.body.curso ?? aluno.curso

    res.json(aluno)
    writeFile()
}

const substituir = (req, res) => {
    const aluno = buscarAluno(req, res)
    const putValidado = validarReq(req.body, res)

    if (!aluno || !putValidado) return

    aluno.id = req.body.id
    aluno.nome = req.body.nome
    aluno.sobrenome = req.body.sobrenome
    aluno.idade = req.body.idade
    aluno.curso = req.body.curso

    res.json(aluno)
    writeFile()
}

module.exports = {
    showall,
    mostrarAluno,
    addAluno,
    deletar,
    editar,
    substituir
}