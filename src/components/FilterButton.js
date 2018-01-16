import React from 'react';
import { NavItem } from 'react-bootstrap';

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
  className() {
    if (this.props.selected) {
      return 'primary';
    }
    return '';
  }
  render() {
    if (this.props.record.name) {
      return (
        <NavItem bsstyle={this.className()} active={this.props.selected} onClick={this.handleSelection}>
          {this.props.record.name}
          <sub>({this.props.record.num})</sub>
        </NavItem>
      );
    }
    else {
      return '';
    }
  }
}

export default FilterButton;
