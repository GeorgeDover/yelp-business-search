# 🧋 Boba Finder: Netflix Offices Edition!

This full-stack app utilizes the Yelp REST API to search and display results for bubble/boba tea shop options in proximity to these three Netflix offices:
- 121 Albright Wy, Los Gatos, CA 95032
- 888 Broadway, New York, NY 10003
- 5808 Sunset Blvd, Los Angeles, CA 90028

## Prerequisites to run locally
- Node.js ≥ 18.x (tested with 24.x, although should work with recent prior versions)
- Yelp API Key (Need to create an account at https://docs.developer.yelp.com/ first)

## Setup
1. Clone the repo
```
git clone https://github.com/GeorgeDover/yelp-business-search.git
cd yelp-business-search
```

2. Install server dependencies
```
cd server
npm install
```

3. Create `.env` file with your Yelp API key
```
echo -e "YELP_API_KEY=your_yelp_api_key_here" > server/.env
```
| Make sure .env is in your .gitignore if you wish to commit edits.

4. Start the host server
```
npm start
```
| For testing purposes, you can query the Yelp REST API by going to `http://localhost:3000/api/yelp?location=` with a custom location param.

5. Install client dependencies
```
cd ../client
npm install
```

6. Start the frontend dev server
```
npm run dev
```

7. Navigate to frontend and explore the options!
The frontend will be hosted at http://localhost:5173 (or whatever port Vite selects)
