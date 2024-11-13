


// --------- Database Connection using Mongoose ---------

const mongoose = require("mongoose");

// Async function to establish MongoDB connection
async function connectionDB() {
  try {
    // Attempting to connect to MongoDB Atlas using environment variable DB
    const connectDB = await mongoose.connect(process.env.DB);

    // Check if the connection was successful
    if (connectDB) {
      console.log("MONGODB Atlas connected successfully!!!");
    }
  } catch (error) {
    // Log any connection errors that occur
    console.log("Connectivity error", error);
  }
}

// Exporting the connection function to use it in other modules
module.exports = { connectionDB };
