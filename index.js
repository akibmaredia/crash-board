const express = require ('express');
const cors = require ('cors');

const app = express();
const port = process.env.PORT || 8080;
const pool = require ('./db');
const path = require ('path');
const { response } = require('express');

// access to request.body
app.use (express.json());
app.use(express.static(path.join(__dirname, 'crash-board-client/public')));
// app.use (cors);
// Routes------Routes-------Routes------Routes-------Routes-------Routes//

// get all todo
app.get("/api", (req, res) => {
  res.json({"hi": "hello!!"});
})

// get todo
app.get("/getCrashPoints", async (req, res) => {
  try {
    const data = await pool.query(`
      SELECT 
        crash_event.report_no, 
        vehicle.vehicle_no, 
        model, 
        person_no,
        crash_event.latitude,
        crash_event.longitude
      FROM crash_event
      JOIN vehicle
        ON crash_event.report_no = vehicle.report_no
      JOIN driver
        ON crash_event.report_no = driver.report_no 
          AND driver.vehicle_no = vehicle.vehicle_no
    `);

    const response = {};

    response.crashes = data.rows;

    res.json (response);
  } catch (err) {
    console.error (err.message);
  }
})

app.get("/getHourlyCrashes", async (req, res) => {
  try {
    const data = await pool.query (`
      SELECT 
        crash_time,
        crash_severity
      FROM
        crash_event
    `);
    const sev = {
      "Property Damage Only": 1,
      "Injury": 3,
      "Serious Injury": 5,
      "Fatal": 8
    }
    const dataRows = data.rows;

    dataRows.map(d => {
      d.numeric_severity = sev[d.crash_severity];
    });

    console.log("Sent response for /hourlyCrashes");

    const response = {};
    response.hourly = dataRows;

    res.json (response);

  } catch (err) {
    console.error (err.message);
  }
})

app.get("/getManeuver", async (req, res) => {
  try {
    const data = await pool.query (`
      SELECT maneuver, COUNT (maneuver) as frequency
      FROM vehicle
        GROUP BY maneuver
        ORDER BY COUNT (maneuver) ASC
    `)

    console.log (data.rows);
    
    const response = {};

    response.maneuvers = data.rows;

    console.log (response);

    res.json (response);
  } catch (err) {
    console.error (err.message);
  }
})

app.get("/api", (req, res) => {
  res.json ({"message": "hello!!"});
})

app.get("/.*", (req, res) => {
  console.log("Open in Browser")
  res.sendFile(path.join(__dirname+'./crash-board-client/public/index.html'));
});

app.listen (port, () => {
  console.log (`Server up and running! Listening at: http://localhost:${port}`)
});