const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("Database Connected Successfully");
  } catch (error) {
    return json({ message: error.message });
  }
}

module.exports = connectDB;
