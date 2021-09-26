# AnnaShyriaieva-7-14022021
## To start the project:
1. Start server:
* Go to the server folder
* Create img folder in the root (for storing images)
* Create dev.env in the root with:
PORT=3000
JWT_SECRET_KEY=YOUR_SECRET_KEY
DATABASE_URL='postgres://yourdburl'
* Run: yarn run dev

2. Start React project:
* Go to the front folder
* Change env port: run Linux/Mac: $export PORT=3001 or Windows: $env:PORT=3001
* Run: yarn start (at port 3001)
