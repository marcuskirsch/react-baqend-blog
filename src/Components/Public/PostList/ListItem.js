import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PublicPostListItemComponent extends Component {

  /**
   *
   */
  render() {
    return (
      <Link to={this.props.post.alias}>
        <div className="row list-item">
              <div className="col-md-4">
                <img  alt={this.props.post.title} src={this.props.post.title}/>
              </div>
              <div className="col-md-4">
                {this.props.post.title}
              </div>
        </div>
      </Link>
    );
  }
}

export default PublicPostListItemComponent;
