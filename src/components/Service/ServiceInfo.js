import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import MapResults from '../Map/MapResults';
import { Link } from 'react-router-dom';
import ServiceContactDetail from './ServiceContactDetail';
import Sharebar from '../Social/Sharebar';

export class ServiceInfo extends React.Component {

  componentDidMount() {
    this.props.loadResults({
      category: this.props.match.params.category
    },this.props.match.params.name);
  }

  render(){

    const { match: { params: { name } } , results } = this.props;
    const filteredResults = results
      .filter(item => item.FSD_ID === name);

    return <div>
      <div className="container-fluid">
        <div className="service">
          <Link to="/">Go back</Link>
          <ul className="list-stripped">
            {filteredResults
              .map((i, key)  => (
                <div key={key}>
                  <h2>{i.PROVIDER_NAME}</h2>
                  <p>{i.PHYSICAL_ADDRESS}</p>
                  <h4>{i.SERVICE_NAME}</h4>
                  <p>{i.SERVICE_DETAIL}</p>
                  <ServiceContactDetail phone={i.PUBLISHED_PHONE_1} email={i.PUBLISHED_CONTACT_EMAIL_1} hours={i.PROVIDER_CONTACT_AVAILABILITY} website={i.PROVIDER_WEBSITE_1}/>
                  <Sharebar subject={i.PROVIDER_NAME}/>
                </div>
              ))}
          </ul>
        </div>
      </div>
      <MapResults map_results={filteredResults} />
    </div>;
  }
}


export default connect(
  state => ({results: state.results}),
  actionCreators
)(ServiceInfo);
