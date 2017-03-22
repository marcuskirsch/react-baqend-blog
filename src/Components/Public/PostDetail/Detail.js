import React, { Component } from 'react';
import PostService from '../../../Shared/Post/Post';
import moment from 'moment';

class PublicPostDetailComponent extends Component {
  state = {
    post: null
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


  componentDidMount(){
    this.getPost();
  }
  /**
   *
   */
  render() {
    let imageList;

    if (this.state.post === null){
      return <div></div>;
    }

    imageList = this.state.post.images.map((image, index) => {
      return <img className="img-thumbnail" key={index} src={image.url}/>;
    });

    return (
      <div>
        <div className="entry">
          <div className="image-wrapper">
            <img alt="lorem" className="img-large" src={this.state.post.preview_image.url}/>
          </div>
          <div className="text-wrapper">
            <h2>{this.state.post.title}</h2>
            <div className="item-meta">inspiration trending <span>{moment(this.state.post.createdAt).format('DD. MMMM  YYYY')}</span></div>
            <p>{this.state.post.text}</p>
          </div>
          <div className="gallery">
            {imageList}
          </div>
        </div>

      </div>
    );
  }
}

export default PublicPostDetailComponent;
