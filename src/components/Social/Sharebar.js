import React from 'react';
import ShareMail from 'react-icons/lib/fa/envelope-o';
import ShareFacebook from 'react-icons/lib/fa/facebook-square';
import ShareTwitter from 'react-icons/lib/fa/twitter';
import '../../styles/Sharebar.css';

class Sharebar extends React.Component {
  render() {
    const url = this.props.url || window.location.href;
    const subject =
      this.props.subject || 'Whānau%20Services%20in%20your%20area';
    const description = this.props.description || subject;

    const mailto = `mailto:?subject=${subject}&body=${url}`;
    const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    const twitter = `https://twitter.com/home?status=${description}:%20${url}`;

    return (
      <div className="sharebar" aria-label="Sharebar">
        <div className="container">
          <p>Share via: </p>
          <ul className="sharebar-share">
            <li>
              <a href={mailto} title="Share by email">
                <ShareMail />
                <span> Email</span>
              </a>
            </li>
            <li>
              <a href={facebook} title="Share via Facebook">
                <ShareFacebook />
                <span> Facebook</span>
              </a>
            </li>
            <li>
              <a href={twitter} title="Share on twitter">
                <ShareTwitter />
                <span> Twitter</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sharebar;
