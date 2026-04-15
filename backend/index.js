import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/products.router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
import { connectDB } from "./utils/connectDB.js";
connectDB();
app.use(express.json());

app.use("/api/product", productsRouter);
req.user = {userId: 1, name: "user"};

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
})