const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000; // You can change the port
const cors = require("cors");
const categoryRoutes = require("./routes/categoriesRoutes");

// Connect MongoDB
mongoose
  .connect(
    "mongodb+srv://pr657122:paJbbwqxoDHNWikA@cluster0.8efgpto.mongodb.net/papad"
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to API");
});

app.use("/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
