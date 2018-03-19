import React from 'react';
import ShareMail from 'react-icons/lib/fa/envelope-o';
import ShareFacebook from 'react-icons/lib/fa/facebook-square';
import ShareTwitter from 'react-icons/lib/fa/twitter';
import '../../styles/Sharebar.css';


class Sharebar extends React.Component {


  render(){
    let currentUrl = window.location.href;
    let mailto = 'mailto:'+currentUrl;
    let facebook = 'https://www.facebook.com/sharer/sharer.php?u='+currentUrl;
    let twitter = 'https://twitter.com/home?status='+currentUrl;

    return (
      <div className="sharebar" aria-label="Sharebar">
        <div className="container">
          <p>Share via: </p>
          <ul className="sharebar-share">
            <li><a href={mailto}><ShareMail /> Email</a></li>
            <li><a href={facebook}><ShareFacebook /> Facebook</a></li>
            <li><a href={twitter}><ShareTwitter /> Twitter</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sharebar;
