import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { db } from 'baqend';
import moment from 'moment';


import PublicBaseComponent from './Components/Public/Base/Base';
import BaseComponent from './Components/Admin/Base/Base';

class App extends Component {
  constructor() {
    super();
    db.connect('blog-moni');
    moment.locale('de');
  }

  render() {
   return  (
      <Router>
          <div>
            <Switch>
              <Route path="/adminpanel" component={BaseComponent} />
              <Route path="/" component={PublicBaseComponent}/>
            </Switch>
          </div>
    </Router>
   )}
}

export default App;
