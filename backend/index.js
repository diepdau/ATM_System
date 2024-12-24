const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
dotenv.config();

// mongoose.connect(`mongodb://localhost:27017/atm`, () => {
//   console.log("Connected to monggo db");
// });

mongoose.connect(`mongodb://mongo:27017/atm`, () => {
  console.log("Connected to monggo db");
});

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

app.listen(8000, () => {
  console.log("Server is running");
});
