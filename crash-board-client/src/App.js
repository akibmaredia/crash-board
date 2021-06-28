import React from "react";
import Map from "./Components/Map";
import Chart1 from "./Components/Chart1";
import Chart2 from "./Components/Chart2";
import Chart3 from "./Components/Chart3"
import './App.css';

export default function App() {
  

  return (
    <div>
      <div className = "container">
        <div className = "mapcontainer">
          <Map />
        </div>
        <div className = "chartcontainer">
            <h2 className = "text">Maneuver of cars during the crash</h2>
            <Chart2 />
        </div>
      </div>
      <div className = "chart">
        <div className = "chartcontainer">
          <h2 className = "text">Severity of crashes by hour of the day</h2>
          <Chart1 />
        </div>
        <div className = "chartcontainer">
          <h2 className = "text">Male to Female ratio</h2>
          <Chart3 />
        </div>
      </div>      
    </div>
  );
}