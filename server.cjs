require('dotenv').config(); // load env variables

console.log('Loaded API key:', process.env.OPENROUTER_API_KEY ? 'Yes' : 'No');

const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve React frontend (if built)
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/generate', async (req, res) => {
  const { grade, subject, type } = req.body;
  const prompt = `Generate a ${type} for ${subject} for a ${grade} student.`;
   
  console.log('Using API key:', process.env.OPENROUTER_API_KEY);

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'You are an educational content generator.' },
          { role: 'user', content: prompt },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'X-Title': 'Educational-Generator',
        },
      }
    );

    res.json({ result: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error from OpenRouter:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

// Fallback for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
