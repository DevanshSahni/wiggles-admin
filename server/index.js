const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const routes = require("./routes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_LINK,
    credentials: true,
  })
);

mongoose.connect(`mongodb+srv://${process.env.DB_CONNECTION_STRING}`);

app.use("/", routes);

app.listen(5000, () => {
  console.log("Welcome to the server of Wiggles admin!");
});
