require("dotenv").config({path: "./.env"});

const express = require("express");
 

const app = express();
//db connection

require("./models/database").connectDatabase()

// logger

const logger = require("morgan"); 
app.use(logger("tiny"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));



const session = require("express-session")
const cookieparser = require("cookie-parser");

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))

app.use(cookieparser());

const fileupload = require("express-fileupload");
app.use(fileupload());

app.use("/user", require("./routes/indexRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employe", require("./routes/employeRoutes"));



// error handling
const ErorrHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middlewares/errors");
const cookieParser = require("cookie-parser");

app.all("*", (req, res, next) =>{
    next(new ErorrHandler(`requested url not found ${req.url}`, 404));
})

app.use(genetatedErrors);

app.listen(process.env.PORT, 
    console.log(`server running on port ${process.env.PORT}`)
    );