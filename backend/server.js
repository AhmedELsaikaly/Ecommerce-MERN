import express from "express";
import dotenv from "dotenv";
// import products from "./data/products.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoute from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
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
// Define Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

// app.use("/api/profile", require("./routes/api/profile"));
// app.use("/api/posts", require("./routes/api/posts"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `server connected on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
