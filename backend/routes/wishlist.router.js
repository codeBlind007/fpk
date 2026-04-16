import express from "express";
import { wishlistController } from "../controllers/wishlist.controller.js";
const router = express.Router();

router.post("/", wishlistController.addToWishlist);
router.get("/", wishlistController.getWishlist);
router.delete("/:productId", wishlistController.removeFromWishlist);

export default router;
