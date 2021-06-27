import React from "react";
import Map from "./Components/Map";
import HourlyChart from "./Components/HourlyChart";
import Chart from "./Components/Chart";
import './App.css';

export default function App() {
  

  return (
    <div className="container">
      <div className = "mapcontainer">
        <Map />
      </div>
      <div className = "chartcontainer">
        <HourlyChart />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
}