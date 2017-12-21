import React from 'react';
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet';

class ServiceMapMarker extends React.Component {
  constructor() {
    super();
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
class MapResults extends React.Component {
  constructor() {
    super();
    this.state = { zoom: 6 };
  }
  centre() {

    if(this.props.results.length > 0) {
      if (this.props.results[0].LATITUDE && this.props.results[0].LONGITUDE) {
        return [this.props.results[0].LATITUDE, this.props.results[0].LONGITUDE];
      }
    }
    return this.defaultCentre();
  }
  defaultCentre() {
    // roughly the centre of aotearoa
    return [-41.0, 174.0];
  }
  renderMarkers() {
    return this.props.results.map((record, i) =>
      <ServiceMapMarker key={'marker'+i} record={record} />
    );
  }
  render() {
    return (
      <Map center={this.centre()} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.renderMarkers()}
      </Map>
    );
  }
}

export default MapResults;
