const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('bson');
require('dotenv').config(); 

const authMiddleware = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

// --- Conexão com o MongoDB ---
const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('meuFilhoAutistaDB'); 
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Falha ao conectar ao MongoDB', error);
    process.exit(1); 
  }
}

connectDB();
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const usersCollection = db.collection('users');
    const userExists = await usersCollection.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Este e-mail já está em uso.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { fullName, email, password: hashedPassword, createdAt: new Date() };
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor ao tentar registrar.', error });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } 
    );

    res.json({
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor ao tentar fazer login.', error });
  }
});

app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne(
      { _id: new ObjectId(req.user.userId) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});


// Rota para Buscar Eventos do Calendário (a que já tínhamos)
app.get('/api/events', async (req, res) => {
  const CALENDAR_ID = '779e01b3ffc9055a8574cc2d66d5d6d392f5ad8a859b66e621c9410bba109cab@group.calendar.google.com';
  const API_KEY = process.env.GOOGLE_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Chave de API do Google não configurada no servidor.' });
  }

  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.items || []);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).json({ error: 'Falha ao buscar eventos do Google Calendar.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});