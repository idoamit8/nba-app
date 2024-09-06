import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Define the API key (retrieved from environment variables)
const nbaApiKey = process.env.NBA_API_KEY;
app.get('/api/nba-scores', async (req, res) => {
  const { date } = req.query;

  if (!date || !nbaApiKey) {
    return res.status(400).json({ error: 'Date is required' });
  }

  try {
    const response = await axios.get(`https://api.balldontlie.io/v1/games?dates[]=${date}&dates[]=${date}`, {
      headers: { 'Authorization': nbaApiKey }
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching NBA scores:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching NBA scores', details: error.response ? error.response.data : error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
