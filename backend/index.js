import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.routers.js";
import ordersRouter from "./routes/orders.routers.js";
import authMiddleware from "./middlewares/authMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
import { connectDB } from "./utils/connectDB.js";
connectDB();
app.use(express.json());
app.use(authMiddleware);

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
})