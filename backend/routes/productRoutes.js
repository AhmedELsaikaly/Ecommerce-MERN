import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  getProductById,
  getProducts,
  deleteProduct,
  UpdateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, UpdateProduct);

router.route("/:id/review").post(protect, createProductReview);

export default router;
