import React, { useEffect } from "react";
import * as hourly from "../data/hourlyCrashes.json";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import '../App.css';

// const data = hourly.hourly;

const sev = {
  1: "Property Damage Only",
  3: "Injury",
  5: "Serious Injury",
  8: "Fatal"
}

export default function HourlyChart () {
  const [data, setData] = React.useState(null);
  useEffect(() => {
    fetch ("/getHourlyCrashes")
      .then ((response) => response.json())
      .then (data => setData(data.hourly));
  }, []);

  console.log(data);

  const getYAxis = (data=> {
    console.log(sev[data.numeric_severity]);
    return sev[data.numeric_severity];
  });

  return (
    <>
      <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      >
        <XAxis dataKey="crash_time" />
        <YAxis label={{ value: "Severity", angle: -90, position: "insideLeft" }}/>
        <Bar dataKey="numeric_severity" fill="#8884d8" />
      </BarChart>
    </>
  );
}