import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import colors from "colors";
const app = express();

// connect DB
connectDB();

// dotenv secret keys
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

// Define Routes
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/profile", require("./routes/api/profile"));
// app.use("/api/posts", require("./routes/api/posts"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `server connected on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
