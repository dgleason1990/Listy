import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';

export default class Nav extends Component {
  render() {
    const animateHome = () => {
      let toAdd = 'recipes'.split('');
      let navText = 'listy ';
      let nestCount = 4;
      let nestedID = setInterval(() => {
        document.getElementById('nav-home').innerHTML = nestCount % 2 === 0 ? navText + '&nbsp;&nbsp;' : navText + '|';
        if(nestCount === 0) {
          clearInterval(nestedID);
          let intervalID = setInterval(() => {
            if(toAdd.length === 7) {
              console.log('here');
            }
            navText += toAdd.shift();
            document.getElementById('nav-home').innerHTML = toAdd.length ? navText + '|' : navText;
            if(!toAdd.length) {
              clearInterval(intervalID);
            }
          }, 200);
        }
        nestCount--;
        console.log(nestCount);
      }, 400);
    }

    return (
      <nav>
        { animateHome() }
        <Link to="/home" id='nav-home' component={ Home }> listy | </Link>
      </nav>
    )
  }
}
