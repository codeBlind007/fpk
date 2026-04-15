import express from "express";
import { cartController } from "../controllers/cart.controller.js";
const router = express.Router();

router.get("/cart", cartController.getCartItems);





export default router;