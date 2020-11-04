import React, { useState } from "react";
import Form_ from '../../components/form';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../../components/navbar';
import Map2 from '../../components/map2';
import { withScriptjs } from "react-google-maps";


export default function Home() {
  var [payload, setPayload] = useState({});
  /* use a component named Map2 to load script and add the map of google maps */
  const MapLoader = withScriptjs(() =><Map2 payload={payload}/>);
  const url = `https://maps.googleapis.com/s/api/js?key=${process.env.GATSBY_API_GOOGLE_MAP}`
  return (
    <div className="wrapper">
      <NavBar/>
      {/* send the payload to render the form */}
      <Form_ submit_Handler={setPayload}/>
      {/* load the map of google maps */}
      <MapLoader
        googleMapURL={url}
        loadingElement={<div style={{ height: `100%` }} />}
        />
    </div>
  )
}
