import React from 'react';
import {render} from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import HeaderComponent from './components/headerComponent.jsx';
import LoginComponent from './components/loginComponent.jsx';

render(
    <Router>
      <div>
        <Route exact path="/" component={LoginComponent}/>
        <Route path="/login" component={LoginComponent}/>
        <Route path="/home" component={HeaderComponent}/>
      </div>
    </Router>,
    document.getElementById('app')
)
