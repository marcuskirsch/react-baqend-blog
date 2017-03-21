import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AuthenticationService from '../../../Shared/Authentication/Authentication';
import FlashMessageComponent from '../../../Shared/FlashMessage/FlashMessage';

class LoginComponent extends Component {
  state = {
    redirectToReferrer: false,
    username: '',
    password: '',
    error: false
  };

  /**
   *
   */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   *
   */
  login = (event) => {
    let params = {
      username: this.state.username,
      password: this.state.password
    };

    AuthenticationService.authenticate(params)
      .then(() => {
        this.setState({ redirectToReferrer: true })
      })
      .catch((err) => {
        this.setState({
          error: err
        });
      });

    event.preventDefault();
  }

  /**
   *
   */
  render() {
    let flashMessage;

    if (this.state.redirectToReferrer && AuthenticationService.isAuthenticated) {
      return (
        <Redirect to="/adminpanel/posts"/>
      )
    }

    if (this.state.error) {
      flashMessage =  <FlashMessageComponent message={this.state.error.message} type="danger"/>
    }

    return (
      <div className="container">
       {flashMessage}
       <form onSubmit={this.login}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleChange} placeholder="Username"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
          </div>
          <button type="submit" disabled={!this.state.username || !this.state.password} className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
}

export default LoginComponent;
