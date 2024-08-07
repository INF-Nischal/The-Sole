// require("colors");
require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");
// const fileUpload = require("express-fileupload");
// const morgan = require("morgan");

const { connectDB, disconnectDB } = require("./middlewares/dbMiddleware");

// Import Router
const authRouter = require("./routes/adminRoutes");
const usersRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
// const categoryRouter = require("./routes/categoryRoutes");
// const orderRouter = require("./routes/orderRoutes");
// const cartRouter = require("./routes/cartRoutes");
// const customizeRouter = require("./routes/customizeRoutes");

// Express middlewares
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("public"));
// app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(fileUpload({ useTempFiles: true }));

app.use(connectDB);
app.use(disconnectDB);

// Routes
app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use("/api", authRouter);
app.use("/api", usersRouter);
// app.use("/api/category", categoryRouter);
app.use("/api", productRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/customize", customizeRouter);

// Run Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
