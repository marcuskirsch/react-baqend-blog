import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

import PostDetailComponent from '../PostDetail/Detail';
import PostListComponent from '../PostList/List';
import LoginComponent from '../Login/Login';
import DashboardComponent from '../Dashboard/Dashboard';

import AuthenticationService from '../../../Shared/Authentication/Authentication';

class BaseComponent extends Component {
  state = {
    isAuthenticated: false
  };

  isAuthenticated = () => {
    AuthenticationService.isAuthenticated().then(() => {
      this.setState({isAuthenticated: true});

    }, () => {
      this.setState({isAuthenticated: false});
      this.props.history.push('/admin/login');
    });
  }

  componentDidMount() {
    this.isAuthenticated();

    AuthenticationService.subject.subscribe((params) => {
      this.setState({isAuthenticated: params});
    });
  }

  signOut = () => {
      AuthenticationService.signout().then(() => {
        this.props.history.push('/admin/login');
      });
  }

  render() {
    let authButton;

    if (this.state.isAuthenticated) {
      authButton = (<AuthButtonWithRouter signOut={this.signOut}/>);
    }

    return (
      <div>
        <div className="navbar navbar-default">
          <div className="container">
              <div className="navbar-header navbar-brand">
                <Link to="/admin">
                  <img width="50px" alt="logo" src={require('../../../../assets/images/logo.png')}/>
                </Link></div>
              <div className="nav navbar-nav navbar-right">
                <div className="navbar-form navbar-left">
                    {authButton}
                </div>
              </div>
          </div>
        </div>
          <div className="container">
            <Route path="/admin" exact component={DashboardComponent}></Route>
            <Route path="/admin/login" exact component={LoginComponent}></Route>
            <Route path="/admin/posts" exact component={PostListComponent}></Route>
            <Route path="/admin/posts/:slug" component={PostDetailComponent}></Route>
          </div>
      </div>
    );
  }
}

class AuthButton extends Component {
  signOut = () => {
    this.props.signOut();
  }

  render() {
    return (<button className="btn btn-default" onClick={this.signOut}>Sign out</button>);
  }
}

const AuthButtonWithRouter = withRouter(AuthButton);

export default withRouter(BaseComponent);
