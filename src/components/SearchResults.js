import React from 'react';
import axios from 'axios';
import Service from './Service';
import MapResults from './MapResults';
import { Button, Alert } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    this.state = {results: [], show_map: false, userLat: 0, userLon: 0};
  }
  toggleShowMap = () => {
    this.setState({'show_map': !this.state.show_map});
  }
  fields() {
    return 'FSD_ID,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS';
  }
  filters() {
    let filters = {};
    if(this.props.category) {
      filters['LEVEL_1_CATEGORY'] = this.props.category;
    }
    if(this.props.region) {
      filters['PHYSICAL_REGION'] = this.props.region;
    }
    return JSON.stringify(filters);
  }
  queryEntered() {
    return this.props.category || this.props.keyword || this.props.region || (this.props.longitude && this.props.latitude);
  }
  fetchResults = () => {
    if (this.queryEntered()) {
      this.setState({loading: true});
      let url = 'https://catalogue.data.govt.nz/api/3/action/datastore_search?';
      let query = `resource_id=${this.resourceId}&q=${this.props.keyword}&fields=${this.fields()}&distinct=true&filters=${this.filters()}`;
      axios.get(`${url}${query}`)
        .then(res => {
          this.setState({ results: res.data.result.records, loading: false });
        });
    }
    else {
      this.setState({results: []});
    }
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({userLat: position.coords.latitude, userLon: position.coords.latitude})
    });
  }
  componentDidUpdate(prevProps /*, prevState*/) {
    // only update if data has changed
    if (prevProps !== this.props) {
      this.fetchResults();
    }
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) *  (1 - c((lon2 - lon1) * p))/2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  renderServices(record) {
    const results = this.state.results.map((record, i) => {
      let element = record, distance = [];
      element.kms = this.calculateDistance(record.LATITUDE, record.LONGITUDE, this.state.userLat, this.state.userLon).toFixed(0);
      distance.push({element: element});
      return record
    });
    results.sort(function(a, b) {
      return a['kms'] - b['kms'];
    });

    return results.map((record, i) =>
      <Service key={'serv'+i} record={record} />
    );
  }

  renderLoading() {
    return (
      <div>
        <FontAwesome name='spinner' size='5x' spin />
        Fetching..
      </div>
    );
  }
  renderMap() {
    const {
      longitude,
      latitude
    } = this.props;
    return (
      <div>
        <hr />
        <Button onClick={this.toggleShowMap}><FontAwesome name='list' />List</Button>
        <MapResults results={this.state.results}
          longitude={longitude}
          latitude={latitude} />
      </div>
    );
  }
  renderList() {
    return (
      <div>
        <hr />
        <Button onClick={this.toggleShowMap}><FontAwesome name='map' /> Map</Button>
        {this.renderServices()}
      </div>
    );
  }
  renderNoResults(){
    return (
      <Alert bsStyle="warning">
        No results
      </Alert>
    );
  }
  render() {
    // Still loading
    if(this.state.loading) {
      return this.renderLoading();
    }

    // We have results
    if(this.state.results.length > 0 ) {
      if (this.state.show_map) {
        return this.renderMap();
      }
      else {
        return this.renderList();
      }
    }

    // No results
    if (this.queryEntered()) {
      return this.renderNoResults();
    }
    else {
      return '';
    }
  }
}

export default SearchResults;
