import React, { Component } from 'react';
import { Link, Route, Switch }  from 'react-router-dom';

import PublicPostListComponent from '../PostList/List';
import PublicPostDetailComponent from '../PostDetail/Detail';

class PublicBaseComponent extends Component {
  render() {
    return (
      <div className="container">
          <Link to="/">
            <h1>My Blog</h1>
          </Link>
          <Switch>
            <Route path="/" exact component={PublicPostListComponent}></Route>
            <Route path="/:id" component={PublicPostDetailComponent}></Route>
          </Switch>
      </div>
    );
  }
}
export default PublicBaseComponent;
