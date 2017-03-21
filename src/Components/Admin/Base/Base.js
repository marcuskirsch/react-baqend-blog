import React, { Component } from 'react';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';

import PostDetailComponent from '../PostDetail/Detail';
import PostListComponent from '../PostList/List';
import LoginComponent from '../Login/Login';
import DashboardComponent from '../Dashboard/Dashboard';

import AuthenticationService from '../../../Shared/Authentication/Authentication';

class BaseComponent extends Component {
  render() {
    let route;

    if (AuthenticationService.isAuthenticated) {
      route = (
        <div className="container">
          <Route path="/adminpanel" exact component={DashboardComponent}></Route>
          <Route path="/adminpanel/posts" exact component={PostListComponent}></Route>
          <Route path="/adminpanel/posts/:slug" component={PostDetailComponent}></Route>
        </div>
      );
    } else {
      route = (<Redirect to={{
        pathname: '/adminpanel/login'
      }}/>)
    }

    return (
      <div>
        <div className="navbar navbar-default">
          <div className="container">
              <div className="navbar-header navbar-brand"><Link to="/adminpanel">moni's blog</Link></div>
              <div className="nav navbar-nav navbar-right">
                <div className="navbar-form navbar-left">
                  <AuthButton/>
                </div>
              </div>
          </div>
        </div>
          <Route path="/adminpanel/login" component={LoginComponent}/>
          {route}
      </div>
    );
  }
}

const AuthButton = withRouter(({ history }) => (
  AuthenticationService.isAuthenticated ? (
    <button className="btn btn-default" onClick={(event) => {
      AuthenticationService.signout().then(() => history.push('/adminpanel/login'));
      }}>Sign out</button>
  ) : <span/>
))

export default BaseComponent;
