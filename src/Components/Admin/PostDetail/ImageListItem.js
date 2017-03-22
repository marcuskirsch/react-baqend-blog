import React, { Component, PropTypes } from 'react'

class ImageListItem extends Component {

  handleDelete = (e) => {
    this.props.handleDelete(e, this.props.image)
  }

  render() {
    return (
      <div className="item-img-wrapper">
        <img src={this.props.image.url} alt="Bild" className="img-thumbnail" />
        <span className="glyphicon glyphicon-trash" onClick={this.handleDelete}></span>
      </div>
    )
  }
}
ImageListItem.propTypes = {
  image: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default ImageListItem;
