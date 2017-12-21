import React from 'react';
import { Button, Sizes, Label, Row } from 'react-foundation';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', results: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    this.props.handler(this.state.value);
    event.preventDefault();
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <Label>Keywords</Label>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <Button isExpanded size={Sizes.LARGE} onSubmit={this.handleSubmit}>search</Button>
      </form>
    );
  }
}

export default SearchForm;