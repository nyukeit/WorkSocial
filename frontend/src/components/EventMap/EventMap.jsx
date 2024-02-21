import React from "react";
import { Map, Marker } from "pigeon-maps";

export default function EventMap() {
  return (
    <Map height={300} defaultCenter={[43.529, 5.4474]} defaultZoom={11}>
      <Marker width={50} anchor={[43.529, 5.4474]} />
    </Map>
  );
}
