import React, { Component } from 'react';

class FlashMessageComponent extends Component {

  /**
   *
   *
   * @returns
   *
   * @memberOf FlashMessageComponent
   */
  render() {
    return (
      <div className={'alert alert-' + this.props.type}>{this.props.message}</div>
    );
  }
}

export default FlashMessageComponent;
