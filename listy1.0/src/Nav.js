import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';

export default class Nav extends Component {
  
  alreadyRunning = false;

  render() {
    const animateHome = (i) => {
      this.alreadyRunning = true;
      let navText = 'listy ';
      let words = ['recipes', 'food', 'life', 'ingredients'];
      let nestCount = 4;

      let intervalId = setInterval(() => {
        document.getElementById('nav-home').innerHTML = nestCount % 2 === 0 ? navText + '&nbsp;&nbsp;' : navText + '|';
        if(nestCount === 0) {
          clearInterval(intervalId);
          let wordToAnimate = words[i];
          let wordArr = wordToAnimate.split('');
          let  writeWordId = setInterval(() => {
            navText += wordArr.shift();
            document.getElementById('nav-home').innerHTML = wordArr.length ? navText + '|' : navText;
            if(!wordArr.length) {
              clearInterval(writeWordId);
              setTimeout(() => {
                let removeWordId = setInterval(() => {
                  let elem = document.getElementById('nav-home');
                  elem.innerHTML = elem.innerHTML.slice(0, elem.innerHTML.length-2) + '|';
                  if(elem.innerHTML[elem.innerHTML.length - 2] === ' ') {
                    clearInterval(removeWordId);
                    animateHome(i + 1 === words.length ?  0 : i + 1);
                  }
                }, 200);
              },1000);
            }
          }, 200);
        }
        nestCount--;
      }, 400);
    }

    return (
      <nav>
        { !this.alreadyRunning && animateHome(0) }
        <Link to="/home" id='nav-home' component={ Home }> listy </Link>
      </nav>
    )
  }
}
