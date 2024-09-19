require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./config/db");

const authRouter = require("./routes/authRoutes");
const usersRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const imageRouter = require("./routes/imageRoutes");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use("/api", authRouter);
app.use("/api", usersRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", imageRouter);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on", PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });
