const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("./database");
//INITIALIZATIONS

const app = express();

//MIDDLEWARE
app.use(morgan("dev"));

//SETTINGS
app.set("port", process.env.PORT || 3000);
app.set(express.urlencoded({ extended: false }));

// GLOBAL VARIABLES

// ROUTES
app.get("/", (req, res) => {
    data = {
        mensaje: "hello!!"
    };
    res.json(data);
});

//STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;