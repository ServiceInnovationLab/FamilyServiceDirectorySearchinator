import React from 'react';
import SearchFilters from './SearchFilters';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

class SearchinatorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyword: '', category: '', region: '', location: '', address: ''};
    this.handleSearchParams = this.handleSearchParams.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }
  handleCategoryChange(category){
    this.setState({category: category});
  }
  handleSearchParams(new_state) {
    this.setState(new_state);
  }
  render() {
    return (
      <div>
        <h1>Find Whānau Services in your area</h1>
        <SearchFilters
          field='LEVEL_1_CATEGORY'
          label='Topics'
          selected={this.state.category}
          handler={this.handleCategoryChange} />
        <SearchForm handler={this.handleSearchParams} />
        <SearchResults
          keyword={this.state.keyword}
          address={this.state.address}
          longitude={this.state.longitude}
          latitude={this.state.latitude}
          category={this.state.category}
          region={this.state.region} />
      </div>
    );
  }
}

export default SearchinatorPage;
