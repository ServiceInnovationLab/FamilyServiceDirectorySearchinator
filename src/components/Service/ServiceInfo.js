import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import MapResults from '../Map/MapResults';
import { Link } from 'react-router-dom';
import Sharebar from '../Service/Sharebar';

export class ServiceInfo extends React.Component {

  componentDidMount() {
    this.props.loadResults(this.props.match.params.category, this.props.match.params.name);
  }

  providerNameLink(data) {
    if(data.PROVIDER_WEBSITE_1){
      return <a href={data.PROVIDER_WEBSITE_1} className="list-link">{data.PROVIDER_NAME}</a>;
    }else{
      return data.PROVIDER_NAME;
    }
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
                  <h2>{this.providerNameLink(i)}</h2>
                  <p>{i.PHYSICAL_ADDRESS}</p>
                  <h4>{i.SERVICE_NAME}</h4>
                  <p>{i.SERVICE_DETAIL}</p>
                </div>
              ))}
          </ul>
        </div>
      </div>
      <MapResults map_results={filteredResults} />
      <div className="container-fluid"><Sharebar/></div>
    </div>;
  }
}


export default connect(
  state => ({keyword: state.keyword, results: state.results}),
  actionCreators
)(ServiceInfo);
