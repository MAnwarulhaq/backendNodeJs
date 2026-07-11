// const express = require('express');
import express from 'express';
// const mongoose = require('mongoose');
// import mongoose from 'mongoose';
import connectDb from './config/database.js';
// Connect to the database
connectDb();

import contactRoutes from './routes/contacts.routes.js';
const app = express();
const port = 5000;
// const Contact = require("./models/contact.model")
import Contact from './models/contact.model.js';

// Database connection
// mongoose.connect("mongodb://localhost:27017/contactApp", )
// .then(() => {
//   console.log("Database connected");
// })
// .catch((err) => {
//   console.log("Database connection error: ", err);
// });
// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}));
app.use(express.static("public"));

app.use("/", contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Routes

