import React, {useState, useEffect} from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

export const icon = new Icon({
  iconUrl: "/car_crash.png",
  iconSize: [45, 55]
});



export default function Map () {
  const [activeCrash, setActiveCrash] = useState(null);
  const [data, setData] = useState ([]);

  useEffect(async () => {
      await fetch ("/getCrashPoints")
        .then ((response) => response.json())
        .then (data => setData(data));
    }, []);

  return (
    <MapContainer className = "map" center={[29.6346346,-82.3583007]} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {data && data.map(crash => (
            <Marker 
              key = {crash.vehicle_no + crash.person_no + crash.report_no}
              position = {[
                parseFloat(crash.latitude),
                parseFloat(crash.longitude)
              ]}
              onClick = {() => {
                setActiveCrash(crash);
              }}
              icon = {icon}
            >
              <Popup>
                <div>
                  <p>Report#: {crash.report_no}</p>
                  <p>Driver sex: {crash.sex}</p>
                  <p>Driver age: {crash.age}</p>
                  <p>Car: {crash.make + " " + crash.model + " " +crash.year}</p>
                  <p>Time: {crash.crash_date + " " + crash.crash_time}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
  );
}