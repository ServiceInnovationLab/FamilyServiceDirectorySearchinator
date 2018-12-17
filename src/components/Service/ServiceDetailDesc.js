import React, { Component } from 'react';
import '../../styles/ServiceDetail.css';

export default class ServiceDetailDesc extends Component {
  render() {
    const { services } = this.props;

    return (
      <div className="service-detail">
        {services &&
          services.map((data, index) => (
            <div key={index}>
              <h3>{data.SERVICE_NAME}</h3>
              <ul className="list-stripped">
                {data.SERVICE_TARGET_AUDIENCES && (
                  <li>
                    <b>Target Audience:</b> {data.SERVICE_TARGET_AUDIENCES}
                  </li>
                )}
                {data.DELIVERY_METHODS && (
                  <li>
                    <b>Delivery Methods:</b> {data.DELIVERY_METHODS}
                  </li>
                )}
                {data.SERVICE_REFERRALS && (
                  <li>
                    <b>Service Referrals:</b> {data.SERVICE_REFERRALS}
                  </li>
                )}
                <li>
                  <b>Cost:</b>
                  {data.COST_TYPE && <span> {data.COST_TYPE}. </span>}
                  {data.COST_DESCRIPTION && (
                    <span>{data.COST_DESCRIPTION}</span>
                  )}
                </li>
              </ul>
              {data.SERVICE_NAME !== data.SERVICE_DETAIL && (
                <p>{data.SERVICE_DETAIL}</p>
              )}
            </div>
          ))}
        {!services && <h4>No further information</h4>}
      </div>
    );
  }
}
