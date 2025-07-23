
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
  try {
    const { q, source, target, format } = req.body;
    const response = await axios.post('https://libretranslate.de/translate', {
      q, source, target, format
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Translation error:", error.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ CORS Proxy running at http://localhost:${PORT}`));
