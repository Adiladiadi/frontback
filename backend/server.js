const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// api route
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from backend API 👋",
    status: "success"
  });
});

// form route
app.post("/api/form", (req, res) => {
  const { name } = req.body;
  res.json({
    message: `Hello ${name}, backend received your data ✅`
  });
});

// start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
