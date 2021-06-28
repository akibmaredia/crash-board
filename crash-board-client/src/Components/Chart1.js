import React, { useEffect, useState } from "react";
import * as hourly from "../data/hourlyCrashes.json";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Label } from "recharts";
import '../App.css';

// const data = hourly.hourly;

// to display crash severity in tooltip popup
const CustomTooltip = (props) => {
  var payload = props.payload;
  const active = props.active;
  if (active && payload && payload.length) {
    payload = payload[0].payload;
    return (
      <div className= "dataContainer">
        <p>{payload.crash_severity}</p>
      </div>
    )
  }

  return null;
};

export default function Chart1 () {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch ("/getHourlyCrashes")
      .then ((response) => response.json())
      .then (data => setData(data));
  }, []);

  return (
    <>
      <ResponsiveContainer height={300} width="100%">
        <BarChart
            width={300}
            height={250}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 20
            }}
        >
          {/* bar takes the numberic value of data using which the bar chart is to be created*/}
          <XAxis 
            label={{ value: "Time of the Day", position: "bottom" }}
            dataKey="crash_time" 
          />
          <YAxis label={{ value: "Severity", angle: -90, position: "insideLeftBottom" }} tick = {false}/>
          <Tooltip content= {<CustomTooltip />}/>
          <Bar dataKey="numeric_severity" fill="#888" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}