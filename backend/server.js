const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleWare");
const port = process.env.PORT;
const app = express();

// adding middleware for get/check req body data
// it handle converstion
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));

// for handling all the error form backend side
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
