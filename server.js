// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Port
const PORT = process.env.PORT || 3000;

// Setup Express server
const app = express();

// Enable morgan log
app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Mongo DB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Link api and html routes
require("./routes/html_routes.js")(app);
require("./routes/api_routes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on (http://localhost:${PORT})`);
});
