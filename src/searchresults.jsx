import React from 'react';
import axios from 'axios';
import Service from './service.jsx';
import MapResults from './maps.jsx';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    this.state = {results: []};
    this.fetchResults = this.fetchResults.bind(this);
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
  fetchResults() {
    let url = 'https://catalogue.data.govt.nz/api/3/action/datastore_search?';
    let query = `resource_id=${this.resourceId}&q=${this.props.keyword}&fields=${this.fields()}&distinct=true&filters=${this.filters()}`;
    axios.get(`${url}${query}`)
      .then(res => {
        this.setState({ results: res.data.result.records });
      });
  }
  componentDidUpdate(prevProps /*, prevState*/) {
    // only update if data has changed
    if (prevProps !== this.props) {
      this.fetchResults();
    }
  }
  renderServices() {
    return this.state.results.map((record, i) =>
      <Service key={'serv'+i} record={record} />
    );
  }
  render() {
    return (
      <div>
        <MapResults results={this.state.results} />
        {this.renderServices()}
      </div>
    );
  }
}

export default SearchResults;
