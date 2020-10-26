const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
require("./database");
//INITIALIZATIONS

const app = express();

//MIDDLEWARE
app.use(require("./middleware/index.middleware"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//SETTINGS
app.set("port", process.env.PORT || 3000);
app.set(express.urlencoded({ extended: false }));

// GLOBAL VARIABLES

// ROUTES
app.use(require("./routes/index.routes"));

//STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;