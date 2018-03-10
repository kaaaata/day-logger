import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import store from './redux/store';
import * as actions from './redux/actions';
// import Box from './Box';
import Login from './Login';
import Header from './Header';
import Days from './Days';
import Day from './Day';
import './App.css';

const mapStateToProps = (state) => ({ days: state.default.days });

export default withRouter(connect(mapStateToProps)(class App extends Component {
  // componentDidMount() {
  //   console.log(store.getState());
  //   store.dispatch(actions.addLetter('b'));
  //   console.log(store.getState());
  // }

  render() {
    const { days } = this.props;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Login />} />
          <Route exact path="/days" render={() => <div><Header /><Days /></div>} />
          {days.map((day, index) => (
            <Route key={index} exact path={"/day/" + index} render={() => <div><Header /><Day {...day} /></div>} />
          ))}
        </Switch>
      </div>
    );
  }
}));
