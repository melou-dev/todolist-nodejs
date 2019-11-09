`use strict`;

const express = require("express");

const app = express();
const port = 4000;

app.get("/", (req, res) => {
    res.send("welcome to the todolist");
});

app.listen(port);