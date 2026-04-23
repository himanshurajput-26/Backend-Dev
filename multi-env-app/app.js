const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./config/logger');

// Load env file dynamically
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const app = express();
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use('/health', require('./routes/health'));

// Sample API
app.get('/', (req, res) => {
  logger.info("Root API hit");
  res.send(`App running in ${process.env.NODE_ENV}`);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});