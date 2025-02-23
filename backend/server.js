const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');


require('dotenv').config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

app.use("/api/auth", authRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error));
