const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AdminRouter = require("./routes/Admin.Router");
const ProductRouter = require("./routes/Product.Router");

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.URL_FRONT,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api", AdminRouter);
app.use("/api", ProductRouter);

// MongoDB Connection
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) {
      console.log("MongoDB error connection", error);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

