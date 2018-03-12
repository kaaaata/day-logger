import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link className="link" to="/"><button>Logout</button></Link>
        <Link className="link" to="/days"><button>Calendar</button></Link>
      </div>
    );
  }
};
