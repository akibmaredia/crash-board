import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const CustomTooltip = (props) => {
  var payload = props.payload;
  const active = props.active;
  if (active && payload && payload.length) {
    payload = payload[0].payload;
    return (
      <div className = "dataContainer">
        <p>Cars: {payload.frequency}</p>
      </div>
    );
  }

  return null;
};

export default function Chart2 () {
  const [data, setData] = useState ([]);
  useEffect(() => {
    fetch ("/getManeuver")
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
          <YAxis label={{ value: "# of Cars", angle: -90, position: "insideLeftBottom" }}/>
          <Tooltip content = {<CustomTooltip />}/>
          <Bar dataKey="frequency" fill="#888" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}