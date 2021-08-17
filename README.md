# API - Cadastro de Alunos
Sistema para gerenciamento de cadastro de alunos com algumas validações de requisições e utilizando o padrão Rest.

## Rotas de aplicação
<b>[GET] / </b> : A rota lista todos os alunos cadastrados

<b>[GET] / :id: </b> : A rota retorna o aluno cujo o ID for correspondente ao ID que foi passado como parâmetro do tipo PATH da requisição

<b>[POST] /</b> : A rota recebe um objeto JSON com as propriedades *nome*, *sobrenome*, *idade* e *curso* no corpo da requisição e armazena em um objeto JS.

<b>[DELETE] / :id:</b> : A rota deleta o aluno do sistema caso tenha algum aluno com o ID que foi passado como parâmetro do tipo PATH da requisição

<b>[PATCH] / :id:</b> : A rota atualiza algumas ou todas as informações do aluno cujo o ID for correspondente ao ID que foi passado como parâmetro do tipo PATH da requisição

<b>[PUT] / :id:</b> : A rota atualiza <b>todas</b> as informações do aluno cujo o ID for correspondente ao ID que foi passado como parâmetro do tipo PATH da requisição

---
## Validações

A API valida o corpo das requisições das rotas POST, PATCH e PUT para não proceder caso ocorra algumas das situações abaixo:

- Algumas das propriedades não foram passadas na requisição no caso do POST e PUT
- As propriedades nome, sobrenome e curso não forem uma string ou forem uma string vazia/somente com espaços.
- A propriedade idade não for do tipo number
- O nome e sobrenome forem iguais ao nome e sobrenome de alguma pessoa que já foi cadastrada
- A idade do aluno for menor que 18 anos
- O valor da propriedade *curso* da requisição não esteja incluído no array de cursos válidos presente no arquivo cursos.js

## Tecnologias utilizadas

<b>Linguagem</b>: Javascript
<b>Bibliotecas</b>: Express e fs.

## Contato

Linkedin : https://www.linkedin.com/in/rodrigo-albuquerque-dev/
E-mail: rodrigomedeiros4996@gmail.com