import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import 'foundation-sites/dist/css/foundation.css';
import Categories from './category.jsx';
import Regions from './regions.jsx';
import SearchForm from './searchform.jsx';
import SearchResults from './searchresults.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyword: '', category: '', region: ''};
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }
  handleRegionChange(region){
    this.setState({region: region});
  }
  handleCategoryChange(category){
    this.setState({category: category});
  }
  handleKeywordChange(keyword) {
    this.setState({keyword: keyword});
  }
  render() {
    return (
      <div>
        <h1>Whānau Services Search</h1>
        <Categories selected={this.state.category} handler={this.handleCategoryChange} />
        <Regions selected={this.state.region} handler={this.handleRegionChange} />
        <SearchForm handler={this.handleKeywordChange} />
        <SearchResults category={this.state.category} keyword={this.state.keyword} region={this.state.region} />
      </div>
    );
  }
}

// ========================================
ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));
