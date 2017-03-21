import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardComponent extends Component {

  /**
   *
   */
  render() {
    return (
       <div>
         <Link to={'adminpanel/posts'}>
          <button className="btn btn-default">Meine Beiträge</button>
        </Link>
        <Link to={'adminpanel'}>
          <button className="btn btn-default">Einstellungen</button>
        </Link>
      </div>
    );
  }
}

export default DashboardComponent;
