require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./api");
// Setup your Middleware and API Router here

module.exports = app;
