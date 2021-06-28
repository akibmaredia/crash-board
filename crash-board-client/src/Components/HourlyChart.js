import React, { useEffect } from "react";
import * as hourly from "../data/hourlyCrashes.json";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import '../App.css';

// const data = hourly.hourly;

export default function HourlyChart () {
  const [data, setData] = React.useState(null);
  useEffect(() => {
    fetch ("/getHourlyCrashes")
      .then ((response) => response.json())
      .then (data => setData(data));
  }, []);

  return (
    <>
      <ResponsiveContainer height={300} width="100%">
      <BarChart
          width={500}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20
          }}
        >
          <XAxis 
            label={{ value: "Time of the Day", position: "bottom" }}
            dataKey="crash_time" 
          />
          <YAxis label={{ value: "Severity level", angle: -90, position: "insideLeftBottom" }}/>
          <Bar dataKey="numeric_severity" fill="#888" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}