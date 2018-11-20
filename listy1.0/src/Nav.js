import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to="/home" component={ Home }> listy recipes </Link>
      </nav>
    )
  }
}
