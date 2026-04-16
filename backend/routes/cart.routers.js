import express from "express";
import { cartController } from "../controllers/cart.controller.js";
const router = express.Router();

router
  .get("/", cartController.getCartItems)
  .post("/:productId", cartController.addToCart)
  .patch("/:cartId", cartController.updateCartItem)
  .delete("/:cartId", cartController.removeFromCart);
  
  router.get("/summary", cartController.cartSummary);

export default router;
