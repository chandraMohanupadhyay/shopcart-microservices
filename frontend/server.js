const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://backend:5000/products");
    const products = response.data;

    let html = "<h1>ShopFast Products</h1><ul>";
    products.forEach(p => {
      html += `<li>${p.name} - ₹${p.price}</li>`;
    });
    html += "</ul>";

    res.send(html);
  } catch (err) {
    res.send("Error connecting to backend");
  }
});

app.listen(3000, () => {
  console.log("Frontend running on port 3000");
});