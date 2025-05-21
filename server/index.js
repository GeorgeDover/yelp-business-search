import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Server setup
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint to fetch Yelp data
// This endpoint will be called from the client-side code
app.get('/api/yelp', async (req, res) => {
  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        location: req.query.location || '121 Albright Wy, Los Gatos, CA 95032',
        categories: 'bubbletea',
        limit: 10,
        offset: req.query.offset || 0,
        sort_by: 'distance',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Yelp API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from Yelp API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
