const express = require ('express');

const app = express();
const port = 3000;
const pool = require ('./db');


app.listen (port, () => {
  console.log (`Server up and running! Listening at: https://localhost:${port}`)
});