const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require("dotenv").config();

//Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Importing user routes
const userRouter = require("./src/routes/userRoutes");

// Using user routes
app.use("/users", userRouter);


async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

main()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
