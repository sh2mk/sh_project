require("dotenv").config();
const express = require('./config/express');

const app = express();

app.listen(process.env.SERVER_PORT,()=>console.log(`server is ready! on ${process.env.SERVER_PORT}`))