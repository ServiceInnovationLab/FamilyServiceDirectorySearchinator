import React from 'react';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import FaMapMarker from 'react-icons/lib/fa/map-marker';
import FaFolderOpen from 'react-icons/lib/fa/folder-open';

class ServiceContactLocation extends React.Component {

  serviceDetailsItem(obj,iconin,valin){
    obj.push({
      icon: iconin,
      val: valin
    });
  }

  serviceDetailsBuilder(){
    let obj = [];
    if(this.props.address)        this.serviceDetailsItem(obj,<FaMapMarker />,this.props.address);
    if(this.props.website)        this.serviceDetailsItem(obj,<FaExternalLink />, <a href={`${this.props.website}`} target="_blank">{this.props.website}</a>);
    if(this.props.classification) this.serviceDetailsItem(obj,<FaFolderOpen />, this.props.classification);
    return obj;
  }

  render() {
    let listitems = this.serviceDetailsBuilder().map((record, i) =>
      <li key={i} className="list-icon">
        <span>{record.icon}</span>
        {record.val}
      </li>
    );

    if(listitems.length === 0){
      return null;
    }
    return (
      <ul className="list-stripped">
        {listitems}
      </ul>
    );
  }
}

export default ServiceContactLocation;
