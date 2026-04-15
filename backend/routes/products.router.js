import express from "express";
import { productController } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", productController.getProducts);
router.get("/filter", productController.filterProductsByCategory);
router.get("/search", productController.searchProducts);

router.get("/details/:id", productController.productDetails);
router.get("/:id", productController.getProductById);


export default router;
