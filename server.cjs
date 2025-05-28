require('dotenv').config();

console.log('Loaded API key:', process.env.OPENROUTER_API_KEY ? 'Yes' : 'No');

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// 👉 Replace this with your actual Vercel frontend URL:
const FRONTEND_ORIGIN = 'https://terratutor.vercel.app';

app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// preflight handler for all routes
app.options('*', cors());

// parse JSON bodies
app.use(express.json());

app.post('/generate', async (req, res) => {
  console.log('☝️ Received /generate call with:', req.body);
  console.log('Using API key:', process.env.OPENROUTER_API_KEY);

  const { grade, subject, type } = req.body;
  const prompt = `Generate a ${type} for ${subject} for a ${grade} student.`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'You are an educational content generator.' },
          { role: 'user', content: prompt }
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ result: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error from OpenRouter:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate content.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
