import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './styles/Login.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: 'cat',
      password: 'cat',
      redirect: false,
    };
  }

  async newLogin() {
    const username = prompt('New Username: ');
    const usernameAvailable = (await axios.get(`/usernameAvailable/${username}`)).data.output;
    if (username === '') return alert(`Sorry, "${username}" is an invalid username. `);
    if (!usernameAvailable) return alert(`Sorry, "${username}" is already taken. `);
    const password = prompt(`Password for ${username}: `);
    if (password === '') return alert(`Sorry, "${password}" is an invalid password. `);
    await axios.post(`/newLogin/${username}/${password}`);
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    if (username === '' || password === '') return; // for production
    const validLogin = (await axios.get(`/validLogin/${username}/${password}`)).data.output;
    if (validLogin) this.setState({ redirect: true });
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={(e) => this.handleSubmit(e)}>        
          <div className="circle">
            <div className="title">Cat's<br />Day Logger</div>
            <div>
              <label>Username</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={this.state.username}
                placeholder="Username"
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>
            <div>
              <label>Password</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={this.state.password}
                placeholder="Password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <div>
              <button type="button" onClick={() => this.newLogin()}>New Login</button>
              {this.state.redirect
                ? <Redirect to="/days" />
                : <button type="submit">Login</button>
              }
            </div>
          </div>
        </form>
      </div>
    );
  }
};
