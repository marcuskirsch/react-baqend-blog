import React, { Component, PropTypes } from 'react'


class ImageUploader extends Component {
  render() {
    return (
      <div className="form-group">
        <input className="form-control" type="file" onChange={ this.props.handleFile } />
      </div>
    )
  }
}
ImageUploader.propTypes = {
  handleFile: PropTypes.func.isRequired
}


export default ImageUploader;
