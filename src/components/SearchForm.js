import React, { Component } from 'react';
import { Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import AddressResolver from './AddressResolver';

class SearchForm extends Component {
  constructor(...args) {
    super(...args);
    this.state = {keyword: '', address: '', selected_address: '', longitude: '', latitude: '', results: []};
  }
  handleKeywordChange = event => {
    this.setState({keyword: event.target.value});
  }
  handleAddress = event => {
    this.setState({address: event.target.value});
  }
  handleAddressSelection = selected_address => {
    this.setState({selected_address: selected_address, address: selected_address.a, longitude: selected_address.x, latitude: selected_address.y});
    this.props.handler({selected_address: selected_address, longitude: selected_address.x, latitude: selected_address.y});
  }
  handleSubmit = event => {
    this.props.handler({keyword: this.state.keyword, location: this.state.location});
    event.preventDefault();
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>
              <FontAwesome name='search' />
            </InputGroup.Addon>
            <FormControl
              bssize="large"
              type="text"
              value={this.state.keyword}
              placeholder="Enter topic or organisation"
              onChange={this.handleKeywordChange}
            />
          </InputGroup>
          <FormControl.Feedback />
          <InputGroup>
            <InputGroup.Addon><FontAwesome name='location-arrow' /></InputGroup.Addon>
            <FormControl
              type="text"
              bssize="large"
              value={this.state.address}
              placeholder="Enter a Location"
              onChange={this.handleAddress}
            />
          </InputGroup>
          <AddressResolver address={this.state.address} handler={this.handleAddressSelection} />
          <FormControl.Feedback />
        </FormGroup>
        <Button bssize="large" block bsStyle="primary" onClick={this.handleSubmit}>
          search
        </Button>
      </form>
    );
  }
}

export default SearchForm;
