import React, { Component } from 'react';
import PostListItemComponent from './ListItem';
import PostService from '../../../Shared/Post/Post';

class PublicPostListComponent extends Component {
  state = {
    posts: []
  }

  /**
   *
   */
  getPosts() {
    PostService.getPosts().then(res => {
      let posts = res.map((post, index) => {
        return <PostListItemComponent key={index} post={post}></PostListItemComponent>;
      });

      this.setState({posts: posts});
    });
  }

  componentWillMount() {
    this.getPosts();
  }

  /**
   *
   */
  render() {
    return (
      <div>
        {this.state.posts}
      </div>
    );
  }
}

export default PublicPostListComponent;
