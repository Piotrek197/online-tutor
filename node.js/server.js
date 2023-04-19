require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const connect = require("./dbConnection");

//Connect to DB
connect();

const whitelist = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174"
];

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/user", require("./routes/api/users"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));
app.use(verifyJWT);
app.use("/tutors", require("./routes/api/tutors"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
