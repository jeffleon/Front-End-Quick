/*global google*/
import React, { Component} from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
import Markers from './markers';
class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            directions: null
        };
    }
  componentDidMount() {
    try
    {
      const directionsService = new google.maps.DirectionsService();
      const origin =  this.props.payload.origin;
      const destination = this.props.payload.destination;
      if(origin !== undefined){
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
      window.location.reload(false);
    }
   
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 4.709013, lng: -74.168438}}
        defaultZoom={7}
      >
        <DirectionsRenderer directions={this.state.directions} options={{suppressMarkers:true}}/>
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
