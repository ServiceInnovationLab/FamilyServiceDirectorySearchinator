import React from 'react';
import axios from 'axios';
import { Label, ButtonGroup } from 'react-foundation';
import FilterButton from './filterbuttons.jsx';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {categories: []};
    this.fetchCategories();
  }
  fetchCategories() {
    let resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';
    let sql = encodeURI(`SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${resourceId}" GROUP BY name ORDER BY name`);
    let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=${sql}`;
    axios.get(url)
      .then(res => {
        this.setState({ categories: res.data.result.records });
      });
  }
  renderCategories() {
    return this.state.categories.map((record) =>
      <FilterButton key={record.name} record={record} handler={this.props.handler} selected={this.props.selected === record.name}/>
    );
  }
  render() {
    return (
      <div>
        <Label>Category</Label>
        {this.renderCategories()}
      </div>
    );
  }
}

export default Categories;