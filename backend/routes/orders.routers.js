import express from "express";
import { orderController } from "../controllers/orders.controller.js";
const router = express.Router();

router.post("/", orderController.placeOrder);
router.post("/summary", orderController.getOrderSummary);
router.get("/history", orderController.getOrderHistory);
router.get("/:id", orderController.getOrderById);
export default router;

