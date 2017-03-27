import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class PublicPostListItemComponent extends Component {

  getShortText = () => {
    return this.props.post.text.substring(0, 400) + '...';
  }

  render() {
    let image;

    if(this.props.post.preview_image){
      image = <img alt={this.props.post.title} className="img-large" src={this.props.post.preview_image.url}/>
    }

    return (
      <div className="entry">
        <Link to={this.props.post.alias}>
          <div className="image-wrapper">
            {image}
          </div>
        </Link>
        <div className="text-wrapper">
          <h2>{this.props.post.title}</h2>
          <div className="item-meta">{moment(this.props.post.createdAt).format('dd. DD. MMMM  YYYY')}</div>
          <p>{this.getShortText()}</p>
          <Link to={this.props.post.alias}>
            mehr...
          </Link>
        </div>
      </div>
    );
  }
}

export default PublicPostListItemComponent;
