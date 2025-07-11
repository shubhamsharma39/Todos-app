const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", todoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) =>
    console.error("MongoDB connection failed:", err.message)
  );

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
