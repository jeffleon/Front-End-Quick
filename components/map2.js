/*global google*/
import React, { Component} from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
import Markers from './markers';


/* Map component render the Google maps content */
class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            directions: null
        };
    }
  /* when the component did mount the google maps was in charge of render the route when 
     the user type the origin and destination points*/
  componentDidMount() {
    try
    {
      const directionsService = new google.maps.DirectionsService();
      const origin =  this.props.payload.origin;
      const destination = this.props.payload.destination;
      if(origin !== undefined){
        {/* this was the specifications to render the route between the origin and destination */}
        directionsService.route(
          {
            origin: new google.maps.LatLng(origin.lat, origin.lng),
            destination: new google.maps.LatLng(destination.lat, destination.lng),
            travelMode: google.maps.TravelMode.DRIVING
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }
    } catch(error) {
      /* if for one reasaon the render of the directions mess up, the page will be reloaded */
      window.location.reload(false);
    }
   
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 4.709013, lng: -74.168438}}
        defaultZoom={7}
      >
        {/* google maps component with a center of position */}
        <DirectionsRenderer directions={this.state.directions} options={{suppressMarkers:true}}/>
        {/* that was the markes of the tolls and other stuff information about trip especifications */}
        <Markers payload={this.props.payload} />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `83vh`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
