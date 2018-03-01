import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import MapResults from './Map/MapResults';
import AddressField from './Forms/AddressField';
import Filters from './Service/Filters';
import Service from '../components/Service/Service';
import '../styles/Nav.css';
import '../styles/Form.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      showMap: false
    };
  }

  componentWillMount () {
    this.props.loadFilters();
  }

  render() {
    return (
      <div className="container-fluid">
        
        <Filters data={this.props} />
        
        <form className="form" onSubmit={(e)=>{
          e.preventDefault();
          this.props.loadResults(this.state.category, e.target.keyword.value);
        }}>
          <input type="search" name="keyword" placeholder="Enter topic or organisation" />
          <AddressField data={this.props} />
          <button type="submit">Search</button>
        </form>
        <div>
          {this.props.results.length > 0 &&
            <button className="btn-toggle" onClick={() => {
              this.setState({ showMap: !this.state.showMap}); }
            }>{this.state.showMap ? 'Show List' : 'Toggle Map'}</button>
          }
          { this.state.showMap && <MapResults className="container-fluid" map_results={this.props.results} />}
          { !this.state.showMap && this.props.results.map((data, key)=> <Service key={key} results={data} filter={this.props.name} />)}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filter,
    results: state.results,
    showMap: state.showMap,
    keyword: state.keyword,
    addresses: state.addresses,
    category: state.category
  };
}

export default connect(mapStateToProps, actionCreators)(App);
