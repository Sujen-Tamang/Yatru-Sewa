const express = require("express");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json()); // Middleware for JSON parsing

// Sample route
app.get("/", (req, res) => {
  res.send("YatruSewa Backend is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running  siuu on port ${PORT}`);
});
