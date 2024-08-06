const mongoose = require("mongoose");

async function connectDB(req, res, next) {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database Connected Successfully");
    } catch (error) {
      return res.status(500).json({ message: "Database connection failed" });
    }
  }
  next();
}

async function disconnectDB(req, res, next) {
  res.on("finish", async () => {
    if (mongoose.connection.readyState !== 0) {
      try {
        await mongoose.connection.close();
        console.log("Database Connection Closed");
      } catch (error) {
        console.error("Error closing database connection", error);
      }
    }
  });
  next();
}

module.exports = { connectDB, disconnectDB };
