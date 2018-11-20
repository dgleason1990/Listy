import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import RecipeData from './RecipeData';
import Nav from './Nav';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Switch>
              <div className='main'>
                <Route path='/home' exact component={ Home } />
                <Route path='/recipe/:id' component={ RecipeData } />
              </div>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
