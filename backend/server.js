import express from "express";
import dotenv from "dotenv";
// import products from "./data/products.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import colors from "colors";
import cors from "cors";
import productRoute from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/productRoutes.js";
import path from "path";
const app = express();

// connect DB
connectDB();
app.use(cors());
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
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
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
