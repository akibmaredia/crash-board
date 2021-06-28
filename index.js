const express = require ('express');
const cors = require ('cors');

const app = express();
const port = process.env.PORT || 8080;
const pool = require ('./db');
const path = require ('path');
const { response } = require('express');

// access to request.body
app.use (express.json());
app.use(express.static(path.join(__dirname, './crash-board-client/build')));
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
        make, 
        model,
        vehicle.year,
        person_no,
        crash_date,
        crash_time,
        crash_event.street,
        crash_event.latitude,
        crash_event.longitude
      FROM crash_event
      JOIN vehicle
        ON crash_event.report_no = vehicle.report_no
      JOIN driver
        ON crash_event.report_no = driver.report_no 
          AND driver.vehicle_no = vehicle.vehicle_no
    `);

    data.rows.map(d => {
      // console.log(typeof d.crash_date);
      var str = JSON.stringify(d.crash_date);
      d.crash_date = str.substring(1, 11);
    })

    res.json (data.rows);
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

    data.rows.map(d => {
      d.numeric_severity = sev[d.crash_severity];
    });

    res.json (data.rows);

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
    `)

    data.rows.map(d => {
      d.frequency = parseInt(d.frequency);
    });

    res.json (data.rows);
  } catch (err) {
    console.error (err.message);
  }
})

app.get("/api", (req, res) => {
  res.json ({"message": "hello!!"});
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+'./crash-board-client/build', 'index.html'));
});

app.listen (port, () => {
  console.log (`Server up and running! Listening at: http://localhost:${port}`)
});