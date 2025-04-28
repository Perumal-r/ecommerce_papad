const express = require("express");
const app = express();
const PORT = 5000; // You can change the port

app.get("/", (req, res) => {
  res.send("Welcome to API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
