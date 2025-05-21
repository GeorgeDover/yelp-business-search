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

---

## Notes for code reviewers
My focuses for this task were mainly on the frontend functionality and styling (using non-proprietary theming close to Netflix's to convey intent for this to be used by Netflix employees/visitors). I wished to make it as simple to operate on a desktop browser as possible so speed of querying, rendering and UI actions was key. Images and further details such as address, number of reviews, etc would also have been nice to include, however for a MVP I felt that providing the baseline information along with the URL linking to the full listing would be appropriate to not over-complicate matters. 

My attempts at utilizing Yelp's GraphQL API were unsuccessful due to continual 400 errors with no clear error message pointing to a specific issue with the queries I attempted. I therefore pivoted to the REST API which worked well, however fetches much more data than is actually needed; increasing the performance cost of each query and meaning that larger batched requests would be necessary to display the full list of businesses. This is a tradeoff I explored, eventually leading to the system of fetching 50 results per query (the max allowed to prevent spamming too many requests) and relying on the user to initiate the first search per location, but automatically querying for the next batch of 50 results when the user moves to the end of the current list of search results.
