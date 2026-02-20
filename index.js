require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const connectDB = require("./DB/Database");
const authrouter=require('./Router/authrouter')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/auth",authrouter);
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("✅ DB connected");

    // ✅ FIX HERE
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.error("❌ DB connection failed", error);
    process.exit(1);
  });