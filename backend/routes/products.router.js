import express from "express";
import { productController } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.get("/filter", productController.filterProductsByCategory);
router.get("/search", productController.searchProducts);

router.get("/product/details/:id", productController.productDetails);

export default router;