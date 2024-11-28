const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const authRoutes = require("./routes/authRoutes.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/passport.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true, // Allow credentials (cookies, headers, etc.)
}));

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout for server selection
  socketTimeoutMS: 45000,         // Timeout for sockets
  connectTimeoutMS: 10000,        // Timeout for initial connection
})
.then(() => console.log("MongoDB connected..."))
.catch(err => console.error("MongoDB connection error:", err));
app.listen(5000, () => console.log('Server running on port 5000'));
app.get('/', (req, res) => {
  res.send('Welcome to the VibeReads Application');
});
