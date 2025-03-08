const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const productRoutes = require('./routes/product.router');
const AdminRouter = require("./routes/admin.router");

const app = express(); 

app.use(express.json());
app.use(cors({
  origin: process.env.URL_FRONT,
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());


app.use("/api", productRoutes);
app.use("/api", AdminRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
