import React from 'react';
import axios from 'axios';
import FilterButton from './FilterButton';
import { Well, Nav } from 'react-bootstrap';

class SearchFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {records: []};
    this.resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    this.fetchRecords(this.props.field);
  }
  fetchRecords(field) {
    let sql = encodeURI(`SELECT "${field}" as name, COUNT(*) as num FROM "${this.resourceId}" GROUP BY name ORDER BY name`);
    let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=${sql}`;
    axios.get(url)
      .then(res => {
        this.setState({ records: res.data.result.records });
      });
  }
  renderButtons() {
    return this.state.records.map((record) =>
      <FilterButton key={record.name} record={record} handler={this.props.handler} selected={this.props.selected === record.name}/>
    );
  }
  render() {
    return (
      <Well>
        {this.props.label}
        <Nav bsStyle="tabs" activeKey={1} >{this.renderButtons()}</Nav>
      </Well>
    );
  }
}

export default SearchFilters;
