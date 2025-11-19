const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
// Simple CORS middleware to allow the local HTML page to call the API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});
const PORT = 3663;

app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS, etc.) da pasta raiz
app.use(express.static(__dirname));

const DATA_DIR = path.join(__dirname, 'dados-salvos');

// Garante que a pasta de dados exista
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Listar todos os cards
app.get('/cards', (req, res) => {
    fs.readdir(DATA_DIR, (err, files) => {
        if (err) return res.status(500).json({ error: 'Erro ao ler pasta' });
        const cards = [];
        files.forEach(file => {
            if (file.endsWith('.json')) {
                const content = fs.readFileSync(path.join(DATA_DIR, file));
                cards.push(JSON.parse(content));
            }
        });
        res.json(cards);
    });
});

// Criar novo card
app.post('/cards', (req, res) => {
    const card = req.body;
    const id = Date.now().toString();
    card.id = id;
    fs.writeFileSync(path.join(DATA_DIR, `${id}.json`), JSON.stringify(card, null, 2));
    res.status(201).json(card);
});

// Editar card
app.put('/cards/:id', (req, res) => {
    const id = req.params.id;
    const card = req.body;
    card.id = id;
    const filePath = path.join(DATA_DIR, `${id}.json`);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Card não encontrado' });
    fs.writeFileSync(filePath, JSON.stringify(card, null, 2));
    res.json(card);
});

// Excluir card
app.delete('/cards/:id', (req, res) => {
    const id = req.params.id;
    const filePath = path.join(DATA_DIR, `${id}.json`);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Card não encontrado' });
    fs.unlinkSync(filePath);
    res.json({ success: true });
});

// Salvar snapshot completo do board como um único arquivo JSON
app.post('/save-board', (req, res) => {
    const board = req.body;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `snapshot-${timestamp}.json`;
    try {
        fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(board, null, 2));
        return res.json({ success: true, file: filename });
    } catch (err) {
        console.error('Erro ao salvar snapshot:', err);
        return res.status(500).json({ success: false, error: 'Erro ao salvar snapshot' });
    }
});

// Endpoint simples para salvar/recuperar o estado atual do board
const STATE_FILE = path.join(DATA_DIR, 'kanban.json');

app.get('/state', (req, res) => {
    try {
        if (!fs.existsSync(STATE_FILE)) {
            return res.status(200).json([]);
        }
        const content = fs.readFileSync(STATE_FILE, 'utf8');
        const data = JSON.parse(content || '[]');
        return res.json(data);
    } catch (err) {
        console.error('Erro ao ler estado:', err);
        return res.status(500).json({ error: 'Erro ao ler estado' });
    }
});

app.post('/state', (req, res) => {
    try {
        const data = req.body || [];
        fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2), 'utf8');
        return res.json({ success: true, file: 'kanban.json' });
    } catch (err) {
        console.error('Erro ao salvar estado:', err);
        return res.status(500).json({ success: false, error: 'Erro ao salvar estado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
