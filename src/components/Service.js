import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Service extends Component {
  render() {
    const {
      FSD_ID,
      PROVIDER_NAME,
      SERVICE_NAME,
      SERVICE_DETAIL,
      ORGANISATION_PURPOSE,
      PUBLISHED_CONTACT_EMAIL_1,
      PUBLISHED_PHONE_1,
      PROVIDER_CONTACT_AVAILABILITY,
      PHYSICAL_ADDRESS,
      DELIVERY_METHODS,
      COST_TYPE,
      SERVICE_REFERRALS
    } = this.props.record;
    return (
      <div>
        <Link to={FSD_ID}>
          <h3>{PROVIDER_NAME}</h3>
        </Link>
        <h4>{SERVICE_NAME}</h4>
        <p>{SERVICE_DETAIL}</p>
        <dl>
          <dt>Organisation purpose</dt>
          <dd>{ORGANISATION_PURPOSE}</dd>
          <dt>Email</dt>
          <dd>{PUBLISHED_CONTACT_EMAIL_1}</dd>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${PUBLISHED_PHONE_1}`}>{PUBLISHED_PHONE_1}</a>
            <p>({PROVIDER_CONTACT_AVAILABILITY})</p>
          </dd>
          <dt>Physical address</dt>
          <dd>{PHYSICAL_ADDRESS}</dd>
          <dd>{DELIVERY_METHODS}</dd>
          <dt>Costs:</dt>
          <dd>{COST_TYPE}</dd>
          <dt>Service referrals</dt>
          <dd>{SERVICE_REFERRALS}</dd>
        </dl>
      </div>
    );
  }
}

export default Service;
