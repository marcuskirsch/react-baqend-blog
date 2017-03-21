import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PostService from '../../../Shared/Post/Post';
import FlashMessageComponent from '../../../Shared/FlashMessage/FlashMessage';

class PostDetailComponent extends Component {
  state = {
    form: {},
    post: null,
    error: false,
    success: false,
    message: ''
  };

  /**
   *
   */
  handleChange = (event) => {
    let changes = {};

    Object.assign(this.state.form, {
      [event.target.name]: event.target.value
    });

    this.setState({
      form: this.state.form
    });
  }

  /**
   *
   */
  getPost = () => {
    let slug = this.props.match.params.slug;

    PostService.getProtectedPost(slug)
      .then(res => {
        this.post = res;

        this.setState({
          post: res
        });
      })
      .catch(err => {
        this.setState({error: err});
      });
  }

  /**
   *
   */
  savePost = (event) => {
    Object.assign(this.post, this.state.form);

    if (this.props.match.params.slug !== 'new'){
      PostService.updatePost(this.post)
        .then(res => {
          this.post = res;

          this.setState({
            post: res,
            success: true,
            message: 'update sucess'
          })
        })
        .catch(err => {
          this.setState({
            error: true,
            message: err.message
          })
        });
    } else {
      console.log(this.post);
      PostService.createPost(this.post)
        .then(res => {
          this.post = res;

          this.setState({
            post: res,
            success: true,
            message: 'create sucess'
          })
        })
        .catch(err => {
          this.setState({
            error: true,
            message: err.message
          })
        });
    }

      event.preventDefault();
  }

  /**
   *
   */
  componentWillMount() {
    if (this.props.match.params.slug !== 'new') {
      this.getPost();
    } else {
      this.post = {};
      this.setState({
        post:{
          alias: '',
          text: '',
          title: ''
        }
      });
    }
  }

  /**
   *
   */
  render() {
    let flashMessage;

    if (this.state.error || this.state.success) {
      flashMessage =  <FlashMessageComponent message={this.state.message} type={this.state.error ? 'danger' : 'success'}/>
    }

    if (this.state.post === null) {
      return <div></div>;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Link to="/adminpanel/posts">
              <button type="button" className="btn btn-default">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Zurück
              </button>
            </Link>
          </div>
        </div>
       {flashMessage}
        <h2>Blogbeitrag bearbeiten / neu anlegen</h2>
       <form onSubmit={this.savePost}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" className="form-control" defaultValue={this.state.post.title} onChange={this.handleChange} placeholder="Title"/>
          </div>
          <div className="form-group">
            <label>Title-Alias</label>
            <input type="text" name="alias" className="form-control" defaultValue={this.state.post.alias} onChange={this.handleChange} placeholder="Title-Alias"/>
          </div>
          <div className="form-group">
            <label>Text</label>
            <textarea className="form-control" name="text" rows="3" defaultValue={this.state.post.text} onChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
}

export default PostDetailComponent;
