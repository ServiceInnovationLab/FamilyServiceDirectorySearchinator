// Modules
import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';

// Styles
import '../styles/Nav.css';
import '../styles/Form.css';

// Local components
import MapResults from './Map/MapResults';
import AddressFinder from './Forms/AddressFinder';
import Service from '../components/Service/Service';
import Sharebar from '../components/Social/Sharebar';
import Proximity from './Forms/Proximity';
import Filters from './Service/Filters';

// Data
import * as actionCreators from '../actions/index';

class App extends Component {
  state = {
    showMap: false,
    latlng: [],
    keyword: '',
    inputchanged: false
  };

  debounce = (func, wait) => {
    var timeout;
    return function() {
      var later = function() {
        timeout = null;
        func.apply(this, arguments);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  componentWillMount = () => {
    const { filters, loadFilters, searchVars } = this.props;

    if (filters && filters.length === 0) loadFilters();
    this.radiusChange = this.debounce(this.radiusChange, 200);
    this.setState({ keyword: searchVars.keyword });
  };

  resultButton = () => {
    const { results } = this.props;
    const { showMap } = this.state;

    if (results.length > 0) {
      return (
        <button className="btn-toggle" onClick={e => this.toggleMap(e)}>
          {showMap ? 'Show List' : 'Toggle Map'}
        </button>
      );
    }
  };

  toggleMap = e => {
    e.preventDefault();
    this.setState({ showMap: !this.state.showMap });
  };

  resultCountButton = () => {
    const { itemsLoading, hasSearched, noSearchVars } = this.props;

    if (!itemsLoading && hasSearched) {
      return (
        <p className="results-desc">
          {noSearchVars ? (
            <span>No search parameters supplied</span>
          ) : (
            <Fragment>
              {this.resultCountButtonText()}
              {this.resultButton()}
            </Fragment>
          )}
        </p>
      );
    }
  };

  resultCountButtonText = () => {
    const { results, totalResults } = this.props;
    let desc = `Found ${results.length} `;

    if (totalResults && results.length === 100 && totalResults > 100) {
      desc += `of ${totalResults} `;
    }
    desc += `result ${totalResults > 1 ? 's' : ''}`;

    return desc;
  };

  keywordBlur = e => {
    const { inputchanged } = this.state;

    if (inputchanged || e.target.value === '') {
      const searchVars = { ...this.props.searchVars };
      searchVars.keyword = e.target.value;
      searchVars.addressLatLng = this.correctLatLng();
      this.props.loadResults(searchVars);
    }
  };

  onKeywordChange = value => {
    this.setState({ keyword: value });
  };

  enterPressed = e => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      this.setState({
        inputchanged: false
      });
      const searchVars = { ...this.props.searchVars };
      searchVars.keyword = e.target.value;
      searchVars.addressLatLng = this.correctLatLng();
      this.props.loadResults(searchVars);
    } else {
      this.setState({
        inputchanged: true
      });
    }
  };

  radiusChange = value => {
    const searchVars = { ...this.props.searchVars };

    searchVars.radius = value;
    setImmediate(function() {
      this.props.loadResults(searchVars);
    });
  };

  formSubmit = e => {
    e.preventDefault();
    const searchVars = { ...this.props.searchVars };

    this.setState({ latlng: searchVars.addressLatLng });
    searchVars.addressLatLng = this.correctLatLng();
    searchVars.keyword = e.target.keyword.value;
    this.props.loadResults(searchVars);
  };

  correctLatLng = () =>
    this.props.searchVars.addressLatLng || this.state.latlng;

  resetForm = () => {
    this.setState({ latlng: {}, keyword: '' });
    this.props.loadResults({
      category: '',
      keyword: '',
      address: '',
      addressLatLng: {},
      radius: 50000
    });
  };

  render() {
    const {
      filters,
      searchVars,
      loadResults,
      noSearchVars,
      itemsLoading,
      hasSearched,
      results,
      changeCategory
    } = this.props;
    const { keyword, showMap } = this.state;

    return (
      <div className="container-fluid">
        <Filters
          filters={filters}
          searchVars={searchVars}
          loadResults={loadResults}
        />
        <form className="form" onSubmit={e => this.formSubmit(e)}>
          <input
            value={keyword}
            type="search"
            name="keyword"
            onBlur={this.keywordBlur.bind(this)}
            onKeyPress={this.enterPressed.bind(this)}
            onChange={e => this.onKeywordChange(e.target.value)}
            placeholder="Enter topic or organisation"
          />
          <AddressFinder
            noSearchVars={noSearchVars}
            loading={itemsLoading}
            loadResults={loadResults}
            searchVars={searchVars}
            radius={searchVars.radius}
          />
          {searchVars.addressLatLng &&
          Object.keys(searchVars.addressLatLng).length > 0 && (
            <Proximity
              handler={this.radiusChange.bind(this)}
              radius={searchVars.radius}
            />
          )}
          <button type="submit">Search</button>
          {!noSearchVars &&
          hasSearched && (
            <Route
              render={({ history, location }) => (
                <button
                  type="button"
                  onClick={() => {
                    location.pathname !== '/' && history.push('');
                    this.resetForm();
                  }}
                >
                  Reset form
                </button>
              )}
            />
          )}
        </form>
        <div className={'results' + (itemsLoading ? ' loading' : '')}>
          {this.resultCountButton()}
          {!itemsLoading &&
            (showMap ? (
              <MapResults
                className="container-fluid"
                LatLng={searchVars.addressLatLng}
                map_results={results}
              />
            ) : (
              results.map((data, index) => (
                <LazyLoad height={280} key={index}>
                  <Service
                    results={data}
                    changeCategory={changeCategory}
                    searchVars={searchVars}
                    serviceId={data.FSD_ID}
                    loadResults={loadResults}
                  />
                </LazyLoad>
              ))
            ))}
        </div>
        <Sharebar />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const searchVars = { ...state.searchVars };
  if (!state.searchVars.category && ownProps.startCategory) {
    /* for some unidentified reason ownProps.startCategory is returning a string */
    searchVars.category =
      ownProps.startCategory === 'undefined' ? '' : ownProps.startCategory;
  }
  return {
    filters: state.filter,
    results: state.results,
    showMap: state.showMap,
    searchVars,
    noSearchVars: state.noSearchVars,
    totalResults: state.totalResults,
    itemsLoading: state.itemsLoading,
    hasSearched: state.hasSearched
  };
}

export default connect(mapStateToProps, actionCreators)(App);
