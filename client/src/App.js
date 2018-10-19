//Impoert dependencies
import React, { Component } from 'react';
import {Route, withRouter, NavLink} from 'react-router-dom';
import './App.css';

//Import components for different views
import HomeView from './views/HomeView.js';
import SignUpView from './views/SignUpView.js';
import SignInView from './views/SignInView.js';
import JokesView from './views/JokesView.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <h1 className="App-title">Dad Jokes!</h1>
            <nav className="navigation-panel">
                <NavLink  to="/" 
                          className="link">
                    Home
                </NavLink>
                &nbsp;|&nbsp;
                <NavLink  to="/signup"  
                          className="link">
                      Sign Up</NavLink>
                &nbsp;|&nbsp;
                <NavLink  to="/signin"  
                          className="link">
                      Sign In</NavLink>
                &nbsp;|&nbsp;
                <NavLink  to="/jokes"  
                          className="link">
                      Jokes</NavLink>
                &nbsp;|&nbsp;
                <div  onClick={this.signout}
                      className="link">
                      Signout</div>
           </nav>
        </div>
        <div className="display-panel">
            <Route  exact
                    path='/'
                    component={HomeView}/>
            <Route  path="/signup"
                    component={SignUpView}/>
            <Route  path='/signin'
                    component={SignInView}/>
            <Route  path='/jokes'
                    component={JokesView}/>
        </div>
        
      </div>
    );
  }
  signout = () =>{
        localStorage.removeItem('jwt');
        console.log("in");
        return (
                <h3>You have been signed out.</h3>
        )
  }
}

export default withRouter(App);
