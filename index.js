import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const app = express();
const prisma = new PrismaClient();
const port = 3000;
app.use(cors())

// Tradução de dados json para que o express consiga interpretá-los
app.use(express.json());

// Rota principal em / para indicar o funcionamento da API
app.get('/', (req, res) => {
    res.json({
        mensagem: "API está funcionando",
        status: 200
    });
});

// Inicialização e informação do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

/*
    Aplicação
*/

// Simulção de um banco de dados

// Rota para listar todos os usuários (GET)

app.get('/users', async (req, res) => {

    // Exemplo de uso: http://localhost:3000/users?tech=React
    const { tech, id, name } = req.query; // filtra os dados depois do ? na url

    let filtro = {} // WHERE e começa vazio

    if (tech) {
        // Se o usuário enviou "?tech=...", adicionamos a regra

        filtro = {
            tecnologia: tech
        };
    } else if (id) {
        // Filtro para o id

        filtro = {
            id: parseInt(id)
        }
    } else if (name) {
        // Filtro para o nome

        filtro = {
            nome: name
        }
    }

    const users = await prisma.user.findMany({
        where: filtro
    });

    const listaFormatada = users.map(usuario => {
        return {
            nome: usuario.nome,
            stack: usuario.tecnologia,
            email: usuario.email,
            idade: usuario.age
        };
    });

    res.status(200).json(listaFormatada);
});

app.post('/users', async (req, res) => {

    // await para esperar o db responder
    await prisma.user.create({
        data: {
            email: req.body.email, // requisição que pega os dados do body com o identificador de "email" do json
            nome: req.body.nome,
            tecnologia: req.body.tecnologia,
            age: req.body.age
        }
    });

    res.status(201).json(req.body)
});

app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            email: req.body.email,
            nome: req.body.nome,
            tecnologia: req.body.tecnologia,
            age: req.body.age
        }
    });

    res.status(200).json({ message: "Usuário atualizado com sucesso" });
});

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    res.status(200).json({ message: 'Usuário deletado com sucesso!'})
});