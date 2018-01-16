import React from 'react';
import {  Marker, Popup } from 'react-leaflet';

class ServiceMapMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.record.LATITUDE && this.props.record.LONGITUDE) {
      let position = [this.props.record.LATITUDE, this.props.record.LONGITUDE];
      return (
        <Marker position={position}>
          <Popup>
            <span>
              <h5>{this.props.record.PROVIDER_NAME}</h5>
              <h6>{this.props.record.SERVICE_NAME}</h6>
              <p>{this.props.record.SERVICE_DETAIL}</p>
              <p>{this.props.record.PHYSICAL_ADDRESS}</p>
            </span>
          </Popup>
        </Marker>
      );
    }
    else {
      return '';
    }
  }
}

export default ServiceMapMarker;
