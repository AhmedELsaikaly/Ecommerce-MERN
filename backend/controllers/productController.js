import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @ route      GET api/products/:id
// @desc         Get product by id
// @access        Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

// @ route      DELETE api/products/:id
// @desc         DELETE product by id
// @access        private Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

// @ route      Create api/products
// @desc        Create new product
// @access        private Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample Name",
    price: 0,
    user: req.user._id,
    image: "https://elcopcbonline.com/photos/product/4/176/4.jpg",
    brand: "sample brand",
    category: "sample Category",
    countInStock: 0,
    numOfReviews: 0,
    description: "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(product);
});

// @ route      PUT api/products/:id
// @desc        Update Product
// @access        private Admin
const UpdateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    user,
    image,
    brand,
    category,
    countInStock,
    numOfReviews,
    descriptions,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.user = req.user._id;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.numOfReviews = numOfReviews;
    product.descriptions = descriptions;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product  not Found");
  }
});

// @ route      POST api/products/:id/review
// @desc        Add review for product Product
// @access        private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReview = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReview) {
      res.status(400); // 400 bad request
      throw new Error("product already Reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "review Added" });
  } else {
    res.status(404);
    throw new Error("product  not Found");
  }
});

// @ route      GET api/products/top
// @desc       get top Rated Products
// @access        public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  UpdateProduct,
  createProductReview,
  getTopProducts,
};
