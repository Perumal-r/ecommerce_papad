const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000; // You can change the port
const cors = require("cors");
const cookieParser = require("cookie-parser");
const categoryRoutes = require("./routes/categoriesRoutes");
const userRoutes = require("./routes/registerRoutes");
const cartRoutes = require("./routes/cartRouter");
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require("./routes/profileRoutes"); // Assuming you have a profile route
// Connect MongoDB
mongoose
  .connect(
    "mongodb+srv://pr657122:paJbbwqxoDHNWikA@cluster0.8efgpto.mongodb.net/papad"
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to API");
});

app.use("/categories", categoryRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/profile", profileRoutes); // Use the profile routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
