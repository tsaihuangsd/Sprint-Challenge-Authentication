import React, { Component } from 'react';
import axios from 'axios';
import './view.css';

class JokesView extends Component {
  state = {
    jokes: []
  };

  render() {
    console.log(this.state.jokes);
    return (
      <div>
        <h2>List of Jokes</h2>
        <ul className="joke-cards">
          {this.state.jokes.map(joke => (
            <div key={joke.id} className="joke-card">
              <div>ID: {joke.id}</div>
              <div>Type: {joke.type}</div>
              <div>Setup: {joke.setup}</div>
              <div>Punchline: {joke.punchline}</div> 
            </div>
          ))}
        </ul>
        <h3 className="alertMessage">You have not signed in to view the jokes</h3>
      </div>
    );
  }

  alertMessage = document.getElementsByClassName('alertMessage');

  componentDidMount() {
    const token = localStorage.getItem('jwt');

    const endpoint = 'http://localhost:3300/api/jokes';
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get(endpoint, options)
      .then(res => {
        //console.log(res.data);
        this.setState({ jokes: res.data });
      })
      .catch(err => {
        console.log(this.alertMessage[0]);
        this.alertMessage[0].style.display = "block";
        console.error('ERROR', err);
      });
  }
}

export default JokesView;
