const express = require('express');
const app = express();
const port = 3000;
var path = require("path");

var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');
const router = require('./src/routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`)
})

