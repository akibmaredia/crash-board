import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import '../App.css';


export default function Chart () {
  const [data, setData] = useState ([]);
  useEffect(async () => {
    await fetch ("/getManeuver")
      .then ((response) => response.json())
      .then (data => setData(data));
  }, []);

  return (
    <>
      <ResponsiveContainer height={300} width="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 20
          }}
        >
          <XAxis dataKey = "maneuver" label={{ value: "Maneuver", position: "bottom" }}/>
          <YAxis label={{ value: "# of Crashes", angle: -90, position: "insideLeftBottom" }}/>
          <Bar dataKey="frequency" fill="#888" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}