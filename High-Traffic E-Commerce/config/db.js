const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://your-db-url");
  console.log("MongoDB Connected");
};

module.exports = connectDB;