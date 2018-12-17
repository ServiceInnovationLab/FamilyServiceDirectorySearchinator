import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/ServiceDetail.css';
import ServiceCategories from './ServiceCategories';
import ServiceDetailDesc from './ServiceDetailDesc';
import ServiceContactDetail from './ServiceContactDetail';

class ServiceDetail extends Component {
  state = {
    services: [],
    categories: [],
    records: [],
    recordsLoaded: false,
    category: '',
    localcategory: '',
    loading: false
  };

  componentDidMount() {
    if (this.props.serviceId) this.loadServiceDetails();
  }

  filters = () => {
    const { serviceId } = this.props;

    return serviceId ? `&filters={"FSD_ID":"${serviceId}"}` : '';
  };

  loadServiceDetails = () => {
    const { category } = this.props.searchVars;
    const { recordsLoaded } = this.state;

    if (!recordsLoaded) {
      this.setState({
        loading: true,
        category,
        localcategory: category
      });
      const FIELDS =
        '_id,LEVEL_1_CATEGORY,SERVICE_NAME,SERVICE_TARGET_AUDIENCES,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,COST_DESCRIPTION,SERVICE_REFERRALS';
      let urldetails = encodeURI(
        `${process.env.REACT_APP_API_PATH}datastore_search?resource_id=${process
          .env.REACT_APP_API_RESOURCE_ID}&fields=${FIELDS}${this.filters()}`
      );
      return axios.get(urldetails).then(response => {
        if (this.refs.myRef)
          this.setState({
            records: response.data.result.records,
            recordsLoaded: true
          });
        this.displayServiceDetails(category);
      });
    }
  };

  displayServiceDetails = () => {
    const { category } = this.props.searchVars;

    if (this.state.records.length > 0) {
      let uniqueServices = [],
        unique = {},
        uniquecategories = [];
      this.state.records.forEach(function(item) {
        if (!uniquecategories.includes(item.LEVEL_1_CATEGORY)) {
          uniquecategories.push(item.LEVEL_1_CATEGORY);
        }
        if (!category) category = uniquecategories[0];
        if (item.LEVEL_1_CATEGORY === category) uniqueServices.push(item);
        unique[item.SERVICE_NAME] = item;
      });
      this.setState({
        services: uniqueServices,
        loading: false,
        categories: uniquecategories,
        localcategory: category
      });
    }
    return false;
  };

  render() {
    return (
      <div className="service-details" ref="myRef">
        {this.props.results.ORGANISATION_PURPOSE && (
          <div>
            <p>{this.props.results.ORGANISATION_PURPOSE}</p>
          </div>
        )}
        <ServiceContactDetail
          locations={true}
          classification={this.props.results.PROVIDER_CLASSIFICATION}
          address={this.props.results.PHYSICAL_ADDRESS}
          website={this.props.results.PROVIDER_WEBSITE_1}
        />
        <div className={this.props.itemsLoading ? ' loading' : ''}>
          {this.props.loadimmediately && (
            <ServiceCategories
              displayServiceDetails={this.displayServiceDetails}
              category={this.state.localcategory}
              categories={this.state.categories}
              serviceId={this.props.results.FSD_ID}
            />
          )}
          {this.props.loadimmediately && (
            <ServiceDetailDesc services={this.state.services} />
          )}
        </div>
        {!this.props.loadimmediately && (
          <Link
            className="more-detail"
            title="more detail"
            to={`/service/${this.props.results.FSD_ID}`}
          >
            more details...
          </Link>
        )}
      </div>
    );
  }
}

export default ServiceDetail;
