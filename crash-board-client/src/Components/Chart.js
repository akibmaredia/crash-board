import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import '../App.css';


export default function Chart () {
  const [data, setData] = useState (null);
  useEffect(() => {
    fetch ("/getManeuver")
      .then ((response) => response.json())
      .then (data => setData(data.hourly));
  }, []);

  return (
    <>
      <BarChart>

      </BarChart>
    </>
  );
}