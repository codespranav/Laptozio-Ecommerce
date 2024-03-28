import express from "express";
import { connectToDB } from "./config/db.js";
const app = express();
const port = process.env.PORT || 8000;
import auth from "./Routes/auth.js";
import categoryRoute from "./Routes/categoryRoute.js";
import productRoute from "./Routes/productRoute.js";
import cors from "cors";
connectToDB();

// Middlewares
app.use(express.json());

// Enable CORS for requests from 'http://localhost:5173'
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Set this to true if you need to include cookies in your requests
  })
);

app.use("/api/auth", auth);
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
