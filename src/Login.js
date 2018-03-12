import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Login.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
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
              <Link className="link" to="/days"><button type="submit">Submit</button></Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
};
