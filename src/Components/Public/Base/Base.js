import React, { Component } from 'react';
import { Link, Route, Switch }  from 'react-router-dom';

import PublicPostListComponent from '../PostList/List';
import PublicPostDetailComponent from '../PostDetail/Detail';

class PublicBaseComponent extends Component {
  render() {
    return (
      <div>
        <div className="navbar navbar-fixed-top">
            <div className="navbar-header navbar-brand">
              <Link to="/">
                <img width="50px" src={require('../../../../assets/images/logo.png')}/>
              </Link>
          </div>
        </div>
        <div className="container has-fixed-header">
          <Switch>
            <Route path="/" exact component={PublicPostListComponent}></Route>
            <Route path="/:id" component={PublicPostDetailComponent}></Route>
          </Switch>
        </div>
        <div className="social-wrapper">
          <ul>
            <li>follow me</li>
            <li>-</li>
            <li><a href="https://www.facebook.com/moni.wss" target="_blank">facebook</a></li>
            <li><a href="https://www.instagram.com/moni_weiss/" target="_blank">instagram</a></li>
            <li><a href="mailto:info@weissmonika.de">mail</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
export default PublicBaseComponent;
