import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.routers.js";
import ordersRouter from "./routes/orders.routers.js";
import wishlistRouter from "./routes/wishlist.router.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
import { connectDB } from "./utils/connectDB.js";
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-User-Id"],
  }),
);

app.use(authMiddleware);
app.use("/images", express.static("public"));
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/wishlist", wishlistRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`server running on: http://localhost:${PORT}`);
});
