import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());

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
    res.status(500).json({ error: 'Error fetching NBA scores' });
  }
});

// Lambda handler for AWS Lambda
export const handler = serverless(app);
