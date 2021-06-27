import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import * as crashData from "../data/crash_event.json";
import '../App.css';

export const icon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconSize: [25, 35]
});

export default function Map () {
  const [activeCrash, setActiveCrash] = React.useState(null);

  return (
    <MapContainer className = "map" center={[29.6346346,-82.3583007]} zoom={13.4}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {crashData.crashes.map(crash => (
            <Marker 
              key = {crash.report_no}
              position = {[
                parseFloat(crash.latitude),
                parseFloat(crash.longitude)
              ]}
              onClick = {() => {
                console.log(crashData.crashes);
                setActiveCrash(crash);
              }}
              icon = {icon}
            >
              <Popup>
                <div>
                  <p>{crash.crash_date}</p>
                  <p>{crash.crash_time}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
  );
}