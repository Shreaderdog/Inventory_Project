// server.js
// imports
const express = require("express");  // express for routes
const mongoose = require("mongoose");  // mongoose for db access
const cors = require("cors");
require("dotenv").config();  // dotenv for getting ENV variables from .env file
const cookieParser = require("cookie-parser");

// imports for self-made stuff
const userRouter = require("./src/routes/users.js");
const prodRouter = require("./src/routes/products.js");

// initialize app
const app = express();

app.use(cookieParser());

// have app use the express body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// have app that does things and stuff
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// routes
app.use("/users", userRouter);
app.use("/products", prodRouter);

// connect to db and start listening for calls
mongoose.connect(process.env.dbURI, { useNewUrlParser: true })
    .then((res) => {
        app.listen(process.env.PORT, () => console.log(`Server Listening on ${process.env.PORT}`));
    })
    .catch(err => console.log(err));
