const express = require ('express');

const app = express();
const port = process.env.PORT || 3000;
const pool = require ('./db');
const path = require ('path');

// const data = await pool.query ("SELECT * FROM CRASH_EVENT;");
//     console.log("Sending data");
//     console.log("sent data:");
//     console.log(data.rows);


// access to request.body
app.use (express.json());

// Routes------Routes-------Routes------Routes-------Routes-------Routes//

// get all todo
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get("/get/:table", async (req, res) => {
  try {
    console.log(`At ${req.params.table}`);
    const data = await pool.query(`SELECT * FROM ${req.params.table}`);
    res.json (data.rows);
  } catch (err) {
    console.error (err.message);
  }
})

// get todo



app.listen (port, () => {
  console.log (`Server up and running! Listening at: https://localhost:${port}`)
});