import React from 'react';
import { Button } from 'react-foundation';

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelection = this.handleSelection.bind(this);
  }
  handleSelection() {
    let newSelection;
    if(this.props.selected) {
      newSelection = '';
    }
    else {
      newSelection = this.props.record.name;
    }
    this.props.handler(newSelection);
  }
  render() {
    if (this.props.record.name) {
      return (
        <Button isHollow={! this.props.selected} onClick={this.handleSelection}>
          {this.props.record.name}
          <sub>({this.props.record.num})</sub>
        </Button>
      );
    }
    else {
      return '';
    }
  }
}

export default FilterButton;
