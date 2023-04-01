const express = require("express");
const app = express();
const authRouter = require("./routers/authRouter");

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use("/auth", authRouter);

module.exports = app;