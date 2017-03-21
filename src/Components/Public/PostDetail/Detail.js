import React, { Component } from 'react';
import PostService from '../../../Shared/Post/Post';

class PublicPostDetailComponent extends Component {
  state = {
    post: {}
  };

  /**
   *
   */
  getPost = () => {
    let id = this.props.match.params.id;

    PostService.getPost(id).then(res => {
      this.setState({
         post: res
       });
    });
  }


  componentWillMount(){
    this.getPost();
  }
  /**
   *
   */
  render() {
    return (
      <div className="container">
        <h1>{this.state.post.title}</h1>
        <img alt="lorem" src="http://lorempixel.com/400/200/"/>
        <p>{this.state.post.text}</p>
      </div>
    );
  }
}

export default PublicPostDetailComponent;
