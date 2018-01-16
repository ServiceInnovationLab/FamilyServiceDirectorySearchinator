import React from 'react';
import { Link } from 'react-router-dom';

class SearchItem extends React.Component {
  dialAddress() {
    return `tel:${this.props.record.PUBLISHED_PHONE_1}`;
  }
  render() {
    return (
      <div>
        <Link to={this.props.record.FSD_ID}>
          <h3>{this.props.record.PROVIDER_NAME}</h3>
        </Link>
        <h4>{this.props.record.SERVICE_NAME}</h4>
        <p>{this.props.record.SERVICE_DETAIL}</p>
        <dl>
          <dt>Organisation purpose</dt>
          <dd>{this.props.record.ORGANISATION_PURPOSE}</dd>
          <dt>Email</dt>
          <dd>{this.props.record.PUBLISHED_CONTACT_EMAIL_1}</dd>
          <dt>Phone</dt>
          <dd>
            <a href={this.dialAddress()}>{this.props.record.PUBLISHED_PHONE_1}</a>
            <p>({this.props.record.PROVIDER_CONTACT_AVAILABILITY})</p>
          </dd>
          <dt>Physical address</dt>
          <dd>{this.props.record.PHYSICAL_ADDRESS}</dd>
          <dd>{this.props.record.DELIVERY_METHODS}</dd>
          <dt>Costs:</dt>
          <dd>{this.props.record.COST_TYPE}</dd>
          <dt>Service referrals</dt>
          <dd>{this.props.record.SERVICE_REFERRALS}</dd>
        </dl>
      </div>
    );
  }
}

export default SearchItem;
