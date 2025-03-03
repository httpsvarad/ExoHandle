const { config } = require("dotenv");
config();
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } =  require('@neondatabase/serverless');


async function start() {
  try {
      
      const sql = neon(process.env.DATABASE_URL);
      const db = drizzle({client:sql});
      
      console.log("Connected to neon postgres");
      module.exports = db
      const app = require('./app')
      app.listen(process.env.PORT, () => {
          console.log("Server Listening on port " + process.env.PORT);
        });
      } catch (e) {
        console.error("Error connecting to the database:", e);
        throw e; // Rethrow the error after logging
      }
    }

    start()