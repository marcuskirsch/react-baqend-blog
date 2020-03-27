import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AuthenticationService from '../../../Shared/Authentication/Authentication';
import FlashMessageComponent from '../../../Shared/FlashMessage/FlashMessage';

class LoginComponent extends Component {
  state = {
    username: '',
    password: '',
    error: false,
    isAuthenticated: false
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isAuthenticated = () => {
    AuthenticationService.isAuthenticated().then(() => {
       this.props.history.push('/adminpanel');
    });
  }

  login = (event) => {
    let params = {
      username: this.state.username,
      password: this.state.password
    };

    AuthenticationService.authenticate(params)
      .then(() => {
        this.props.history.push('/admin');
      })
      .catch((err) => {
        this.setState({
          error: err
        });
      });

    event.preventDefault();
  }

  componentDidMount() {
    this.isAuthenticated();
  }

  render() {
    let flashMessage;

    if (this.state.error) {
      flashMessage =  <FlashMessageComponent message={this.state.error.message} type="danger"/>
    }

    return (
      <div className="container">
       {flashMessage}
       <h2>Login</h2>
       <form onSubmit={this.login}>
          <div className="form-group">
            <label>Nutzername</label>
            <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleChange} placeholder="Nutzername"/>
          </div>
          <div className="form-group">
            <label>Passwort</label>
            <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} placeholder="Passwort"/>
          </div>
          <button type="submit" disabled={!this.state.username || !this.state.password} className="btn btn-default">Einloggen</button>
        </form>
      </div>
    )
  }
}

export default withRouter(LoginComponent);
