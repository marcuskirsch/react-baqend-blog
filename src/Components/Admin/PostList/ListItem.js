import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class PostListItemComponent extends Component {

  deletePost = () => {
    this.props.deletePost(this.props.post);
  }

  render() {
    return (

        <div className="row list-item">
            <div className="col-xs-8">
              {this.props.post.title} ({moment(this.props.post.createdAt).format('HH:MM | DD. MMMM  YYYY')})
            </div>
            <div className="col-xs-4">
              <button  onClick={this.deletePost} type="button" className="btn btn-default pull-right" aria-label="delete">
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
              <Link to={'posts/' + this.props.post.slug}>
                <button type="button" className="btn btn-default pull-right" aria-label="edit">
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              </button>
              </Link>
            </div>
        </div>
    );
  }
}

export default PostListItemComponent;
