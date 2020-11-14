import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";
// const connectDB = require("./config/db");

const app = express();
// connect DB
// connectDB();
dotenv.config();
// init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("app running");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;
// Define Routes
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/profile", require("./routes/api/profile"));
// app.use("/api/posts", require("./routes/api/posts"));
app.listen(PORT, () =>
  console.log(
    `server connected on ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
