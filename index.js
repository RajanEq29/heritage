require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const connectDB = require("./DB/Database");
const authrouter=require('./Router/authrouter')
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
        origin: [
      "http://localhost:5173",
      "https://heritag-12.netlify.app",
      "https://hertagea-admin.netlify.app/"
    ],

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/auth",authrouter);
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello from GET API");
});
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