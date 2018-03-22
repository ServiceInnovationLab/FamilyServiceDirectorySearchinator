import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import MapResults from './Map/MapResults';
import AddressFinder from './Forms/AddressFinder';
import Filters from './Service/Filters';
import Service from '../components/Service/Service';
import '../styles/Nav.css';
import '../styles/Form.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      showMap: false,
      latlng: []
    };
  }

  componentWillMount () {
    this.props.loadFilters();
  }

  render() {
    return (
      <div className="container-fluid">
        <Filters data={this.props} addressLatLng={this.props.addressLatLng} />
        <form className="form" onSubmit={(e)=>{
          e.preventDefault();
          this.setState({latlng: this.props.addressLatLng});
          this.props.loadResults(this.state.category, e.target.keyword.value, this.props.addressLatLng === undefined ? this.state.latlng : this.props.addressLatLng);
        }}>
          <input type="search" name="keyword" placeholder="Enter topic or organisation" />
          <AddressFinder data={this.props} />
          <button type="submit">Search</button>
          {this.props.itemsLoading && false &&
            <i className="loader"><img src="loading.gif" alt="loading..." /></i>
          }
        </form>
        <div className={'results' + (this.props.itemsLoading ? ' loading' : '')}>
          {!this.props.itemsLoading && this.props.hasSearched &&
            <p>Found {this.props.results.length} result{this.props.results.length !== 1 ? 's' : ''}
              {this.props.results.length > 0 &&
                <button className="btn-toggle" onClick={() => {
                  this.setState({ showMap: !this.state.showMap}); }
                }>{this.state.showMap ? 'Show List' : 'Toggle Map'}</button>
              }
            </p>
          }
          { !this.props.itemsLoading && this.state.showMap && <MapResults className="container-fluid" LatLng={this.props.addressLatLng} map_results={this.props.results} />}
          { !this.props.itemsLoading && !this.state.showMap && this.props.results.map((data, key)=> <Service key={key} results={data} filter={this.props.name} />)}
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
    category: state.category,
    addressLatLng: state.addressLatLng,
    itemsLoading: state.itemsLoading,
    hasSearched: state.hasSearched
  };
}

export default connect(mapStateToProps, actionCreators)(App);
