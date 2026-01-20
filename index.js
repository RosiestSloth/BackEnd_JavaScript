import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
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

// Criação da conexão do db
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password
})

// Inicialização e informação do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

/*
    Aplicação
*/

// Simulção de um banco de dados

const users = [
    { id: 1, nome: "Vinicius", tecnologia: "React" },
    { id: 2, nome: "Matheus", tecnologia: "Backend" }
];

// Rota para listar todos os usuários (GET)

app.get('/users', (req, res) => {
    res.json(users);
});