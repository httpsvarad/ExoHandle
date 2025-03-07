require("dotenv").config(); // Load environment variables
const { PrismaClient } = require("@prisma/client");

// Create a Prisma client instance
const prisma = new PrismaClient();

async function start() {
  try {
    // Test the database connection
    await prisma.$connect();
    console.log("Connected to Neon PostgreSQL using Prisma");

    // Import and start your Express app
    const {app, server} = require("./app");
    server.listen(process.env.PORT, () => {
      console.log("Server listening on port " + process.env.PORT);
    });
  } catch (e) {
    console.error("Error connecting to the database:", e);
    throw e; // Rethrow the error after logging
  }
}

start();