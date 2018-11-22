import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';


// const typeWordAnimation = (word) => {
  
// }

export default class Nav extends Component {

  render() {
    const animateHome = (i) => {
      let navText = 'listy ';
      let words = ['recipes', 'food', 'life', 'ingredients'];
      let nestCount = 4;

      const nextAnimation = (id, index) => {
        clearInterval(id);
        animateHome(index + 1 === words.length ?  0 : index + 1);
      }

      let intervalId = setInterval(() => {
        document.getElementById('nav-home').innerHTML = nestCount % 2 === 0 ? navText + '&nbsp;&nbsp;' : navText + '|';
        if(nestCount === 0) {
          clearInterval(intervalId);
          let wordToAnimate = words[i];
          let wordArr = wordToAnimate.split('');
          let writeWordId = setInterval(() => {
            navText += wordArr.shift();
            document.getElementById('nav-home').innerHTML = wordArr.length ? navText + '|' : navText;
            if(!wordArr.length) {
              clearInterval(writeWordId);
              let removeWordId = setInterval(() => {
                let elem = document.getElementById('nav-home');
                elem.innerHTML = elem.innerHTML.slice(0, -1);
                elem.innerHTML[elem.innerHTML.length - 1] === ' ' && nextAnimation(removeWordId, i);
              }, 200);
            }
          }, 200);
        }
        nestCount--;
      }, 400);
    }

    return (
      <nav>
        { animateHome(0) }
        <Link to="/home" id='nav-home' component={ Home }> listy </Link>
      </nav>
    )
  }
}
