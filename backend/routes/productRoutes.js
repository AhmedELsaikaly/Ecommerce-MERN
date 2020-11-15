import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Product from "../models/productModel.js";


router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const products = Product.find({});
      res.json(products);
    } catch (error) {
      console.error(error);
    }
  })
);


