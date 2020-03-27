import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PostListItemComponent from './ListItem';
import FlashMessageComponent from '../../../Shared/FlashMessage/FlashMessage';

import PostService from '../../../Shared/Post/Post';

class PostListComponent extends Component {
  state = {
    error: false,
    posts: []
  };

  getPosts() {
    PostService.getProtectedPosts().then(res => {
      let posts = res.map((post, index) => {
        return <PostListItemComponent key={index} post={post} deletePost={this.deletePost}></PostListItemComponent>;
      });

      this.setState({posts: posts});
    });
  }

  deletePost = (post) => {
    PostService.deletePost(post)
      .then(res => {
        return this.getPosts();
      })
      .catch(err => {
        this.setState({error: err});
      });
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    let flashMessage;

    if (this.state.error) {
      flashMessage =  <FlashMessageComponent message={this.state.error.message} type="danger"/>
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Link to="/admin">
              <button type="button" className="btn btn-default">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Zurück
              </button>
            </Link>
          </div>
        </div>
        {flashMessage}
        <h2>Meine Blogbeiträge</h2>
        <div className="row">
          <div className="col-md-12">
            <Link to={'posts/new'}>
              <button type="button" className="btn btn-default pull-right" aria-label="add">
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              </button>
            </Link>
          </div>
        </div>
        <ul>{this.state.posts}</ul>
      </div>
    );
  }
}

export default PostListComponent;
