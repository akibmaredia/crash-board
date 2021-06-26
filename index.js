const express = require ('express');

const app = express();
const port = process.env.PORT || 3000;
const pool = require ('./db');

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

// get todo
app.get("/getall", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM CRASH_EVENT");
    console.log("Sending data");
    res.json (data.rows);
    console.log("sent data:");
    console.log(data.rows);

  } catch (err) {
    console.error (err.message);
  }
})


app.listen (port, () => {
  console.log (`Server up and running! Listening at: https://localhost:${port}`)
});