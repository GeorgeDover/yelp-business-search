import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

// Server setup
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint to fetch Yelp data
// This endpoint will be called from the client-side code
app.get("/api/yelp", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
        params: {
          // TODO: find an appropriate limit/offset to batch request gathering data from API when payload becomes too large
          location: req.query.location, // required
          offset: req.query.offset || 0, // pagination controlled
          limit: 50, // max 50 to limit API calls at expense of performance
          categories: "bubbletea",
          sort_by: "distance",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Yelp API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch data from Yelp API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
