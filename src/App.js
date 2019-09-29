import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Pokemon from './components/pokemon';
import Dashboard from './components/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // pokemon : [],
      // value: 0
  };
}

  render() {
    return (
          <Router>
            <div>
              <Navbar />
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/pokemon/:pokemonIndex' component={Pokemon} />
              </Switch>
            </div>
          </Router>
      )
    }
  }

