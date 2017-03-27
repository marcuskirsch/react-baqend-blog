import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { db } from 'baqend';

import ImageListItem from './ImageListItem';
import ImageUploader from './ImageUploader';
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
  post = {};

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
      PostService.createPost(this.post)
        .then(res => {
          this.props.history.push('/adminpanel/posts/' + res.slug);
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
    }

      event.preventDefault();
  }

  handleChange = (event) => {
    Object.assign(this.state.form, {
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });

    this.setState({
      form: this.state.form
    });
  }

  handleUploadImage = (event) => {
    const file = new db.File({
      data: event.target.files[0],
      parent: '/www/images/posts/' + this.post.key
    })

    file
      .upload()
      .then((file) => {
        //upload succeed successfully
        this.post.images.push(file)

        return this.post.save()
      })
      .then((post) => {
        this.setState({
          post: post
        })
      })
  }

  handleUploadPreview = (event) => {
    const file = new db.File({
      data: event.target.files[0],
      parent: '/www/images/posts/' + this.post.key
    })

    file
      .upload()
      .then((file) => {
        //upload succeed successfully
        this.post.preview_image = file;
        return this.post.save()
      })
      .then((post) => {
        this.setState({
          post: post
        })
      })
  }

  handleDeletePreview = (event) => {
    event.preventDefault()

    this.post
      .preview_image
      .delete()
      .then(() => {
        this.post.preview_image = null

        return this.post.save()
      })
      .then((post) => {
        this.post = post

        this.setState({
          post: this.post
        })
      })
  }

  handleDeleteImage = (event, image) => {
    event.preventDefault()

    image
      .delete()
      .then(() => {
        const index = this.post.images.indexOf(image)
        this.post.images.splice(index, 1)

        return this.post.save()
      })
      .then((post) => {
        this.post = post

        this.setState({
          post: this.post
        })
      })
  }

  componentDidMount() {
    if (this.props.match.params.slug !== 'new') {
      this.getPost();
    } else {
      this.post = {};
      this.setState({
        post:{
          active: false,
          alias: '',
          text: '',
          title: ''
        }
      });
    }
  }

  render() {
    let flashMessage,
        imageContainer,
        imageList,
        previewImage;

    if (this.state.error || this.state.success) {
      flashMessage =  <FlashMessageComponent message={this.state.message} type={this.state.error ? 'danger' : 'success'}/>
    }

    if (this.state.post !== null) {
      if (this.state.post.images) {
          imageList = this.state.post.images.map((image) => {
            return <ImageListItem image={ image } key={ image.id } handleDelete={ this.handleDeleteImage } />
          })
        }

      if (this.state.post.preview_image) {
        previewImage = <ImageListItem image={ this.state.post.preview_image } handleDelete={ this.handleDeletePreview } />
      } else {
        previewImage = <ImageUploader handleFile={ this.handleUploadPreview } />
      }

      if (this.props.match.params.slug !== 'new') {
        imageContainer =
            <div>
              <div className="form-group">
                <label>Vorschaubild</label>
                <div className="img-list"> { previewImage }</div>
              </div>
              <div className="form-group">
                <label>Bilder</label>
                <div className="img-list">{ imageList }</div>
                <ImageUploader handleFile={ this.handleUploadImage } />
              </div>
            </div>
      }

    } else {
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
        <h2>Eintrag bearbeiten / neu anlegen</h2>
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
            <textarea className="form-control" name="text" rows="10" defaultValue={this.state.post.text} onChange={this.handleChange} />
          </div>
          {imageContainer}
          <div className="checkbox">
            <label>
              <input name="active" type="checkbox" defaultChecked={this.state.post.active} onChange={this.handleChange} />
              veröffentlicht
            </label>
          </div>
          <button type="submit" className="btn btn-default">Speichern</button>
        </form>
      </div>
    )
  }
}

export default withRouter(PostDetailComponent);
