const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "mongodb://mongo:27017/shopdb";
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const redisClient = redis.createClient({
  url: "redis://redis:6379"
});

redisClient.connect();

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/products", async (req, res) => {
  const cached = await redisClient.get("products");

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 20000 }
  ];

  await redisClient.set("products", JSON.stringify(products));
  res.json(products);
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
