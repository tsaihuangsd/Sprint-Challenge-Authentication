import React, { Component } from 'react';
import axios from 'axios';

class SignInView extends Component {
  state = {
    username: 'Tsai',
    password: 'password1'
  };

  render() {
    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    type="text"
                />
                </div>
                <div>
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    type="password"
                />
                </div>
                <div>
                <button type="submit">Sign in</button>
                </div>
            </form>
            <h3 className="alertMessage">You have  signed in</h3>
        </div>
    );
  }

  signedInMessage = document.getElementsByClassName('alertMessage');

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:3300/api/login';
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token);
        this.signedInMessage[0].style.display = 'block';
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  };
}

export default SignInView;
