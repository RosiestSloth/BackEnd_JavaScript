import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
const prisma = new PrismaClient();
const port = 3000;

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
    const { tech } = req.query; // filtra os dados depois do ? na url

    let filtro = {} // WHERE e começa vazio

    if (tech) {
        // Se o usuário enviou "?tech=...", adicionamos a regra

        filtro = {
            tecnologia: tech
        };
    }

    const listaDoBanco = await prisma.user.findMany({
        where: filtro
    });

    const listaFormatada = listaDoBanco.map(usuario => {
        return {
            nome_visual: usuario.nome,
            stack: usuario.tecnologia
        };
    });

    res.json(listaFormatada);
});
