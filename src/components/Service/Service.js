import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Service.css';
import FaPhone from 'react-icons/lib/fa/phone';
import FaMail from 'react-icons/lib/fa/envelope-o';
import FaClock from 'react-icons/lib/fa/clock-o';
import FaExternalLink from 'react-icons/lib/fa/external-link';

class Service extends React.Component {

  serviceDetailsBuilder(data){
    let obj = [];
    if(data.PUBLISHED_PHONE_1) obj.push({
      icon: <FaPhone />,
      val: <a href={`tel:${data.PUBLISHED_PHONE_1}`}>{data.PUBLISHED_PHONE_1}</a>
    });
    if(data.PUBLISHED_CONTACT_EMAIL_1)  obj.push({
      icon: <FaMail />,
      val: <a href={`mailto:${data.PUBLISHED_CONTACT_EMAIL_1}`}>{data.PUBLISHED_CONTACT_EMAIL_1}</a>
    });
    if(data.PROVIDER_CONTACT_AVAILABILITY)  obj.push({
      icon: <FaClock />,
      val: data.PROVIDER_CONTACT_AVAILABILITY
    });
    if(data.PROVIDER_WEBSITE_1)  obj.push({
      icon: <FaExternalLink />,
      val: <a href={`${data.PROVIDER_WEBSITE_1}`} target="_blank">{data.PROVIDER_WEBSITE_1}</a>
    });
    return obj;
  }

  serviceDetails(data) {
    return this.serviceDetailsBuilder(data).map((record, i) =>
      <li key={i} className="list-icon">
        <span>{record.icon}</span>
        {record.val}
      </li>
    );
  }

  render() {
    let data = this.props.results;
    return (
      <div>
        <div className="service">
          <div className="search-result-hero">
            <h2><Link to={`/service/${encodeURIComponent(this.props.filter ? this.props.filter : data.LEVEL_1_CATEGORY)}/${data.FSD_ID}`}>{data.PROVIDER_NAME}</Link></h2>
            <p>{data.PHYSICAL_ADDRESS}</p>
          </div>
          <div className="service-details">
            <h4>{data.SERVICE_NAME}</h4>
            <p>{data.SERVICE_DETAIL}</p>
            <ul className="list-stripped">
              {this.serviceDetails(data)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Service;
