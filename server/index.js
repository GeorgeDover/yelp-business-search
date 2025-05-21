import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GraphQLClient, gql } from 'graphql-request';

// Server setup
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Yelp GraphQL API setup
const YELP_GRAPHQL_ENDPOINT = 'https://api.yelp.com/v3/graphql';
const YELP_API_KEY = process.env.YELP_API_KEY;

const graphQLClient = new GraphQLClient(YELP_GRAPHQL_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
});

// Endpoint to fetch Yelp data
// This endpoint will be called from the client-side code
app.post('/api/yelp', async (req, res) => {
  // Extract parameters from the request body with fallback values
  const { location = '121 Albright Wy, Los Gatos, CA 95032', offset = 0 } = req.body;

  const query = gql`
    query BobaSearch($location: String!, $offset: Int!) {
      search(
        categories: "bubbletea"
        location: $location
        offset: $offset
        radius: 10000
        sort_by: "distance"
        limit: 10
      ) {
        total
      }
      business {
        distance
        location {
          formatted_address
        }
        name
        rating
        url
      }
    }
  `;

  const variables = {location, offset};

  try {
    const data = await graphQLClient.request(query, variables);
    res.json(data.search.business);
  } catch (error) {
    console.error('Yelp API error:', error);
    res.status(500).json({ error: 'Failed to fetch data from Yelp' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
